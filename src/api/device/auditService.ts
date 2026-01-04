import ApiClient from "../ApiClient";
import type {
  AuditLog,
  ChangeHistoryItem,
} from "../../components/DeviceDetails/types";
import { mapAuditToChangeHistory } from "../../components/DeviceDetails/utils";
import axios from "axios";

class AuditService extends ApiClient {
  async getByDeviceId(deviceId: string): Promise<ChangeHistoryItem[]> {
    const response = await axios.get<AuditLog[]>("/public/mock/audit-log.json");
    const logs = response.data.filter(
      (log) => log.resource_type === "device" && log.resource_id === deviceId,
    );
    return logs.map(mapAuditToChangeHistory);
  }
}

export const auditService = new AuditService();
