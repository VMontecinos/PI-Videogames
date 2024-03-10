import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { filterGames, sortGames, cleanFilters } from "../../redux/actions";
import style from "./SideBar.module.css";

export const SideBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const genres = useSelector((state) => state.allGenres);

  const reloadPage = () => {
    window.location.reload();
  };

  const handleClean = (e) => {
    dispatch(cleanFilters(e.target.value));
  };

  const handleFilter = (e) => {
    dispatch(filterGames(e.target.value));
  };

  const handleSort = (e) => {
    dispatch(sortGames(e.target.value));
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={style.sideBarMenu}>
      <Link
        to="/home"
        id={style.Link}
        onClick={() => {
          if (location.pathname === "/home" && window.scrollY !== 0) {
            scrollToTop();
          } else if (location.pathname === "/home" && window.scrollY === 0) {
            reloadPage();
          }
        }}
      >
        <i id={style.home} className={`fa-solid fa-house ${style.icons}`}></i>
        <h2>Home</h2>
      </Link>
      <Link to="/create" id={style.Link}>
        <i className={`fa-solid fa-plus ${style.icons}`}></i>
        <h2>Create</h2>
      </Link>
      <select name="filter" className={style.select} onChange={handleFilter}>
        <option value="Any">Any</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.name}>
            {genre.name}
          </option>
        ))}
      </select>
      <select name="sort" className={style.select} onChange={handleSort}>
        <option value="A">A - Z</option>
        <option value="D">Z - A</option>
      </select>
      <button onClick={handleClean} className={style.cleanFilters}>
        Clean filters
      </button>
    </div>
  );
};
