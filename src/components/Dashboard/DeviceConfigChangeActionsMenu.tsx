import { IconEye, IconRefresh, IconDownload } from "@tabler/icons-react";
import { ActionsMenu } from "../../shared/ui/ActionMenu/ActionMenu";
import type { DeviceConfigChange } from "../../types/dashboardAnalytics";
import { useNavigate } from "react-router";
import { useTriggerBackup } from "../DeviceDetails/hooks/useTriggerBackup";
import { backupService } from "../../api";
import { notify } from "../../shared/helpers/notify";
import { useDownloadConfig } from "../DeviceDetails/hooks/useDownloadConfig";

export function DeviceConfigChangeActionsMenu({
  device,
}: {
  device: DeviceConfigChange;
}) {
  const navigate = useNavigate();
  const { mutate: triggerBackup } = useTriggerBackup();
  const { downloadText } = useDownloadConfig();

  const viewDetails = () => {
    navigate(`/devices/${device.id}`);
  };

  const trigger = () => {
    triggerBackup(device.id);
  };

  const getAndDownloadConfig = async () => {
    try {
      const backup = await backupService.getLastBackup(device.id);
      if (!backup || !backup.configText) {
        notify.error("No config available for download");
        return;
      }
      downloadText(backup.configText, `backup_v${backup.versionNumber}.txt`);
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
          onClick: getAndDownloadConfig,
        },
      ]}
    />
  );
}
