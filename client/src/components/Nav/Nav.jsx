import { SearchBar } from "../SearchBar/SearchBar";
import { Title } from "../Title/title";

export const Nav = ({ onSearch }) => {
  return (
    <div>
      <Title />
      <SearchBar onSearch={onSearch} />
    </div>
  );
};
