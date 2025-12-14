export interface TableColumn<IData extends object> {
  key: keyof IData;
  header: React.ReactNode;
  row?: (row: IData) => React.ReactNode;
}
