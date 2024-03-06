import { Link, useLocation } from "react-router-dom";
import style from "./Title.module.css";

export const Title = () => {
  const location = useLocation();

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <Link
      id={style.Title}
      to="/home"
      onClick={() => {
        if (location.pathname === "/home") {
          reloadPage();
        }
      }}
    >
      🕹️ GameWare
    </Link>
  );
};
