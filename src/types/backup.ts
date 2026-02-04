export type BackupStatus = "Success" | "Failed" | "Running";

export type Backup = {
  id: string;
  deviceId: string;
  versionNumber: number;
  status: BackupStatus;
  startedAt: string;
  finishedAt: string | null;
  configText?: string;
  configHash?: string;
  changedLines: 0;
  isDuplicate: true;
  error: "string";
};

export interface BackupsPayload {
  configVersions: Backup[];
  total: number;
}
export interface BackupPayload {
  configVersion: Backup;
}
