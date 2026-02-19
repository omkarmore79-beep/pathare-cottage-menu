"use client";

interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = "Search dishes..." }: Props) {
  return (
    <div className="mt-4">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-2xl 
        border border-[#5a1f1f]/20
        bg-white shadow-sm
        focus:outline-none focus:ring-2 focus:ring-[#5a1f1f]"
      />
    </div>
  );
}
