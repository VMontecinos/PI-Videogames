import { Card } from "../Card/Card";
import style from "./Cards.module.css";

export const Cards = (props) => {
  return (
    <div id={style.CardContainer}>
      {props.games.map((g) => (
        <Card game={g} key={g.id} onClose={props.onClose} />
      ))}
    </div>
  );
};
