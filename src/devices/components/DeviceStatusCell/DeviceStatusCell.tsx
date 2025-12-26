import { Badge } from "@mantine/core";
import type { StatusBackup } from "../../types/device";
import classes from "./DeviceStatusCell.module.css";

export function DeviceStatusCell({ status }: { status: StatusBackup }) {
  return (
    <Badge className={classes.badge} data-status={status}>
      {status}
    </Badge>
  );
}
