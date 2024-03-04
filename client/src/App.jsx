import "./App.css";
import { Cards } from "./components/Cards/Cards.jsx";
import { Nav } from "./components/Nav/Nav.jsx";
import { Welcome } from "./components/Welcome/Welcome.jsx";
import { Detail } from "./components/Detail/Detail.jsx";
import { SideBar } from "./components/SideBar/SideBar.jsx";
import { CreateForm } from "./components/CreateForm/CreateForm.jsx";
import { Pagination } from "./components/Pagination/Pagination.jsx";
import { getGenres, addAllGames } from "./redux/actions.js";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

const App = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  let [currentPage, setCurrentPage] = useState(1);
  const allGames = [];
  let gameCount = 0;
  const pageSize = 15;
  const gameLimit = 100;

  const lastIndex = currentPage * pageSize;
  const firstIndex = lastIndex - pageSize;

  const dispatch = useDispatch();

  const location = useLocation();

  const onSearch = async (query) => {
    try {
      const response = await axios(
        `http://localhost:3001/gameware/games?search=${query}`
      );

      const { data } = response;

      if (data.length > 0) {
        allGames.push(...data);
        setGames(allGames);
        dispatch(addAllGames(allGames));
      } else {
        window.alert("¡No hay juegos con ese nombre!");
      }
    } catch (error) {
      window.alert("¡No hay juegos con ese nombre!");
    }
  };

  useEffect(() => {
    async function fetchGames() {
      try {
        const response = await axios(
          `http://localhost:3001/gameware/games?page=${currentPage}`
        );

        const { data } = response;

        if (data.length > 0) {
          gameCount += data.length;
          allGames.push(...data);

          if (data && gameCount < gameLimit) {
            setCurrentPage(currentPage++);
            fetchGames();
          } else {
            setLoading(false);
            setCurrentPage(1);
            setGames(allGames);
            dispatch(addAllGames(allGames));
          }
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }

    fetchGames();
  }, []);

  return (
    <div className="App">
      <Nav onSearch={onSearch} />
      <div>
        {loading && location.pathname === "/home" ? (
          <div className="loading"></div>
        ) : (
          ""
        )}
        {location.pathname !== "/" && <SideBar />}
        <Routes>
          <Route path="/" element={<Welcome />}></Route>
          <Route
            path="/home"
            element={
              <Cards
                lastIndex={lastIndex}
                firstIndex={firstIndex}
                games={games}
              />
            }
          ></Route>
          <Route path="/create" element={<CreateForm />}></Route>
          <Route path="/detail/:id" element={<Detail />}></Route>
        </Routes>
        {location.pathname === "/home" ? (
          <Pagination
            pageSize={pageSize}
            totalGames={games.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          ></Pagination>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default App;
