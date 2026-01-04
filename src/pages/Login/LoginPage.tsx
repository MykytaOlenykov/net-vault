import { useEffect, useState } from "react";
import {
  AuthCard,
  AuthLayout,
  LoginForm,
  OtpForm,
  ResetPasswordForm,
} from "../..//components/Auth";
import type { LoginFormValues } from "../../components/Auth/LoginForm/loginForm";
import type { OtpFormValues } from "../../components/Auth/OtpForm/otpForm";
import { useAuth } from "../../components/Auth/hooks/AuthContext";
import { useNavigate } from "react-router";
import { Logo } from "../../components/RootLayout/Logo";

export default function LoginPage() {
  const [otpSent, setOtpSent] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const { loading, login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  });

  const handleLogin = async (values: LoginFormValues) => {
    await login(values.email, values.password);
  };

  const handleOtpSubmit = (values: OtpFormValues) => {
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
          />
        ) : (
          <OtpForm onSubmit={handleOtpSubmit} />
        )}
      </AuthCard>
    </AuthLayout>
  );
}
