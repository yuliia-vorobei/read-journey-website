import { useDispatch } from "react-redux";
import { Logo } from "../Logo/Logo";
import { UserBar } from "../UserBar/UserBar";
import css from "./Header.module.css";
import { logout } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";
import { SideBar } from "../SideBar/SideBar";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { UserNav } from "../UserNav/UserNav";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isComputer = useMediaQuery("(min-width: 1440px)");

  const handleSubmit = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  return (
    <header className={css.header}>
      <div className={css.logoContainer}>
        <Logo />
        {isComputer && <p className={css.logoText}>read journey</p>}
      </div>
      {!isMobile ? (
        <>
          <div className={css.userNav}>
            <UserNav />
          </div>
          <div className={css.userBar}>
            <UserBar />
            <button onClick={handleSubmit} className={css.logoutBtn}>
              Log out
            </button>
          </div>
        </>
      ) : (
        <div className={css.mobMenuContainer}>
          <UserBar />
          <SideBar />
        </div>
      )}
    </header>
  );
};
