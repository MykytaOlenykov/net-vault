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
  return (
    <Select
      label={label}
      value={value}
      data={data}
      onChange={(v) => v && onChange(v as T)}
    />
  );
}
