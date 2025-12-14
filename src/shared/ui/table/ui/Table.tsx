import {
  Flex,
  Table as MTable,
  Pagination,
  Stack,
  TableScrollContainer,
  TableTbody,
  TableTd,
  TableTfoot,
  TableTh,
  TableThead,
  TableTr,
} from "@mantine/core";

import type { TableColumn } from "../types/table-column";

interface TableProps<IData extends object> {
  idKey?: keyof IData | "id";
  items: IData[];
  columns: TableColumn<IData>[];

  title?: React.ReactNode;

  totalPages?: number;
  activePage?: number;
  setPage?: (page: number) => void;
}

export function Table<IData extends object>({
  idKey = "id",
  items,
  columns,

  totalPages,
  activePage,
  setPage,
}: TableProps<IData>) {
  const rows = items.map((item) => (
    <TableTr key={item[idKey as keyof IData] as React.Key}>
      {columns.map(({ key, row }) => (
        <TableTd key={key as React.Key}>
          {(row?.(item) ?? item[key]) as React.ReactNode}
        </TableTd>
      ))}
    </TableTr>
  ));

  const cols = columns.map(({ key, header }) => (
    <TableTh key={key as React.Key}>{header}</TableTh>
  ));

  return (
    <Stack gap="xs">
      <TableScrollContainer minWidth="100%">
        <MTable
          style={{
            width: "max-content",
            minWidth: "100%",
          }}
          highlightOnHover
          striped
          verticalSpacing="xs"
        >
          <TableThead>
            <TableTr>{cols}</TableTr>
          </TableThead>

          <TableTbody>{rows}</TableTbody>

          <TableTfoot>
            <TableTr />
          </TableTfoot>
        </MTable>
      </TableScrollContainer>

      <Flex justify="center">
        {totalPages && (
          <Pagination
            total={totalPages}
            value={activePage}
            onChange={setPage}
            radius="xl"
            size="md"
          />
        )}
      </Flex>
    </Stack>
  );
}
