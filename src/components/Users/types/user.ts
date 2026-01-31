export type UserStatus = "active" | "inactive" | "pending";

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: UserStatus;
  lastLogin: string;
  mfa?: boolean;
}

export type GetUsersQuery = {
  page?: number;
  limit?: number;
  role?: string;
  status?: UserStatus;
  search?: string;
};

