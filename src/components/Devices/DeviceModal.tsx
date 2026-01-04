import {
  Modal,
  Button,
  TextInput,
  Select,
  Stack,
  Group,
  Switch,
  NumberInput,
  TagsInput,
} from "@mantine/core";
import { notify } from "../../shared/helpers/notify";
import { useCreateDevice } from "./hooks/device/useCreateDevice";
import { useUpdateDevice } from "./hooks/device/useUpdateDevice";
import {
  mapFormToCreateDto,
  type DeviceFormValues,
} from "./schemas/device.schema";
import { useDeviceForm } from "./hooks/device/useDeviceForm";
import type { Device } from "./types/device";

type BaseProps = {
  opened: boolean;
  onClose: () => void;
  deviceTypes: { value: string; label: string }[];
  tagOptions: { value: string; label: string }[];
};

type CreateProps = BaseProps & {
  mode: "create";
  device?: undefined;
};

type EditProps = BaseProps & {
  mode: "edit";
  device: Device;
};

type Props = CreateProps | EditProps;

export function DeviceModal({
  opened,
  onClose,
  mode,
  device,
  deviceTypes,
  tagOptions,
}: Props) {
  const isEdit = mode === "edit";
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useDeviceForm({
    mode,
    device,
    opened,
  });

  const createMutation = useCreateDevice();
  const updateMutation = useUpdateDevice(device?.id ?? "");

  const onSubmit = async (form: DeviceFormValues) => {
    try {
      if (isEdit) {
        await updateMutation.mutateAsync(mapFormToCreateDto(form));
        notify.success("Device updated successfully");
      } else {
        await createMutation.mutateAsync(mapFormToCreateDto(form));
        notify.success("Device created successfully");
      }

      onClose();
    } catch {
      notify.error(
        isEdit ? "Failed to update device" : "Failed to create device",
      );
    }
  };
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={isEdit ? "Edit device" : "Add device"}
      centered
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <TextInput
            label="Device name"
            error={errors.name?.message}
            {...register("name")}
          />

          <TextInput
            label="IP address"
            placeholder="192.168.1.10"
            error={errors.ipAddress?.message}
            {...register("ipAddress")}
          />

          <NumberInput
            label="Port"
            min={1}
            max={65535}
            value={watch("port")}
            error={errors.port?.message}
            onChange={(v) =>
              setValue("port", typeof v === "number" ? v : 0, {
                shouldValidate: true,
              })
            }
          />

          <Select
            label="Device type"
            data={deviceTypes}
            value={watch("deviceTypeId")}
            error={errors.deviceTypeId?.message}
            onChange={(v) =>
              setValue("deviceTypeId", v ?? "", {
                shouldValidate: true,
              })
            }
          />

          <TextInput
            label="Backup schedule"
            placeholder="0 2 * * *"
            error={errors.backupSchedule?.message}
            {...register("backupSchedule")}
          />

          <Switch
            label="Active"
            checked={watch("isActive")}
            onChange={(e) => setValue("isActive", e.currentTarget.checked)}
          />

          <TagsInput
            label="Tags"
            data={tagOptions?.map((t) => t.value)}
            value={watch("tagIds") ?? []}
            onChange={(v) => {
              setValue("tagIds", v ?? [], { shouldValidate: true });
            }}
            clearable
            splitChars={[",", " "]}
          />

          <Group justify="flex-end">
            <Button variant="default" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              loading={
                isEdit ? updateMutation.isPending : createMutation.isPending
              }
            >
              {isEdit ? "Save" : "Create"}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
