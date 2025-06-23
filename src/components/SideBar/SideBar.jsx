import clsx from "clsx";
import css from "./SideBar.module.css";
import { slide as Menu } from "react-burger-menu";
import Icon from "../Icon/Icon";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth/operations";
import { useEffect, useState } from "react";

export const SideBar = () => {
  var styles = {
    bmCrossButton: {
      height: "28px",
      width: "28px",
      stroke: "#F9F9F9",
      margin: "34px 40px",
    },
    bmMenuWrap: {
      top: 0,
      right: 0,
      position: "fixed",
      width: "50%",
      height: "100vh",
    },
    bmMenu: {
      background: "#262626",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      paddingBottom: "40px",
    },

    bmItemList: {
      flex: "1",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },

    bmOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.6)",
      zIndex: 1000,
    },
  };
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const activeClass = ({ isActive }) =>
    clsx(css.pageTitle, isActive && css.active);

  const handleSubmit = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  const handleOnOpen = () => {
    setIsOpen(true);
  };
  const handleOnClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <span className={css.iconContainer} onClick={handleOnOpen}>
        <Icon id="icon-mob-menu" className={css.icon} />
      </span>
      <Menu
        styles={styles}
        right
        isOpen={isOpen}
        onStateChange={(state) => setIsOpen(state.isOpen)}
        customCrossIcon={
          <Icon id="icon-close-burger-menu" className={css.closeIcon} />
        }
        customBurgerIcon={false}
      >
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <nav className={css.titleContainer}>
            <NavLink to="/" className={activeClass} onClick={handleOnClose}>
              Home
            </NavLink>
            <NavLink
              to="/library"
              className={activeClass}
              onClick={handleOnClose}
            >
              My library
            </NavLink>
          </nav>

          <button onClick={handleSubmit} className={css.logoutBtn}>
            Log out
          </button>
        </div>
      </Menu>
    </>
  );
};
