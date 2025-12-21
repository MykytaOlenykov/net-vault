import type { ReactNode } from "react";
import { Card } from "@mantine/core";
import style from "./AuthCard.module.css";

interface AuthCardProps {
  children: ReactNode;
}
export const AuthCard = ({ children }: AuthCardProps) => {
  return (
    <Card
      w={"100%"}
      maw={448}
      miw={300}
      shadow="sm"
      padding="xl"
      radius="md"
      className={style.card}
    >
      {children}
    </Card>
  );
};
