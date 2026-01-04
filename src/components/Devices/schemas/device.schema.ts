import { z } from "zod";

/* ======================================================
   CREATE (API request)
   ====================================================== */

export const createDeviceSchema = z.object({
  name: z.string().min(2, "Name is required"),
  ipAddress: z.ipv4("Wrong ip address"),
  port: z.number().int().min(1).max(65535),
  deviceTypeId: z.uuid("Invalid device type"),
  backupSchedule: z.string(),
  isActive: z.boolean(),
  tags: z.array(z.string()),
});

export type CreateDeviceDto = z.infer<typeof createDeviceSchema>;

/* ======================================================
   UPDATE (API request)
   ====================================================== */

export const updateDeviceSchema = z.object({
  name: z.string().trim().min(1),
  ipAddress: z.ipv4("Wrong ip address"),
  port: z.number().int().min(1).max(65535),
  deviceTypeId: z.uuid("Invalid device type"),
  backupSchedule: z.string().trim().length(5),
  isActive: z.boolean(),
  tagIds: z.array(z.string()),
});

export type UpdateDeviceDto = z.infer<typeof updateDeviceSchema>;

/* ======================================================
   FORM (UI – Add + Edit)
   ====================================================== */

export const deviceFormSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  ipAddress: z.ipv4("Wrong ip address"),
  port: z.number().int().min(1).max(65535),
  deviceTypeId: z.uuid("Invalid device type"),
  backupSchedule: z.string().trim().length(5),
  isActive: z.boolean(),
  tagIds: z.array(z.string()),
});

export type DeviceFormValues = z.infer<typeof deviceFormSchema>;

export const mapFormToCreateDto = (
  form: DeviceFormValues,
): CreateDeviceDto => ({
  name: form.name,
  ipAddress: form.ipAddress,
  port: form.port,
  deviceTypeId: form.deviceTypeId,
  backupSchedule: form.backupSchedule,
  isActive: form.isActive,
  tags: form.tagIds,
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
  backupSchedule: device.backupSchedule,
  isActive: device.isActive,
  tagIds: device.deviceTags.map((dt) => dt.tag.name),
});
