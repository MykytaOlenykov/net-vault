import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}
export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-50 p-4">
      {children}
    </div>
  );
};
