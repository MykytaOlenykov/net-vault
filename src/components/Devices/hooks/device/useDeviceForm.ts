import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  deviceFormSchema,
  type DeviceFormValues,
  mapDeviceToForm,
} from "../../schemas/device.schema";
import type { Device } from "../../types/device";

type Params = {
  mode: "create" | "edit";
  device?: Device;
  opened: boolean;
};

const EMPTY_VALUES: DeviceFormValues = {
  name: "",
  ipAddress: "",
  port: 22,
  deviceTypeId: "",
  backupSchedule: "",
  isActive: true,
  tagIds: [],
};

export function useDeviceForm({ mode, device, opened }: Params) {
  const isEdit = mode === "edit";

  const form = useForm<DeviceFormValues>({
    resolver: zodResolver(deviceFormSchema),
    defaultValues: EMPTY_VALUES,
  });

  const { reset } = form;

  useEffect(() => {
    if (!opened) return;

    if (isEdit && device) {
      reset(mapDeviceToForm(device));
    }

    if (!isEdit) {
      reset(EMPTY_VALUES);
    }
  }, [opened, isEdit, device, reset]);

  return form;
}
