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

interface TableProps<IData extends { id: React.Key }> {
  items: IData[];
  columns: TableColumn<IData>[];

  totalPages?: number;
  activePage?: number;
  setPage?: (page: number) => void;
  onRowClick?: (item: IData) => void;
}

export function Table<IData extends { id: React.Key }>({
  items,
  columns,
  totalPages,
  activePage,
  setPage,
  onRowClick,
}: TableProps<IData>) {
  return (
    <Stack gap="xs">
      <TableScrollContainer minWidth="100%">
        <MTable highlightOnHover striped={false} verticalSpacing="xs">
          <TableThead>
            <TableTr>
              {columns.map((col) => (
                <TableTh key={col.key}>{col.header}</TableTh>
              ))}
            </TableTr>
          </TableThead>

          <TableTbody>
            {items.map((item) => (
              <TableTr
                key={item.id}
                onClick={() => onRowClick?.(item)}
                style={{
                  cursor: onRowClick ? "pointer" : "default",
                }}
              >
                {columns.map((col) => (
                  <TableTd
                    onClick={
                      col.stopRowClick ? (e) => e.stopPropagation() : undefined
                    }
                    key={col.key}
                  >
                    {col.render(item)}
                  </TableTd>
                ))}
              </TableTr>
            ))}
          </TableTbody>

          <TableTfoot>
            <TableTr />
          </TableTfoot>
        </MTable>
      </TableScrollContainer>

      {totalPages && (
        <Flex justify="center">
          <Pagination
            total={totalPages}
            value={activePage}
            onChange={setPage}
            radius="xl"
            size="md"
          />
        </Flex>
      )}
    </Stack>
  );
}
