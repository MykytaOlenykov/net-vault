import type { CreateDeviceDto } from "../schemas/device.schema";
import type { CreateDevicePayload } from "../../../types/device";

export function mapCreateDeviceDtoToPayload(
  dto: CreateDeviceDto,
): CreateDevicePayload {
  return {
    name: dto.name,
    ipAddress: dto.ipAddress,
    port: dto.port,
    deviceTypeId: dto.deviceTypeId,
    protocol: dto.protocol,
    backupSchedule: dto.backupSchedule,
    isActive: dto.isActive,
    tags: dto.tags,
  };
}
