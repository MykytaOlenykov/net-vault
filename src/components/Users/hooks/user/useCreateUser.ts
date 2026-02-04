import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../../../../api/user/userService";
import type { CreateUserDto } from "../../schemas/user.schema";
import { usersQueries } from "./queryKeys";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateUserDto) =>
      userService.createUser(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: usersQueries.lists(),
      });
    },
  });
}

