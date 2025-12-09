import type { ReactNode } from "react";
import { Card } from "@mantine/core";

interface AuthCardProps {
  children: ReactNode;
}
export const AuthCard = ({ children }: AuthCardProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" className="w-full max-w-md">
      {children}
    </Card>
  );
};
