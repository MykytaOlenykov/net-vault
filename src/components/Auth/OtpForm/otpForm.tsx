import { useForm } from "react-hook-form";
import { TextInput, Button } from "@mantine/core";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const otpSchema = z.object({
  otp: z.string().regex(/^\d{6}$/, "OTP must be exactly 6 digits"),
});

export type OtpFormValues = z.infer<typeof otpSchema>;

type OtpHandler = (values: OtpFormValues) => Promise<void> | void;

interface OtpFormProps {
  onSubmit: OtpHandler;
}
export const OtpForm = ({ onSubmit }: OtpFormProps) => {
  const form = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <TextInput
        label="Enter OTP"
        placeholder="6-digit code"
        maxLength={6}
        {...form.register("otp")}
        error={form.formState.errors.otp?.message}
      />

      <Button fullWidth type="submit" mt="lg">
        Verify OTP
      </Button>
    </form>
  );
};
