import type { Device } from "../types/device";

export function useDeviceActions(device: Device) {
  return {
    viewDetails: () => {
      console.log(`Viewing details for device ${device.name}`);
    },
    triggerConfig: () => {
      console.log(`Triggering config for device ${device.name}`);
    },
    downloadConfig: () => {
      console.log(`Downloading config for device ${device.name}`);
    },
    removeDevice: () => {
      console.log(`Removing device ${device.name}`);
    },
  };
}
