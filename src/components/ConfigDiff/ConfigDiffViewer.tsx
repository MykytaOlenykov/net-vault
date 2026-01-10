import { Paper, Group, Text } from "@mantine/core";
import { useRef, useEffect } from "react";
import type { ConfigDiffData, ViewMode, DiffHunk } from "./types";
import { formatUnifiedDiff } from "./utils";
import style from "./ConfigDiffViewer.module.css";

interface ConfigDiffViewerProps {
  data: ConfigDiffData | null;
  viewMode: ViewMode;
}

interface LineItem {
  hunk: DiffHunk;
  lineIndex: number;
}

export function ConfigDiffViewer({ data, viewMode }: ConfigDiffViewerProps) {
  const leftScrollRef = useRef<HTMLDivElement>(null);
  const rightScrollRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  // Synchronized scrolling for split view
  useEffect(() => {
    if (
      viewMode !== "split" ||
      !leftScrollRef.current ||
      !rightScrollRef.current
    ) {
      return;
    }

    const leftScroll = leftScrollRef.current;
    const rightScroll = rightScrollRef.current;

    const handleLeftScroll = () => {
      if (!isScrollingRef.current) {
        isScrollingRef.current = true;
        rightScroll.scrollTop = leftScroll.scrollTop;
        requestAnimationFrame(() => {
          isScrollingRef.current = false;
        });
      }
    };

    const handleRightScroll = () => {
      if (!isScrollingRef.current) {
        isScrollingRef.current = true;
        leftScroll.scrollTop = rightScroll.scrollTop;
        requestAnimationFrame(() => {
          isScrollingRef.current = false;
        });
      }
    };

    leftScroll.addEventListener("scroll", handleLeftScroll);
    rightScroll.addEventListener("scroll", handleRightScroll);

    return () => {
      leftScroll.removeEventListener("scroll", handleLeftScroll);
      rightScroll.removeEventListener("scroll", handleRightScroll);
    };
  }, [viewMode, data]);

  if (!data) {
    return (
      <Paper p="lg" radius="md" withBorder>
        <Text c="dimmed" ta="center" py="xl">
          Select a device and two config versions to compare
        </Text>
      </Paper>
    );
  }

  if (viewMode === "split") {
    // Build aligned line arrays for side-by-side comparison
    const leftLines: LineItem[] = [];
    const rightLines: LineItem[] = [];

    data.hunks.forEach((hunk) => {
      if (hunk.type === "unchanged") {
        // Both sides have content
        leftLines.push({ hunk, lineIndex: leftLines.length });
        rightLines.push({ hunk, lineIndex: rightLines.length });
      } else if (hunk.type === "removed") {
        // Only left side
        leftLines.push({ hunk, lineIndex: leftLines.length });
        rightLines.push({ hunk, lineIndex: rightLines.length }); // Empty line on right
      } else if (hunk.type === "added") {
        // Only right side
        leftLines.push({ hunk, lineIndex: leftLines.length }); // Empty line on left
        rightLines.push({ hunk, lineIndex: rightLines.length });
      }
      // Note: "modified" type is not used in split view - it's handled as removed + added
    });

    return (
      <div className={style.splitContainer}>
        {/* Left Side */}
        <Paper p="lg" radius="md" withBorder className={style.splitPanel}>
          <Group justify="space-between" mb="md">
            <Text fw={500}>Previous Version</Text>
            <Text size="sm" c="dimmed">
              {data.left.date}
            </Text>
          </Group>
          <div ref={leftScrollRef} className={style.codeViewer}>
            <div className={style.codeContent}>
              {leftLines.map((item, index) => {
                const { hunk } = item;
                const isRemoved = hunk.type === "removed";
                const hasContent = hunk.leftLineNumber > 0;

                return (
                  <div
                    key={`left-${index}`}
                    className={`${style.codeLine} ${
                      isRemoved ? style.removed : ""
                    } ${!hasContent ? style.emptyLine : ""}`}
                  >
                    <span className={style.lineNumber}>
                      {hasContent ? hunk.leftLineNumber : ""}
                    </span>
                    <span className={style.lineContent}>
                      {hasContent ? (
                        <span>{hunk.leftContent}</span>
                      ) : (
                        <span>&nbsp;</span>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </Paper>

        {/* Right Side */}
        <Paper p="lg" radius="md" withBorder className={style.splitPanel}>
          <Group justify="space-between" mb="md">
            <Text fw={500}>Current Version</Text>
            <Text size="sm" c="dimmed">
              {data.right.date}
            </Text>
          </Group>
          <div ref={rightScrollRef} className={style.codeViewer}>
            <div className={style.codeContent}>
              {rightLines.map((item, index) => {
                const { hunk } = item;
                const isAdded = hunk.type === "added";
                const hasContent = hunk.rightLineNumber > 0;

                return (
                  <div
                    key={`right-${index}`}
                    className={`${style.codeLine} ${
                      isAdded ? style.added : ""
                    } ${!hasContent ? style.emptyLine : ""}`}
                  >
                    <span className={style.lineNumber}>
                      {hasContent ? hunk.rightLineNumber : ""}
                    </span>
                    <span className={style.lineContent}>
                      {hasContent ? (
                        <span>{hunk.rightContent}</span>
                      ) : (
                        <span>&nbsp;</span>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </Paper>
      </div>
    );
  }

  // Unified view
  const unifiedDiff = formatUnifiedDiff(
    data.left.filename,
    data.right.filename,
    data.left.date,
    data.right.date,
    data.hunks,
  );

  return (
    <Paper p="lg" radius="md" withBorder>
      <Text fw={500} mb="md">
        Unified Diff View
      </Text>
      <div className={style.codeViewer}>
        <div className={style.codeContent}>
          {unifiedDiff.split("\n").map((line, index) => {
            const isRemoved = line.startsWith("-") && !line.startsWith("---");
            const isAdded = line.startsWith("+") && !line.startsWith("+++");

            return (
              <div
                key={index}
                className={`${style.codeLine} ${
                  isRemoved ? style.removed : isAdded ? style.added : ""
                }`}
              >
                <span className={style.lineNumber}></span>
                <span className={style.lineContent}>
                  <span>{line}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Paper>
  );
}
