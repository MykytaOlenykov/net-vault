export type DashboardAnalytics = {
  deviceTotal: number;
  backupTotals: {
    status: string;
    _count: number;
  }[];
  backupTotalLast24Hours: number;
};

export type DeviceConfigChange = {
  id: string;
  deviceName: string;
  changesCount: number;
  lastBackupAt: string;
};

export type DeviceConfigChangesResponse = {
  devices: [
    {
      id: string;
      name: string;
      configChanges: number;
      lastBackup: string;
    },
  ];
};
