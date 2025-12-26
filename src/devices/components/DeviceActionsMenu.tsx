import { Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import {
  IconEye,
  IconRefresh,
  IconDownload,
  IconTrash,
} from "@tabler/icons-react";
import { ActionsMenu } from "../../shared/ui/ActionMenu/ActionMenu";
import type { Device } from "../types/device";
import { useNavigate } from "react-router";

export function DeviceActionsMenu({ device }: { device: Device }) {
  const navigate = useNavigate();
  const handleRemove = () => {
    modals.openConfirmModal({
      title: "Remove device",
      children: (
        <Text size="sm">
          Are you sure you want to remove <b>{device.name}</b>?
        </Text>
      ),
      labels: { confirm: "Remove", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        console.log("Device removed");
      },
    });
  };

  return (
    <ActionsMenu
      actions={[
        {
          key: "view",
          label: "View Details",
          icon: <IconEye size={16} />,
          onClick: () => {
            navigate(`/devices/${device.id}`);
          },
        },
        {
          key: "trigger",
          label: "Trigger Backup",
          icon: <IconRefresh size={16} />,
          onClick: () => {},
        },
        {
          key: "download",
          label: "Download Config",
          icon: <IconDownload size={16} />,
          onClick: () => {},
        },
        {
          key: "remove",
          label: "Remove Device",
          icon: <IconTrash size={16} />,
          color: "red",
          onClick: handleRemove,
        },
      ]}
    />
  );
}
