import { SearchBar } from "../SearchBar/SearchBar";
import { Title } from "../Title/title";
import style from "./Nav.module.css";

export const Nav = ({ onSearch }) => {
  return (
    <div className={style.navContainer}>
      <Title />
      <SearchBar onSearch={onSearch} />
    </div>
  );
};
