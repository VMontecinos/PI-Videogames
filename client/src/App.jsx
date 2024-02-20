import "./App.css";
import { Cards } from "./components/Cards/Cards.jsx";
import { Nav } from "./components/Nav/Nav.jsx";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [games, setGames] = useState([]);

  const onSearch = async (query) => {
    try {
      const response = await axios(
        `http://localhost:3001/gameware/games?search=${query}`
      );

      const { data } = response;

      console.log(data);

      if (data.length > 0) {
        setGames(data.slice(0, 15));
      } else {
        window.alert("¡No hay juegos con ese nombre!");
      }
    } catch (error) {
      window.alert("¡No hay juegos con ese nombre!");
    }
  };

  return (
    <div className="App">
      <Nav onSearch={onSearch} />
      <Cards games={games} />
    </div>
  );
};

export default App;
