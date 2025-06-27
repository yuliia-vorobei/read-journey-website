import { useSelector } from "react-redux";
import css from "./UserBar.module.css";
import { Loader } from "../Loader/Loader";

export const UserBar = () => {
  const name = useSelector((state) => state.auth.name);
  if (!name) {
    return;
  }

  const sliceName = (letter) => {
    return letter.slice(0, 1);
  };
  return (
    <div className={css.container}>
      <span className={css.icon}>{sliceName(name)}</span>
      <p className={css.profileName}>{name}</p>
    </div>
  );
};
