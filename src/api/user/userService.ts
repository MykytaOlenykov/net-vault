import ApiClient from "../ApiClient";
import type { User, GetUsersQuery } from "../../components/Users/types/user";
import type { CreateUserDto, UpdateUserDto, ChangeRoleDto } from "../../components/Users/schemas/user.schema";

export type PaginatedResponse<T> = {
  data: {
    users: T;
  };
  meta: {
    page: number;
    limit: number;
    total: number;
  };
};

export type Response<T> = {
  data: {
    user: T;
  };
};

export type Role = {
  id: string;
  name: string;
  description: string;
};

export type RolesResponse = {
  data: {
    roles: Role[];
  };
};

class UserService extends ApiClient {
  async getUsers(query?: GetUsersQuery): Promise<User[]> {
    const response = await this.get<PaginatedResponse<User[]>>("/users", {
      params: query,
    });

    return response.data.data.users;
  }

  async getUser(userId: number): Promise<User> {
    const response = await this.get<Response<User>>(`/users/${userId}`);

    return response.data.data.user;
  }

  async getRoles(): Promise<Role[]> {
    const response = await this.get<RolesResponse>("/users/roles");

    return response.data.data.roles;
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const response = await this.post<Response<User>>("/users", data);

    return response.data.data.user;
  }

  async updateUser(userId: number, data: UpdateUserDto): Promise<User> {
    const response = await this.put<Response<User>>(
      `/users/${userId}`,
      data,
    );

    return response.data.data.user;
  }

  async changeRole(userId: number, data: ChangeRoleDto): Promise<User> {
    const response = await this.patch<Response<User>>(
      `/users/${userId}/role`,
      data,
    );

    return response.data.data.user;
  }

  async deleteUser(userId: number): Promise<void> {
    await this.delete(`/users/${userId}`);
  }
}

export const userService = new UserService();

