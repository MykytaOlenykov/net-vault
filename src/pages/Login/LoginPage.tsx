import { useState } from "react";
import {
  AuthCard,
  AuthLayout,
  LoginForm,
  OtpForm,
  ResetPasswordForm,
} from "../../components/Auth";
import type { LoginFormValues } from "../../components/Auth/LoginForm/loginForm";
import type { OtpFormValues } from "../../components/Auth/OtpForm/otpForm";

export default function LoginPage() {
  const [otpSent, setOtpSent] = useState(false);
  const [showReset, setShowReset] = useState(false);

  const handleLogin = (values: LoginFormValues) => {
    console.log("Login values", values);
    setOtpSent(true);
  };

  const handleOtpSubmit = (values: OtpFormValues) => {
    console.log("OTP submitted", values);
    alert("Login success!");
    setOtpSent(false);
  };

  const handleResetPassword = () => {
    setShowReset(true);
  };

  const handleResetSubmit = (values: { email: string }) => {
    console.log("Reset requested", values);
    alert("Reset link sent to your email.");
    setShowReset(false);
  };

  return (
    <AuthLayout>
      <AuthCard>
        {showReset ? (
          <ResetPasswordForm onSubmit={handleResetSubmit} />
        ) : !otpSent ? (
          <LoginForm
            onSubmit={handleLogin}
            onResetPassword={handleResetPassword}
          />
        ) : (
          <OtpForm onSubmit={handleOtpSubmit} />
        )}
      </AuthCard>
    </AuthLayout>
  );
}
