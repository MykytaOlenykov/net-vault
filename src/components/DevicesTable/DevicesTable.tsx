import { useState, useMemo } from "react";
import { Table } from "../../shared/ui/table";
import { SearchBar } from "../../shared/ui/searchBar/SearchBar";
import type { TableColumn } from "../../shared/ui/table/types/table-column";

export type Device = {
  id: number;
  name: string;
  ip_address: string;
  port: number;
  device_type: string;
  tags: string[];
  backup_schedule: string;
  last_backup_at: string | null;
  last_backup_status: string;
  is_active: boolean;
  created_at: string;
};
export function DevicesTable({ items }: { items: Device[] }) {
  const [searchValue, setSearchValue] = useState("");

  const deviceColumns: TableColumn<Device>[] = useMemo(
    () => [
      { key: "id", header: "ID" },
      { key: "name", header: "Name" },
      { key: "ip_address", header: "IP Address" },
      { key: "port", header: "Port" },
      { key: "device_type", header: "Type" },
      { key: "tags", header: "Tags", row: (device) => device.tags.join(", ") },
      { key: "backup_schedule", header: "Backup Schedule" },
      {
        key: "last_backup_at",
        header: "Last Backup",
        row: (device) => device.last_backup_at ?? "N/A",
      },
      { key: "last_backup_status", header: "Status" },
      {
        key: "is_active",
        header: "Active",
        row: (device) => (device.is_active ? "✅" : "❌"),
      },
      { key: "created_at", header: "Created At" },
    ],
    [],
  );

  return (
    <div>
      <SearchBar value={searchValue} onSearch={setSearchValue} />
      <Table<Device> items={items} columns={deviceColumns} idKey="id" />
    </div>
  );
}
