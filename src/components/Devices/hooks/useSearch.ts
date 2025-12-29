import { useMemo, useState } from "react";
import type { Device } from "../types/device";
import { SEARCH_FIELDS } from "../../../shared/constants/constants";

export function useSearch(items: Device[]) {
  const [search, setSearch] = useState("");

  const filteredItems = useMemo(() => {
    const q = search.toLowerCase();

    return items.filter((device) => {
      const matchesSearch =
        !q ||
        SEARCH_FIELDS.some((field) => {
          const value = device[field as keyof Device];
          if (Array.isArray(value))
            return value.some((tag) => tag.toLowerCase().includes(q));
          return String(value).toLowerCase().includes(q);
        });

      return matchesSearch;
    });
  }, [items, search]);

  return {
    search,
    setSearch,
    filteredItems,
  };
}

