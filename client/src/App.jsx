import "./App.css";
import { Cards } from "./components/Cards/Cards.jsx";
import { Title } from "./components/Title/title.jsx";
import { Nav } from "./components/Nav/Nav.jsx";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [games, setGames] = useState([]);

  const onSearch = async (id) => {
    try {
      const response = await axios(
        `http://localhost:3001/gameware/games/${id}`
      );
      const { data } = response;
      if (data.name) {
        setGames((prevState) => [...prevState, data]);
      } else {
        window.alert("¡No hay juegos con este ID!");
      }
    } catch (error) {
      window.alert("¡No hay juegos con este ID!");
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
