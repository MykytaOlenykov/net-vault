import { PasswordInput, TextInput, Button, Text } from "@mantine/core";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import style from "./loginForm.module.css";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().nonempty({ message: "Password is required" }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

type LoginHandler = (values: LoginFormValues) => Promise<void> | void;

interface LoginFormProps {
  onSubmit: LoginHandler;
  onResetPassword?: () => void;
  loading?: boolean;
  error: string | null;
}

export const LoginForm = ({ onSubmit, loading, error }: LoginFormProps) => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <TextInput
        mt="sm"
        label="Email"
        placeholder="admin@netvault.io"
        required={true}
        {...form.register("email")}
        error={form.formState.errors.email?.message}
        classNames={{
          input: style.input,
          label: style.label,
          error: style.error,
          root: style.inputWrapper,
        }}
      />

      <PasswordInput
        mt="sm"
        label="Password"
        placeholder="••••••••"
        required={true}
        {...form.register("password")}
        error={form.formState.errors.password?.message}
        classNames={{
          input: style.input,
          label: style.label,
          error: style.error,
          root: style.inputWrapper,
        }}
      />

      <Button type="submit" mt="sm" disabled={loading} className={style.button}>
        {loading ? "Signing in..." : "Log In"}
      </Button>

      {error && (
        <Text color="red" size="sm" mt="sm">
          {error}
        </Text>
      )}
    </form>
  );
};
