import { Card } from "../Card/Card";
import style from "./Cards.module.css";

export const Cards = (props) => {
  const { lastIndex, firstIndex, games } = props;
  const uniqueGameIds = new Set();

  return (
    <div>
      <div id={style.CardContainer}>
        {games
          .filter((g) => {
            if (uniqueGameIds.has(g.id)) {
              return false;
            } else {
              uniqueGameIds.add(g.id);
              return true;
            }
          })
          .map((g) => <Card game={g} key={g.id} onClose={props.onClose} />)
          .slice(firstIndex, lastIndex)}
      </div>
    </div>
  );
};
