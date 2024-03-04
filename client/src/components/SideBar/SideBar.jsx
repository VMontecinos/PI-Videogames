import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { filterGames, sortGames } from "../../redux/actions";
import style from "./SideBar.module.css";

export const SideBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const genres = useSelector((state) => state.allGenres);

  const reloadPage = () => {
    window.location.reload();
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
        {genres.map((genre) => (
          <option value={genre.name}>{genre}</option>
        ))}
        {/* <option value="Any">Any</option>
        <option value="Action">Action</option>
        <option value="Indie">Indie</option>
        <option value="Adventure">Adventure</option>
        <option value="RPG">RPG</option>
        <option value="Strategy">Strategy</option>
        <option value="Shooter">Shooter</option>
        <option value="Casual">Casual</option>
        <option value="Simulation">Simulation</option>
        <option value="Puzzle">Puzzle</option>
        <option value="Arcade">Arcade</option>
        <option value="Platformer">Platformer</option>
        <option value="Racing">Racing</option>
        <option value="Massively Multiplayer">MMO</option>
        <option value="Sports">Sports</option>
        <option value="Fighting">Fighting</option>
        <option value="Family">Family</option>
        <option value="Board Games">Board Games</option>
        <option value="Educational">Educational</option>
        <option value="Card">Card Games</option> */}
      </select>
      <select name="sort" className={style.select} onChange={handleSort}>
        <option value="A">A - Z</option>
        <option value="D">Z - A</option>
      </select>
    </div>
  );
};
