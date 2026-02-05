export interface ConfigFile {
  id: string;
  name: string;
  date: string;
  timestamp: number;
}

export interface Device {
  id: string;
  name: string;
  configs: ConfigFile[];
}

export type ViewMode = "split" | "unified";

export interface DiffLine {
  line: string;
  type: "added" | "removed" | "modified" | "unchanged";
  leftLineNumber?: number;
  rightLineNumber?: number;
}

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

export interface ConfigDiffData {
  left: {
    content: string;
    filename: string;
    date: string;
  };
  right: {
    content: string;
    filename: string;
    date: string;
  };
  hunks: DiffHunk[];
}
