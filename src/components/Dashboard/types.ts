import type { TablerIcon } from "@tabler/icons-react";

export interface Metric {
  label: string;
  value: string;
  icon: TablerIcon;
  color: string;
}

export interface BackupStats {
  success: number;
  failed: number;
  successRate: number;
}
