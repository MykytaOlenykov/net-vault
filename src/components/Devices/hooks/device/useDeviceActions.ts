import { useNavigate } from "react-router";
import { confirmDelete } from "../../../../shared/ui/ConfirmDelete";
import type { Device } from "../../types/device";
import { useDeleteDevice } from "./useDeleteDevice";
import { notify } from "../../../../shared/helpers/notify";

export function useDeviceActions(device: Device) {
  const navigate = useNavigate();
  const { mutateAsync } = useDeleteDevice();

  const viewDetails = () => {
    navigate(`/devices/${device.id}`);
  };

  const triggerBackup = () => {
    // TODO: Implement trigger backup logic
    console.log(`Triggering backup for device ${device.name}`);
  };

  const downloadConfig = () => {
    // TODO: Implement download config logic
    console.log(`Downloading config for device ${device.name}`);
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
