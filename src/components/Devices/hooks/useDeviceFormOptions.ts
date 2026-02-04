import { useMemo } from "react";
import { useGetDeviceTags } from "./useGetDeviceTags";
import { useGetDeviceTypes } from "./useGetDeviceTypes";
export function useDeviceFormOptions() {
  const { data: deviceTypes = [] } = useGetDeviceTypes();
  const { data: tags = [] } = useGetDeviceTags();

  const deviceTypeSelectOptions = useMemo(
    () => deviceTypes?.map((t) => ({ value: t.id, label: t.vendor })),
    [deviceTypes],
  );

  const tagOptions = useMemo(
    () => tags?.map((t) => ({ value: t, label: t })),
    [tags],
  );

  return {
    deviceTypeSelectOptions,
    tagOptions,
  };
}
