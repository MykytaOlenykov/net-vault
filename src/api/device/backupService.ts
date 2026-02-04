import ApiClient from "../ApiClient";
import type { Backup, BackupPayload, BackupsPayload } from "../../types/backup";
import type { ApiResponse } from "../../types/api";

class BackupService extends ApiClient {
  async getBackupsByDeviceId(deviceId: string): Promise<Backup[]> {
    const response = await this.get<ApiResponse<BackupsPayload>>(
      `/devices/${deviceId}/configs`,
    );
    return response.data.data.configVersions;
  }

  async getBackupById(backup_id: string): Promise<Backup> {
    const response = await this.get<ApiResponse<BackupPayload>>(
      `/devices/configs/${backup_id}`,
    );
    return response.data.data.configVersion;
  }

  async getLastBackup(deviceId: string): Promise<Backup> {
    const response = await this.get<ApiResponse<BackupPayload>>(
      `/devices/${deviceId}/configs/last`,
    );
    return response.data.data.configVersion;
  }
  async trigerBackup(deviceId: string): Promise<void> {
    await this.post<ApiResponse<void>>(`/devices/${deviceId}/configs`);
  }
}

export const backupService = new BackupService();
