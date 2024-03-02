import { Title } from "../Title/title";
import style from "./Welcome.module.css";

export const Welcome = () => {
  return (
    <div className={style.welcomeContainer}>
      <h1>Welcome to</h1>
      <Title />
    </div>
  );
};
