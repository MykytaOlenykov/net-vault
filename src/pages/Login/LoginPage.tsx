import { useState } from "react";
import {
  AuthCard,
  AuthLayout,
  LoginForm,
  OtpForm,
  ResetPasswordForm,
} from "../..//components/Auth";
import type { LoginFormValues } from "../../components/Auth/LoginForm/loginForm";
import type { OtpFormValues } from "../../components/Auth/OtpForm/otpForm";
import { useAuth } from "../../shared/hooks/useAuth";
import { useNavigate } from "react-router";
import { Logo } from "../../components/RootLayout/Logo";

export default function LoginPage() {
  const [otpSent, setOtpSent] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const { error, loading, login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (values: LoginFormValues) => {
    const response = await login(values.email, values.password);
  };

  const handleOtpSubmit = (values: OtpFormValues) => {
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
        <Logo />

        {showReset ? (
          <ResetPasswordForm onSubmit={handleResetSubmit} />
        ) : !otpSent ? (
          <LoginForm
            onSubmit={handleLogin}
            onResetPassword={handleResetPassword}
            loading={loading}
            error={error}
          />
        ) : (
          <OtpForm onSubmit={handleOtpSubmit} />
        )}
      </AuthCard>
    </AuthLayout>
  );
}
