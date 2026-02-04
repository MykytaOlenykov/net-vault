import { Paper, Group, Text, Badge, Table } from "@mantine/core";
import type { RecentChange } from "./types";

interface RecentChangesTableProps {
  recentChanges: RecentChange[];
}

export default function RecentChangesTable({
  recentChanges,
}: RecentChangesTableProps) {
  return (
    <Paper
      radius="md"
      className="bg-[#1a1b26] border border-[rgba(139,92,246,0.15)]"
    >
      <Group
        justify="space-between"
        p="lg"
        className="border-b border-[#373854]"
      >
        <Text fw={500}>Recent Configuration Changes</Text>
        <Badge variant="light" color="violet">
          5 changes
        </Badge>
      </Group>
      <Table highlightOnHover>
        <Table.Thead>
          <Table.Tr className="border-b border-[#373854]">
            <Table.Th>Device</Table.Th>
            <Table.Th>Change Type</Table.Th>
            <Table.Th>User</Table.Th>
            <Table.Th>Timestamp</Table.Th>
            <Table.Th>Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {recentChanges.map((change, index) => (
            <Table.Tr key={index} className="border-b border-[#24253a]">
              <Table.Td>{change.device}</Table.Td>
              <Table.Td c="dimmed">{change.type}</Table.Td>
              <Table.Td c="dimmed">{change.user}</Table.Td>
              <Table.Td c="dimmed">{change.timestamp}</Table.Td>
              <Table.Td>
                <Badge
                  color={change.status === "success" ? "teal" : "red"}
                  variant="light"
                >
                  {change.status}
                </Badge>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Paper>
  );
}
