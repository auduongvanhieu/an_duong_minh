import { useEffect, useState } from "react";

export const SearchBox = ({ onChange }) => {
  const [textSearch, setTextSearch] = useState("");
  useEffect(() => {
    let a = setTimeout(() => {
      onChange(textSearch);
    }, 500);
    return () => clearTimeout(a);
  }, [textSearch]);
  const handleChange = ({ target: { value } }) => {
    setTextSearch(value);
  };
  return (
    <input
      onChange={handleChange}
      type="text"
      style={{ width: "50%" }}
      placeholder="Tìm kiếm video"
    />
  );
};
