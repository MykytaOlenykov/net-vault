import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

interface SearchBarProps {
  value: string;
  onSearch: (value: string) => void;
}

export const SearchBar = ({ value, onSearch }: SearchBarProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;
    onSearch(newValue);
  };
  return (
    <TextInput
      style={{ flex: 1 }}
      value={value}
      leftSection={<IconSearch size={16} />}
      onChange={handleChange}
      placeholder="Search by name, IP or model"
    />
  );
};
