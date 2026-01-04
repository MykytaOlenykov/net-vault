import { useGetDevice } from "../../Devices/hooks/device/useGetDevice";
import { useGetDeviceBackups } from "./useGetDeviceBackups";
import { useGetDeviceAudit } from "./useGetDeviceAudit";

import { getCurrentConfiguration } from "../utils/getCurrentConfiguration";

export function useDeviceDetails(deviceId: string) {
  const deviceQuery = useGetDevice(deviceId);

  const backupsQuery = useGetDeviceBackups(deviceId);
  const auditQuery = useGetDeviceAudit(deviceId);

  const backups = backupsQuery.data ?? [];

  return {
    device: deviceQuery.data,

    backups,

    configuration: getCurrentConfiguration(backups),

    changes: auditQuery.data ?? [],

    isLoading:
      deviceQuery.isLoading || backupsQuery.isLoading || auditQuery.isLoading,
  };
}
