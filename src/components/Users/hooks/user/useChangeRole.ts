import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../../../../api/user/userService";
import { usersQueries } from "./queryKeys";
import type { ChangeRoleDto } from "../../schemas/user.schema";

export function useChangeRole(userId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ChangeRoleDto) => {
      return userService.changeRole(userId, data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: usersQueries.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: usersQueries.detail(userId).queryKey,
      });
    },
  });
}

