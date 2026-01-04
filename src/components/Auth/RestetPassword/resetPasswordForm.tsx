import { TextInput, Button } from "@mantine/core";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import style from "./resetPasswordForm.module.css";
const resetSchema = z.object({
  email: z.email(),
});

export type ResetPasswordFormValues = z.infer<typeof resetSchema>;

type ResetPasswordHandler = (
  values: ResetPasswordFormValues,
) => Promise<void> | void;

interface ResetPasswordFormProps {
  onSubmit: ResetPasswordHandler;
}

export const ResetPasswordForm = ({ onSubmit }: ResetPasswordFormProps) => {
  const form = useForm({
    resolver: zodResolver(resetSchema),
    defaultValues: { email: "" },
  });

  return (
    <form className={style.form} onSubmit={form.handleSubmit(onSubmit)}>
      <TextInput
        mt="sm"
        label="Email"
        placeholder="Enter your email"
        {...form.register("email")}
        error={form.formState.errors.email?.message}
      />

      <Button type="submit" mt="sm" fullWidth>
        Reset password
      </Button>
    </form>
  );
};
