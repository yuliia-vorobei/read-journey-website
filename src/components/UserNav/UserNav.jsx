import clsx from "clsx";
import css from "./UserNav.module.css";
import { slide as Menu } from "react-burger-menu";
import Icon from "../Icon/Icon";
import { NavLink } from "react-router-dom";

export const UserNav = () => {
  const activeClass = ({ isActive }) =>
    clsx(css.pageTitle, isActive && css.active);

  const handleOnOpen = () => {};

  return (
    <>
      <Menu
        right
        onOpen={handleOnOpen}
        width={200}
        customCrossIcon={<Icon id="icon-close-burger-menu" />}
        customBurgerIcon={<Icon id="icon-mob-menu" className={css.icon} />}
      >
        <nav className={css.titleContainer}>
          <NavLink to="/" className={activeClass}>
            Home
          </NavLink>
          <NavLink to="/library" className={activeClass}>
            My library
          </NavLink>
        </nav>
      </Menu>
      {/* <span className={css.iconContainer}>
        <Icon id="icon-mob-menu" className={css.icon} />
      </span> */}
    </>
  );
};
