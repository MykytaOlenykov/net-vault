import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../../../../api/user/userService";
import { usersQueries } from "./queryKeys";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: number) => userService.deleteUser(userId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: usersQueries.lists(),
      });
    },
  });
}

