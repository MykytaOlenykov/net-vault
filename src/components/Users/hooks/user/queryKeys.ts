import { queryOptions } from "@tanstack/react-query";
import { userService } from "../../../../api/user/userService";
import type { User, GetUsersQuery } from "../../types/user";
import type { Role } from "../../../../api/user/userService";

export const usersQueries = {
  all: () => ["users"],

  lists: () => [...usersQueries.all(), "list"],

  list: (query?: GetUsersQuery) =>
    queryOptions({
      queryKey: [...usersQueries.lists(), query],
      queryFn: () => userService.getUsers(query),
    }),

  details: () => [...usersQueries.all(), "detail"],

  detail: (id: number) =>
    queryOptions<User>({
      queryKey: [...usersQueries.details(), id],
      queryFn: () => userService.getUser(id),
    }),

  roles: () =>
    queryOptions<Role[]>({
      queryKey: [...usersQueries.all(), "roles"],
      queryFn: () => userService.getRoles(),
    }),
};

