import { diffLines, diffWords } from "diff";
import type { DiffLine } from "../types";

export interface DiffPart {
  value: string;
  added?: boolean;
  removed?: boolean;
}

export interface DiffHunk {
  leftLineNumber: number;
  rightLineNumber: number;
  leftContent: string;
  rightContent: string;
  leftParts?: DiffPart[];
  rightParts?: DiffPart[];
  type: "added" | "removed" | "modified" | "unchanged";
}

// Calculate diff using the diff library (Myers algorithm)
export function calculateDiff(
  leftContent: string,
  rightContent: string,
): DiffHunk[] {
  const lineDiff = diffLines(leftContent, rightContent);
  const hunks: DiffHunk[] = [];

  let leftLineNumber = 1;
  let rightLineNumber = 1;

  for (const part of lineDiff) {
    const lines = part.value.split("\n");
    // Remove the last empty line if it exists (split creates it)
    if (lines[lines.length - 1] === "") {
      lines.pop();
    }

    if (part.removed && part.added) {
      // This shouldn't happen with diffLines, but handle it just in case
      // Treat as modified
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const wordDiff = diffWords(line, line);
        hunks.push({
          leftLineNumber: leftLineNumber++,
          rightLineNumber: rightLineNumber++,
          leftContent: line,
          rightContent: line,
          leftParts: wordDiff.map((w) => ({
            value: w.value,
            removed: w.removed,
          })),
          rightParts: wordDiff.map((w) => ({
            value: w.value,
            added: w.added,
          })),
          type: "modified",
        });
      }
    } else if (part.removed) {
      // Removed lines
      for (const line of lines) {
        hunks.push({
          leftLineNumber: leftLineNumber++,
          rightLineNumber: 0,
          leftContent: line,
          rightContent: "",
          type: "removed",
        });
      }
    } else if (part.added) {
      // Added lines
      for (const line of lines) {
        hunks.push({
          leftLineNumber: 0,
          rightLineNumber: rightLineNumber++,
          leftContent: "",
          rightContent: line,
          type: "added",
        });
      }
    } else {
      // Unchanged lines
      for (const line of lines) {
        hunks.push({
          leftLineNumber: leftLineNumber++,
          rightLineNumber: rightLineNumber++,
          leftContent: line,
          rightContent: line,
          type: "unchanged",
        });
      }
    }
  }

  // Return hunks as-is (no modification detection for split view)
  // Modified lines will appear as removed + added pairs
  return hunks;
}

// Format unified diff
export function formatUnifiedDiff(
  leftFilename: string,
  rightFilename: string,
  leftDate: string,
  rightDate: string,
  hunks: DiffHunk[],
): string {
  const lines: string[] = [];
  lines.push(`--- ${leftFilename} (${leftDate})`);
  lines.push(`+++ ${rightFilename} (${rightDate})`);

  for (const hunk of hunks) {
    if (hunk.type === "unchanged") {
      lines.push(` ${hunk.leftContent}`);
    } else if (hunk.type === "removed") {
      lines.push(`-${hunk.leftContent}`);
    } else if (hunk.type === "added") {
      lines.push(`+${hunk.rightContent}`);
    } else if (hunk.type === "modified") {
      lines.push(`-${hunk.leftContent}`);
      lines.push(`+${hunk.rightContent}`);
    }
  }

  return lines.join("\n");
}

// Convert hunks to old DiffLine format for backward compatibility
export function hunksToDiffLines(hunks: DiffHunk[]): DiffLine[] {
  return hunks.map((hunk) => ({
    line: hunk.leftContent || hunk.rightContent,
    type: hunk.type,
    leftLineNumber: hunk.leftLineNumber || undefined,
    rightLineNumber: hunk.rightLineNumber || undefined,
  }));
}
