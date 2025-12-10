import { ActionIcon, Box } from "@mantine/core";
import { IconBell } from "@tabler/icons-react";

export const NotificationButton = () => {
  return (
    <ActionIcon
      variant="subtle"
      color="gray"
      size="lg"
      radius="md"
      styles={(theme) => ({
        root: {
          color: theme.colors.gray[4],
          position: "relative",
          "&:hover": {
            backgroundColor: theme.colors.dark[7],
            color: theme.white,
          },
        },
      })}
    >
      <IconBell size={20} />
      <Box
        style={(theme) => ({
          position: "absolute",
          top: theme.spacing.xs,
          right: theme.spacing.xs,
          width: theme.spacing.xs,
          height: theme.spacing.xs,
          backgroundColor: theme.colors.red[5],
          borderRadius: "50%",
        })}
      />
    </ActionIcon>
  );
};

