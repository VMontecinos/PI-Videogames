import style from "./Card.module.css";

export const Card = ({ game, onClose }) => {
  return (
    <div className={style.card}>
      <div>
        <img src={game.background_image} alt="" className={style.card_image} />
      </div>
      {console.log(game)}
      <h2 className={style.card_title}>{game.name}</h2>
      <hr />
      <div className={style.card_description}>{game.description}</div>
      <br />
      <div className={style.card_container_buttons}>
        <button className={style.primary_button}>Buy</button>
        <button className={style.secondary_button}>Show</button>
      </div>
    </div>
  );
};
