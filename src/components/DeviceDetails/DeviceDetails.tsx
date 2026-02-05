import { Tabs, Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router";
import { useDisclosure } from "@mantine/hooks";

import { DeviceSummaryCard } from "./deviceSummaryCard";
import { BackupHistoryTab } from "./backupHistoryTab/BackupHistoryTab";
import { ConfigurationTab } from "./ConfigurationTab";
import { useDeviceDetails } from "./hooks/useDeviceDatails";
import { DeviceModal } from "../Devices/DeviceModal";
import { useDeviceFormOptions } from "../Devices/hooks/useDeviceFormOptions";
import { useTriggerBackup } from "./hooks/useTriggerBackup";

export const DeviceDetails = () => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const { deviceId } = useParams<{ deviceId: string }>();
  const { deviceTypeSelectOptions, tagOptions } = useDeviceFormOptions();

  if (!deviceId) return null;

  const { device, backups, configuration } = useDeviceDetails(deviceId);
  const { mutate: triggerBackup, isPending } = useTriggerBackup();

  if (!device) return null;

  return (
    <>
      <Button
        variant="subtle"
        leftSection={<IconArrowLeft size={16} />}
        onClick={() => navigate("/devices")}
        mb="xl"
      >
        Back to devices
      </Button>

      <DeviceSummaryCard
        device={device}
        onEdit={open}
        isPending={isPending}
        onTriggerBackup={() => triggerBackup(device.id)}
      />

      <Tabs defaultValue="backups">
        <Tabs.List>
          <Tabs.Tab value="backups">Backups</Tabs.Tab>
          <Tabs.Tab value="config">Configuration</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="backups" pt="xl">
          <BackupHistoryTab backups={backups} />
        </Tabs.Panel>

        <Tabs.Panel value="config" pt="xl">
          <ConfigurationTab configuration={configuration} deviceId={deviceId} />
        </Tabs.Panel>
      </Tabs>

      <DeviceModal
        opened={opened}
        onClose={close}
        mode="edit"
        device={device}
        deviceTypes={deviceTypeSelectOptions}
        tagOptions={tagOptions}
      />
    </>
  );
};
