import { useNavigate } from "react-router";
import { confirmDelete } from "../../../shared/ui/ConfirmDelete";
import type { Device } from "../types/device";

export function useDeviceActions(device: Device) {
  const navigate = useNavigate();

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
      onConfirm: () => {
        // TODO: Implement remove device logic
        console.log("Device removed");
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
