import { notify } from "../../../shared/helpers/notify";

export function useDownloadConfig() {
  const downloadText = (text: string, filename: string) => {
    try {
      const blob = new Blob([text], {
        type: "text/plain;charset=utf-8",
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = filename;
      link.click();

      URL.revokeObjectURL(url);
    } catch {
      notify.error("Failed to download configuration");
    }
  };

  return { downloadText };
}
