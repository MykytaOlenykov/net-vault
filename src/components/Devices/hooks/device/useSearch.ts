import { useMemo, useState } from "react";
import type { Device } from "../../types/device";

export function useSearch(items: Device[]) {
  const [search, setSearch] = useState("");

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();

    if (!q) return items;
    return items.filter((device) => {
      return (
        device.name.toLowerCase().includes(q) ||
        device.ipAddress.toLowerCase().includes(q) ||
        device.deviceType.vendor.toLowerCase().includes(q) ||
        device.deviceTags.some((dt) => dt.tag.name.toLowerCase().includes(q))
      );
    });
  }, [items, search]);

  return {
    search,
    setSearch,
    filteredItems,
  };
}
