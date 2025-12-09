import { PasswordInput, TextInput, Button } from "@mantine/core";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().nonempty(),
});
export type LoginFormValues = z.infer<typeof loginSchema>;

type LoginHandler = (values: LoginFormValues) => Promise<void> | void;

interface LoginFormProps {
  onSubmit: LoginHandler;
}
export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <TextInput
        mt="sm"
        label="Email"
        placeholder="Email"
        {...form.register("email")}
        error={form.formState.errors.email?.message}
      />
      <PasswordInput
        mt="sm"
        label="Password"
        placeholder="Password"
        min={0}
        max={99}
        {...form.register("password")}
        error={form.formState.errors.password?.message}
      />
      <Button type="submit" mt="sm">
        Sign In
      </Button>
    </form>
  );
};
