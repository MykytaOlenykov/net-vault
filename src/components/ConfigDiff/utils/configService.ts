import axios from "axios";
import type { Device } from "../types";

// Load config file content
export async function loadConfigFile(path: string): Promise<string> {
  try {
    const response = await axios.get<string>(`/conf/${path}`, {
      responseType: "text",
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to load config file: ${path}`, error);
    throw error;
  }
}

// Get list of devices and their configs
// For now, we'll use a predefined list based on the conf folder structure
export async function getDevices(): Promise<Device[]> {
  // In a real app, this would be an API call
  // For now, we'll return a hardcoded list based on the conf folder
  const devices: Device[] = [
    {
      name: "10.10.12.41",
      configs: [
        {
          name: "10.10.12.41_25-01-27.cfg",
          path: "10.10.12.41/10.10.12.41_25-01-27.cfg",
          date: "2025-01-27",
          timestamp: new Date("2025-01-27").getTime(),
        },
        {
          name: "10.10.12.41_25-01-28.cfg",
          path: "10.10.12.41/10.10.12.41_25-01-28.cfg",
          date: "2025-01-28",
          timestamp: new Date("2025-01-28").getTime(),
        },
      ],
    },
    {
      name: "cisco",
      configs: [
        {
          name: "cisco-nx_25-01-27.cfg",
          path: "cisco/cisco-nx_25-01-27.cfg",
          date: "2025-01-27",
          timestamp: new Date("2025-01-27").getTime(),
        },
        {
          name: "cisco-nx_25-12-12.cfg",
          path: "cisco/cisco-nx_25-12-12.cfg",
          date: "2025-12-12",
          timestamp: new Date("2025-12-12").getTime(),
        },
      ],
    },
    {
      name: "10.10.25.50",
      configs: [
        {
          name: "10.10.25.50_25-01-27.cfg",
          path: "10.10.25.50/10.10.25.50_25-01-27.cfg",
          date: "2025-01-27",
          timestamp: new Date("2025-01-27").getTime(),
        },
        {
          name: "10.10.25.50_25-09-15.cfg",
          path: "10.10.25.50/10.10.25.50_25-09-15.cfg",
          date: "2025-09-15",
          timestamp: new Date("2025-09-15").getTime(),
        },
      ],
    },
    {
      name: "10.10.18.144",
      configs: [
        {
          name: "10.10.18.144_25-01-27.cfg",
          path: "10.10.18.144/10.10.18.144_25-01-27.cfg",
          date: "2025-01-27",
          timestamp: new Date("2025-01-27").getTime(),
        },
        {
          name: "10.10.18.140_25-01-27.cfg",
          path: "10.10.18.144/10.10.18.140_25-01-27.cfg",
          date: "2025-01-27",
          timestamp: new Date("2025-01-27").getTime(),
        },
      ],
    },
  ];

  // Sort configs by timestamp (newest first)
  devices.forEach((device) => {
    device.configs.sort((a, b) => b.timestamp - a.timestamp);
  });

  return devices;
}
