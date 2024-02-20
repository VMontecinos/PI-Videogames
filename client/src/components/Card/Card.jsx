import { useState } from "react";
import style from "./Card.module.css";

export const Card = ({ game }) => {
  const [isHovered, setIsHovered] = useState(false);

  const auxImage =
    "https://www.pngitem.com/pimgs/m/17-175435_console-png-free-image-console-png-transparent-png.png";

  const gameGenres = game.genres.map((genre) => {
    return genre.name;
  });

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`${style.card} ${isHovered ? style.card_hovered : ""}`}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      <div>
        <img
          src={game.background_image ? game.background_image : auxImage}
          alt=""
          className={style.card_image}
        />
      </div>
      <h2
        className={`${style.card_title} ${
          isHovered ? style.card_title_hover : ""
        }`}
      >
        {game.name}
      </h2>
      {isHovered && (
        <div className={style.showGameInfo}>
          <hr />
          <div className={style.card_description}>{gameGenres.join(", ")}</div>
          <br />
          <div className={style.card_container_buttons}>
            <button className={style.primary_button}>Buy</button>
            <button className={style.secondary_button}>Show</button>
          </div>
        </div>
      )}
    </div>
  );
};
