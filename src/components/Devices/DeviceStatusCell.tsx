import { Badge } from "@mantine/core";
import type { StatusBackup } from "./types";

export function DeviceStatusCell({ status }: { status: StatusBackup }) {
  const statusColorMap = {
    success: "teal",
    failed: "red",
    warning: "yellow",
  };
  return (
    <Badge variant="light" color={statusColorMap[status]} data-status={status}>
      {status}
    </Badge>
  );
}
