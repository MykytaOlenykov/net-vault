import type { ReactNode } from "react";
import style from "./AuthLayout.module.css";

interface AuthLayoutProps {
  children: ReactNode;
}
export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <div className={style.auth_layout}>{children}</div>;
};
