import { useQuery } from "@tanstack/react-query";
import { usersQueries } from "./queryKeys";
import type { Role } from "../../../../api/user/userService";

export const useGetRoles = () => {
  return useQuery<Role[]>({
    ...usersQueries.roles(),
  });
};

