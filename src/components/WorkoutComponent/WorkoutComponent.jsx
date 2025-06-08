import { NavLink } from "react-router-dom";
import css from "./WorkoutComponent.module.css";
import Icon from "../Icon/Icon";

export const WorkoutComponent = () => {
  return (
    <div className={css.container}>
      <p className={css.title}>Start your workout</p>
      <ul className={css.list}>
        <li className={css.item}>
          <div className={css.circle}>1</div>
          <p className={css.text}>
            Create a personal library:{" "}
            <span className={css.span}>
              add the books you intend to read to it.
            </span>
          </p>
        </li>
        <li className={css.item}>
          <div className={css.circle}>2</div>
          <p className={css.text}>
            Create your first workout:{" "}
            <span className={css.span}>
              define a goal, choose a period, start training.
            </span>
          </p>
        </li>
      </ul>
      <NavLink to="/library" className={css.link}>
        My library
        <Icon id="icon-log-in" className={css.icon} />
      </NavLink>
    </div>
  );
};
