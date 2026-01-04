import ApiClient from "../ApiClient";
import type { Backup } from "../../components/DeviceDetails/types";
import axios from "axios";
class BackupService extends ApiClient {
  async getByDeviceId(deviceId: string): Promise<Backup[]> {
    const response = await axios.get<Backup[]>("/public/mock/backups.json");

    return response.data.filter((backup) => backup.device_id === deviceId);
  }
}

export const backupService = new BackupService();
