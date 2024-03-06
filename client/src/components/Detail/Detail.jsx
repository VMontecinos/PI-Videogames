import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { removeGame } from "../../redux/actions";
import { useDispatch } from "react-redux";
import axios from "axios";
import style from "./Detail.module.css";

export const Detail = () => {
  const { id } = useParams();
  const [game, setGame] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchGameById() {
      const response = await axios(
        `http://localhost:3001/gameware/games/${id}`
      );

      const { data } = response;

      if (data.id) {
        setGame(data);
      } else {
        window.alert("¡No hay juegos con ese ID!");
      }
    }
    fetchGameById();
  }, []);

  const auxImage =
    "https://www.pngitem.com/pimgs/m/17-175435_console-png-free-image-console-png-transparent-png.png";

  const descriptionRegex =
    /<(p|br |hr |br|hr|h2|h3|strong)\/?>|<\/(p|h2|h3|strong)>|&quot;|&#39;|Español[\s\S]*$/gi;

  const cleanDescription =
    game && game.description
      ? game.description.replaceAll(descriptionRegex, "")
      : "";

  const checkId = () => {
    const id = game.id;
    return isNaN(Number(id));
  };

  const handleDelete = () => {
    dispatch(removeGame(game.id));
    window.alert("Game deleted successfully! 👋");
    navigate("/home");
    window.location.reload();
  };

  return game ? (
    <div>
      <div className={style.detailContainer}>
        <img
          className={style.gameImg}
          src={game.background_image ? game.background_image : auxImage}
          alt=""
        />
        <div className={style.gameInfo} id={game.id}>
          <h2 className={`${style.title} ${style.highlight}`}>{game.name}</h2>
          <p className={style.highlight}>
            Available for:{" "}
            {game && game.platforms ? game.platforms.join(", ") : ""} 🕹️
          </p>
          <p className={style.highlight}>{cleanDescription}</p>
          <p className={style.highlight}>Released: {game.released} 📆</p>
          <p className={style.highlight}>Rating: {game.rating} ⭐ </p>
          <p className={style.highlight}>#{game.id} 🆔</p>
          {checkId() ? (
            <button
              className={`fa-solid fa-xmark ${style.deleteButton}`}
              onClick={handleDelete}
            ></button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className={style.loading}></div>
  );
};
