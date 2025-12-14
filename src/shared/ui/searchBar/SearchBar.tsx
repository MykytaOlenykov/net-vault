import { TextInput } from "@mantine/core";

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
    <div className="w-full max-w-md mx-auto p-4">
      <TextInput value={value} onChange={handleChange} placeholder="Search" />
    </div>
  );
};
