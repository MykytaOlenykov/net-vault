import { useGetDevice } from "../../Devices/hooks/useGetDevice";
import { useGetDeviceBackups } from "./useGetDeviceBackups";

import { useGetLastBackup } from "./useGetLastBackup";
import { mapBackupToConfiguration } from "../utils/mapBackupToConfiguration";

export function useDeviceDetails(deviceId: string) {
  const { data: device, isLoading: isDeviceLoading } = useGetDevice(deviceId);
  const { data: backups, isLoading: isBeckupsLoading } =
    useGetDeviceBackups(deviceId);
  const { data: lastBackup, isLoading: isLastLoading } =
    useGetLastBackup(deviceId);
  return {
    device: device,

    backups: backups,

    configuration: mapBackupToConfiguration(lastBackup) ?? null,

    isLoading: isDeviceLoading || isBeckupsLoading || isLastLoading,
  };
}
