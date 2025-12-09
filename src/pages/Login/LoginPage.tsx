import { useState } from "react";
import {
  AuthCard,
  AuthLayout,
  LoginForm,
  OtpForm,
} from "../../components/Auth";
import type { LoginFormValues } from "../../components/Auth/LoginForm/loginForm";
import type { OtpFormValues } from "../../components/Auth/OtpForm/otpForm";
export default function LoginPage() {
  const [otpSent, setOtpSent] = useState(false);

  const handleLogin = (values: LoginFormValues) => {
    console.log("Login values", values);
    setOtpSent(true);
  };

  const handleOtpSubmit = (values: OtpFormValues) => {
    console.log("OTP submitted", values);
    alert("Login success!");
  };

  return (
    <AuthLayout>
      <AuthCard>
        {!otpSent ? (
          <LoginForm onSubmit={handleLogin} />
        ) : (
          <OtpForm onSubmit={handleOtpSubmit} />
        )}
      </AuthCard>
    </AuthLayout>
  );
}
