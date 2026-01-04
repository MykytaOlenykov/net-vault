import { Tabs, Button, Loader } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router";
import { useDisclosure } from "@mantine/hooks";

import { DeviceSummaryCard } from "./deviceSummaryCard";
import { BackupHistoryTab } from "./backupHistoryTab/BackupHistoryTab";
import { ConfigurationTab } from "./ConfigurationTab";
import { ChangeHistoryTab } from "./changeHistoryTab/ChangeHistoryTab";
import { useDeviceDetails } from "./hooks/useDeviceDatails";
import { DeviceModal } from "../Devices/DeviceModal";
import { useDeviceFormOptions } from "../Devices/hooks/device/useDeviceFormOptions";

export const DeviceDetails = () => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const { deviceId } = useParams<{ deviceId: string }>();
  const { deviceTypeSelectOptions, tagOptions } = useDeviceFormOptions();

  if (!deviceId) return null;

  const { device, backups, configuration, changes, isLoading } =
    useDeviceDetails(deviceId);

  if (isLoading) return <Loader />;

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
        onTriggerBackup={() => console.log(`Trigger backup for ${device.id}`)}
      />

      <Tabs defaultValue="backups">
        <Tabs.List>
          <Tabs.Tab value="backups">Backups</Tabs.Tab>
          <Tabs.Tab value="config">Configuration</Tabs.Tab>
          <Tabs.Tab value="changes">Change history</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="backups" pt="xl">
          <BackupHistoryTab backups={backups} />
        </Tabs.Panel>

        <Tabs.Panel value="config" pt="xl">
          <ConfigurationTab configuration={configuration} />
        </Tabs.Panel>

        <Tabs.Panel value="changes" pt="xl">
          <ChangeHistoryTab changes={changes} />
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
