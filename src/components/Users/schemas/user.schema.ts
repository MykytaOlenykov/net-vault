import { z } from "zod";

/* ======================================================
   CREATE (API request)
   ====================================================== */

export const createUserSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.string().min(1, "Role is required"),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;

/* ======================================================
   UPDATE (API request)
   ====================================================== */

export const updateUserSchema = z.object({
  name: z.string().min(2, "Name is required").optional(),
  email: z.string().email("Invalid email address").optional(),
  status: z.enum(["active", "inactive", "pending"]).optional(),
});

export type UpdateUserDto = z.infer<typeof updateUserSchema>;

/* ======================================================
   CHANGE ROLE (API request)
   ====================================================== */

export const changeRoleSchema = z.object({
  role: z.string().min(1, "Role is required"),
});

export type ChangeRoleDto = z.infer<typeof changeRoleSchema>;

