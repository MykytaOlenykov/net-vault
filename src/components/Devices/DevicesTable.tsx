import { useNavigate } from "react-router";
import { Table } from "../../shared/ui/table";
import { deviceColumns } from "./DeviceColumns";
import type { Device } from "../../types/device";

interface DevicesTableProps {
  items: Device[];
}

export function DevicesTable({ items }: DevicesTableProps) {
  const navigate = useNavigate();
  return (
    <>
      <Table
        items={items}
        columns={deviceColumns}
        onRowClick={(device: Device) => navigate(`/devices/${device.id}`)}
      />
    </>
  );
}
