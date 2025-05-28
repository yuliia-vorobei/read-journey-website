import css from "./HomePage.module.css";
import { useSelector } from "react-redux";
import { selectName } from "../../redux/auth/selectors";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { Logo } from "../../components/Logo/Logo";
import Icon from "../../components/Icon/Icon";

const HomePage = () => {
  const name = useSelector(selectName);
  const activeClass = ({ isActive }) =>
    clsx(css.pageTitle, isActive && css.active);

  return (
    <header className={css.header}>
      <Logo />
      <p className={css.profileIcon}>{name}</p>
      <div className={css.titleContainer}>
        <NavLink to="/" className={activeClass}>
          Home
        </NavLink>
        <NavLink to="/library" className={activeClass}>
          My library
        </NavLink>
        <h2></h2>
      </div>
      <span className={css.iconContainer}>
        <Icon id="icon-mob-menu" className={css.icon} />
      </span>
      <button className={css.logoutBtn}>Log out</button>
    </header>
  );
};

export default HomePage;
