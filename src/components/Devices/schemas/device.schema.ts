import { z } from "zod";
import { DeviceProtocol } from "../../../types/device";

/* ======================================================
   CREATE (API request)
   ====================================================== */

export const createDeviceSchema = z.object({
  name: z.string().min(2, "Name is required"),
  ipAddress: z.ipv4("Wrong ip address"),
  port: z.number().int().min(1).max(65535),
  deviceTypeId: z.uuid("Invalid device type"),
  backupSchedule: z.string(),
  protocol: z.enum(DeviceProtocol),
  isActive: z.boolean(),
  tags: z.array(z.string()),
});

export type CreateDeviceDto = z.infer<typeof createDeviceSchema>;

export const updateDeviceSchema = z.object({
  name: z.string().trim().min(1),
  ipAddress: z.ipv4("Wrong ip address"),
  port: z.number().int().min(1).max(65535),
  deviceTypeId: z.uuid("Invalid device type"),
  backupSchedule: z.string().trim(),
  protocol: z.enum(DeviceProtocol),
  isActive: z.boolean(),
  tags: z.array(z.string()),
});

export type UpdateDeviceDto = z.infer<typeof updateDeviceSchema>;

export const deviceFormSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  ipAddress: z.ipv4("Wrong ip address"),
  port: z.number().int().min(1).max(65535),
  deviceTypeId: z.uuid("Invalid device type"),
  protocol: z.enum(DeviceProtocol),
  backupSchedule: z.string().trim(),
  isActive: z.boolean(),
  tags: z.array(z.string()),
});

export type DeviceFormValues = z.infer<typeof deviceFormSchema>;

export const mapFormToCreateDto = (
  form: DeviceFormValues,
): CreateDeviceDto => ({
  name: form.name,
  ipAddress: form.ipAddress,
  port: form.port,
  deviceTypeId: form.deviceTypeId,
  protocol: form.protocol,
  backupSchedule: form.backupSchedule,
  isActive: form.isActive,
  tags: form.tags,
});

export type DeviceApiResponse = {
  id: string;
  name: string;
  ipAddress: string;
  port: number;
  deviceType: {
    id: string;
    vendor: string;
  };
  protocol: DeviceProtocol;
  backupSchedule: string;
  isActive: boolean;
  deviceTags: {
    tag: {
      name: string;
    };
  }[];
};

export const mapDeviceToForm = (
  device: DeviceApiResponse,
): DeviceFormValues => ({
  name: device.name,
  ipAddress: device.ipAddress,
  port: device.port,
  deviceTypeId: device.deviceType.id,
  protocol: device.protocol,
  backupSchedule: device.backupSchedule,
  isActive: device.isActive,
  tags: device.deviceTags.map((dt) => dt.tag.name),
});
