import { useQuery } from "@tanstack/react-query";
import { usersQueries } from "./queryKeys";
import type { GetUsersQuery } from "../../types/user";

export const useGetUsers = (query?: GetUsersQuery) => {
  return useQuery({
    ...usersQueries.list(query),
  });
};

