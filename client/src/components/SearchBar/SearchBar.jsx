import { useState } from "react";
import style from "./SearchBar.module.css";

export const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;

    setSearchTerm(value);
  };

  const handleClick = () => {
    onSearch(searchTerm);

    setSearchTerm("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleClick();
    }

    if (event.key === "Escape") {
      setSearchTerm("");
    }
  };

  return (
    <div id={style.SearchContainer}>
      <input
        className={style.SearchBar}
        value={searchTerm}
        placeholder="Search..."
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <i className="fa-solid fa-search"></i>
    </div>
  );
};
