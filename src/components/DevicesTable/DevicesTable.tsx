import { useNavigate } from "react-router";
import { Table } from "@mantine/core";
import { deviceTableHeaderMap } from "../../shared/constants/constants";

type Device = {
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
interface DevicesTableProps {
  mockDevices: Device[];
}

export const DevicesTable = ({ mockDevices }: DevicesTableProps) => {
  const navigate = useNavigate();
  const rows = mockDevices.map((element) => (
    <Table.Tr
      key={element.id}
      onClick={() => navigate(`devices/${element.id}`)}
      style={{
        cursor: "pointer",
        transition: "background 0.15s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#866c6cff")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {Object.values(deviceTableHeaderMap).map((keysName) => {
        const key = keysName as keyof Device;
        const value = element[key];
        return (
          <Table.Td key={key}>
            {Array.isArray(value) ? value.join(",") : value?.toString()}
          </Table.Td>
        );
      })}
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={500}>
      <Table>
        <Table.Thead>
          <Table.Tr>
            {Object.keys(deviceTableHeaderMap).map((headersName) => (
              <Table.Th>{headersName}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <></>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};
