export type BackupHistoryItem = {
  id: string;
  startedAt: string;
  finishedAt: string | null;
  status: "SUCCESS" | "FAILED";
  versionNumber: number;
};

export type BackupStatus = "SUCCESS" | "FAILED" | "RUNNING";

export type Backup = {
  id: string;
  device_id: string;
  version_number: number;

  status: BackupStatus;

  started_at: string;
  finished_at: string | null;

  config_text: string;
  config_hash: string;

  changed_lines: number;
  is_duplicate: boolean;

  error: string | null;
};

export type ChangeHistoryItem = {
  id: string;
  timestamp: string;
  user: string;
  description: string;
};

export type AuditLog = {
  id: string;
  user: string;
  action: string;
  resource_type: string;
  resource_id: string;
  details: Record<string, unknown> | null;
  ip_address: string;
  user_agent: string;
  created_at: string;
};

export type Configuration = {
  backupId: string;
  version: number;
  collectedAt: string;
  configText: string;
};
