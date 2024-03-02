import { Card } from "../Card/Card";
import { useSelector } from "react-redux";
import style from "./Cards.module.css";

export const Cards = (props) => {
  const { lastIndex, firstIndex } = props;
  const uniqueGameIds = new Set();

  const games = useSelector((state) => state.allGames);

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
