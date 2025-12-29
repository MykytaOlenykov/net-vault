import { useMemo, useState } from "react";
import type { User } from "../types/user";

const USER_SEARCH_FIELDS = ["name", "email"];

export function useSearch(items: User[]) {
  const [search, setSearch] = useState("");

  const filteredItems = useMemo(() => {
    const q = search.toLowerCase();

    return items.filter((user) => {
      const matchesSearch =
        !q ||
        USER_SEARCH_FIELDS.some((field) => {
          const value = user[field as keyof User];
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

