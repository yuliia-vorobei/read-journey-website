import clsx from "clsx";
import css from "./UserNav.module.css";
import { NavLink } from "react-router-dom";

export const UserNav = () => {
  const activeClass = ({ isActive }) =>
    clsx(css.pageTitle, isActive && css.active);

  return (
    <nav className={css.titleContainer}>
      <NavLink to="/recommended" className={activeClass}>
        Home
      </NavLink>
      <NavLink to="/library" className={activeClass}>
        My library
      </NavLink>
    </nav>
  );
};
