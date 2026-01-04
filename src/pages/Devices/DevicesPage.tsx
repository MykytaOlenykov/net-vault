import { Paper, Stack, Group, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useMemo } from "react";
import { useDisclosure } from "@mantine/hooks";

import {
  DevicesTable,
  DevicesFilters,
  useDevicesFilter,
  useSearch,
} from "../../components/Devices";
import { SearchBar } from "../../shared/ui/searchBar";
import { useGetDevices } from "../../components/Devices/hooks/device/useGetDevices";
import { DeviceModal } from "../../components/Devices/DeviceModal";
import style from "./DevicePage.module.css";
import { useDeviceFormOptions } from "../../components/Devices/hooks/device/useDeviceFormOptions";

export default function DevicesPage() {
  const [opened, { open, close }] = useDisclosure(false);

  const { data: devices = [] } = useGetDevices();

  const { deviceTypeSelectOptions, tagOptions } = useDeviceFormOptions();
  const {
    search,
    setSearch,
    filteredItems: searchedDevices,
  } = useSearch(devices);

  const vendorFilterOptions = useMemo(
    () => [{ value: "all", label: "All" }, ...deviceTypeSelectOptions],
    [deviceTypeSelectOptions],
  );

  const { vendor, setVendor, status, setStatus, statusOptions, filteredItems } =
    useDevicesFilter(searchedDevices, vendorFilterOptions);

  return (
    <div className={style.device_page}>
      <Paper p="md" withBorder>
        <Stack gap="md">
          <Group justify="space-between">
            <SearchBar value={search} onSearch={setSearch} />
            <Button onClick={open} leftSection={<IconPlus size={16} />}>
              Add device
            </Button>
          </Group>

          <DevicesFilters
            vendor={vendor}
            status={status}
            vendorsOptions={vendorFilterOptions}
            statusOptions={statusOptions}
            onVendorChange={setVendor}
            onStatusChange={setStatus}
          />
        </Stack>
      </Paper>

      <Paper p="md" withBorder>
        <DevicesTable items={filteredItems} />
      </Paper>

      <DeviceModal
        opened={opened}
        onClose={close}
        mode="create"
        deviceTypes={deviceTypeSelectOptions}
        tagOptions={tagOptions}
      />
    </div>
  );
}
