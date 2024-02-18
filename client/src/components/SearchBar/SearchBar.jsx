import { useState } from "react";
import style from "./SearchBar.module.css";

export const SearchBar = ({ onSearch }) => {
  const handleHover = () => {
    const magnifyingGlass = document.querySelector(
      `.${styles.magnifyingGlass}`
    );
    magnifyingGlass.classList.add(styles.magnifyingGlassHovered);
  };

  const handleLeave = () => {
    const magnifyingGlass = document.querySelector(
      `.${styles.magnifyingGlass}`
    );
    magnifyingGlass.classList.remove(styles.magnifyingGlassHovered);
  };

  const [state, setState] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;

    setState(value);
  };

  const handleClick = () => {
    onSearch(state);

    setState("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleClick();
    }

    if (event.key === "Escape") {
      setState("");
    }
  };

  return (
    <div id={style.SearchContainer}>
      <input
        className={style.SearchBar}
        value={state}
        placeholder="Search..."
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <i className="fa-solid fa-search"></i>
    </div>
  );
};
