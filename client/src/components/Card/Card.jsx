import { Link } from "react-router-dom";
import { useState } from "react";
import style from "./Card.module.css";

export const Card = ({ game }) => {
  const [isHovered, setIsHovered] = useState(false);

  const auxImage =
    "https://i.pinimg.com/736x/95/4b/cd/954bcd8a30e8c1222d0b3095ea3e54f5.jpg";
  const gameGenres =
    game && game.genres
      ? game.genres.map((genre) => {
          return genre.name;
        })
      : "";

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  const checkId = () => {
    const id = game.id;
    return isNaN(Number(id));
  };

  return (
    <div
      className={`${style.card} ${isHovered ? style.card_hovered : ""}`}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      <Link id={style.gameLink} to={`/detail/${game.id}`}>
        <div className={style.cardShell}>
          <img
            src={game.background_image ? game.background_image : auxImage}
            alt=""
            className={`${style.card_image} ${
              isHovered ? style.image_hovered : ""
            }`}
          />
        </div>
        <h2
          className={`${style.card_title} ${
            isHovered ? style.card_title_hover : ""
          }`}
        >
          {game.name}
        </h2>
        <div className={style.showGameInfo}>
          <div className={style.card_description}>
            {game.genres && gameGenres.join(", ")}
          </div>
          <br />
        </div>
        {checkId() ? <button className="fa-solid fa-xmark"></button> : ""}
      </Link>
    </div>
  );
};
