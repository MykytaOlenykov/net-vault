import { Select } from "@mantine/core";

interface SelectFilterProps<T extends string> {
  label: string;
  value: T;
  data: { value: T; label: string }[];
  onChange: (value: T) => void;
}

export function SelectFilter<T extends string>({
  label,
  value,
  data,
  onChange,
}: SelectFilterProps<T>) {
  // Нормалізуємо дані, щоб переконатися, що всі значення - рядки
  const normalizedData = data.map((item) => ({
    value: String(item.value) as T,
    label: String(item.label),
  }));

  return (
    <Select
      label={label}
      value={value ? String(value) : null}
      data={normalizedData}
      onChange={(v) => v && onChange(v as T)}
    />
  );
}
