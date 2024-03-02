import { SearchBar } from "../SearchBar/SearchBar";
import { Title } from "../Title/title";
import { useLocation } from "react-router-dom";
import style from "./Nav.module.css";

export const Nav = ({ onSearch }) => {
  const location = useLocation();

  return location.pathname === "/home" ? (
    <div className={style.navContainer}>
      <Title />
      <SearchBar onSearch={onSearch} />
    </div>
  ) : (
    <></>
  );
};
