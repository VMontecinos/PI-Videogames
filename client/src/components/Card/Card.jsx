import { useState } from "react";
import style from "./Card.module.css";

export const Card = ({ game, onClose }) => {
  const descriptionRegex =
    /<(p|br |hr |br|hr|h2|h3)\/?>|<\/(p|h2|h3)>|&quot|&#39;/gi;

  const cleanDescription = game.description.replaceAll(descriptionRegex, "");

  const [isHovered, setIsHovered] = useState(false);

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
        <img src={game.background_image} alt="" className={style.card_image} />
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
          <div className={style.card_description}>{cleanDescription}</div>
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
