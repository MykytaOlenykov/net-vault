import { notifications } from "@mantine/notifications";

export const notify = {
  success(message: string, title = "Success") {
    notifications.show({
      title,
      message,
      color: "green",
      position: "top-center",
    });
  },

  error(message: string, title = "Error") {
    notifications.show({
      title,
      message,
      color: "red",
      position: "top-center",
    });
  },

  info(message: string, title = "Info") {
    notifications.show({
      title,
      message,
      color: "blue",
      position: "top-center",
    });
  },
};
