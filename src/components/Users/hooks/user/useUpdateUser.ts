import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../../../../api/user/userService";
import { usersQueries } from "./queryKeys";
import type { UpdateUserDto } from "../../schemas/user.schema";

export function useUpdateUser(userId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateUserDto) => {
      return userService.updateUser(userId, data);
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

