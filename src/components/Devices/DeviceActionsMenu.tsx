import {
  IconEye,
  IconRefresh,
  IconDownload,
  IconTrash,
} from "@tabler/icons-react";
import { ActionsMenu } from "../../shared/ui/ActionMenu/ActionMenu";
import type { Device } from "../../types/device";
import { useDeviceActions } from "./hooks/useDeviceActions";

export function DeviceActionsMenu({ device }: { device: Device }) {
  const { viewDetails, triggerBackup, downloadConfig, removeDevice } =
    useDeviceActions(device);

  return (
    <ActionsMenu
      actions={[
        {
          key: "view",
          label: "View Details",
          icon: <IconEye size={16} />,
          onClick: viewDetails,
        },
        {
          key: "trigger",
          label: "Trigger Backup",
          icon: <IconRefresh size={16} />,
          onClick: triggerBackup,
        },
        {
          key: "download",
          label: "Download Config",
          icon: <IconDownload size={16} />,
          onClick: downloadConfig,
        },
        {
          key: "remove",
          label: "Remove Device",
          icon: <IconTrash size={16} />,
          color: "red",
          onClick: removeDevice,
        },
      ]}
    />
  );
}
