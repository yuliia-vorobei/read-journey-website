import { useDispatch } from "react-redux";
import { Logo } from "../Logo/Logo";
import { UserBar } from "../UserBar/UserBar";
import { UserNav } from "../UserNav/UserNav";
import css from "./Header.module.css";
import { logout } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  return (
    <header className={css.header}>
      <Logo />
      {/* <UserNav /> */}
      <UserBar />
      <button onClick={handleSubmit} className={css.logoutBtn}>
        Log out
      </button>
    </header>
  );
};
