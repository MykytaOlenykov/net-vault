import { PasswordInput, TextInput, Button, Text } from "@mantine/core";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import style from "./loginForm.module.css";

const loginSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

type LoginHandler = (values: LoginFormValues) => Promise<void> | void;

interface LoginFormProps {
  onSubmit: LoginHandler;
  onResetPassword?: () => void;
  loading?: boolean;
}

export const LoginForm = ({
  onSubmit,
  onResetPassword,
  loading,
}: LoginFormProps) => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <form
      noValidate
      onSubmit={form.handleSubmit(onSubmit)}
      className={style.form}
    >
      <TextInput
        label="Email Address"
        placeholder="admin@netvault.io"
        {...form.register("email")}
        error={form.formState.errors.email?.message}
        classNames={{
          root: style.inputWrapper,
          input: style.input,
          label: style.label,
          error: style.error,
        }}
      />

      <PasswordInput
        label="Password"
        placeholder="••••••••"
        {...form.register("password")}
        error={form.formState.errors.password?.message}
        classNames={{
          root: style.inputWrapper,
          input: style.input,
          label: style.label,
          error: style.error,
        }}
      />

      <Button type="submit" loading={loading} className={style.button}>
        Log In
      </Button>

      {onResetPassword && (
        <Text
          component="button"
          onClick={onResetPassword}
          className={style.forgot}
        >
          Forgot password?
        </Text>
      )}
    </form>
  );
};
