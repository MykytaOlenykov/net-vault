import { IconEye, IconRefresh, IconDownload } from "@tabler/icons-react";
import { ActionsMenu } from "../../shared/ui/ActionMenu/ActionMenu";
import type { DeviceConfigChange } from "../../types/dashboardAnalytics";
import { useNavigate } from "react-router";
import { useTriggerBackup } from "../DeviceDetails/hooks/useTriggerBackup";
import { backupService } from "../../api";
import { notify } from "../../shared/helpers/notify";

export function DeviceConfigChangeActionsMenu({
  device,
}: {
  device: DeviceConfigChange;
}) {
  const navigate = useNavigate();
  const { mutate: triggerBackup } = useTriggerBackup();

  const viewDetails = () => {
    navigate(`/devices/${device.id}`);
  };

  const trigger = () => {
    triggerBackup(device.id);
  };

  const downloadConfig = async () => {
    try {
      const backup = await backupService.getLastBackup(device.id);
      if (!backup || !backup.configText) {
        notify.error("No config available for download");
        return;
      }
      const blob = new Blob([backup.configText], {
        type: "text/plain",
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${device.deviceName}-last-config.txt`;
      link.click();
      URL.revokeObjectURL(url);
    } catch {
      notify.error("Failed to download config");
    }
  };

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
          onClick: trigger,
        },
        {
          key: "download",
          label: "Download Config",
          icon: <IconDownload size={16} />,
          onClick: downloadConfig,
        },
      ]}
    />
  );
}
