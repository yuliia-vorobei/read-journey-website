import { useSelector } from "react-redux";
import css from "./UserBar.module.css";
import { selectName } from "../../redux/auth/selectors";

export const UserBar = () => {
  const name = useSelector(selectName);

  return <p className={css.profileIcon}>{name}</p>;
};
