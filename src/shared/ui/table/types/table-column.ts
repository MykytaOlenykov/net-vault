export interface TableColumn<IData> {
  key: string;
  header: React.ReactNode;
  render: (row: IData) => React.ReactNode;
  stopRowClick?: boolean;
}
