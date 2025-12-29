import { Text } from "@mantine/core";
import { modals } from "@mantine/modals";

interface ConfirmDeleteOptions {
  title: string;
  itemName: string;
  onConfirm: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  warningText?: string;
}

export function confirmDelete({
  title,
  itemName,
  onConfirm,
  confirmLabel = "Remove",
  cancelLabel = "Cancel",
  warningText,
}: ConfirmDeleteOptions) {
  modals.openConfirmModal({
    title,
    children: (
      <Text size="sm">
        {warningText || "Are you sure you want to remove"}{" "}
        <Text component="span" fw={600}>
          {itemName}
        </Text>
        ?
        {!warningText && (
          <>
            <br />
            This action cannot be undone.
          </>
        )}
      </Text>
    ),
    labels: { confirm: confirmLabel, cancel: cancelLabel },
    confirmProps: { color: "red" },
    onConfirm,
  });
}
