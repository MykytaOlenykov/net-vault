import { useNavigate } from "react-router";
import { confirmDelete } from "../../../shared/ui/ConfirmDelete";
import type { Device } from "../../../types/device";
import { useDeleteDevice } from "./useDeleteDevice";
import { notify } from "../../../shared/helpers/notify";
import { useTriggerBackup } from "../../DeviceDetails/hooks/useTriggerBackup";
import { backupService } from "../../../api";

export function useDeviceActions(device: Device) {
  const navigate = useNavigate();
  const { mutateAsync } = useDeleteDevice();
  const { mutate: trigger } = useTriggerBackup();
  const viewDetails = () => {
    navigate(`/devices/${device.id}`);
  };

  const triggerBackup = () => {
    trigger(device.id);
  };

  const downloadConfig = async () => {
    try {
      const config = await backupService.getLastBackup(device.id);
      if (!config || !config.configText) {
        notify.error("No config available for download");
        return;
      }
      const blob = new Blob([config.configText], { type: "text/plain" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${device.name}-last-config.txt`;
      link.click();

      URL.revokeObjectURL(url);

      notify.success(`Config for ${device.name} downloaded`);
    } catch {
      notify.error("Failed to download device config");
    }
  };

  const removeDevice = () => {
    confirmDelete({
      title: "Remove device",
      itemName: device.name,
      onConfirm: async () => {
        try {
          await mutateAsync(device.id);
          notify.success(`Device ${device.name} deleted`);
        } catch (error) {
          notify.error(`Error delete device`);
        }
      },
    });
  };

  return {
    viewDetails,
    triggerBackup,
    downloadConfig,
    removeDevice,
  };
}
