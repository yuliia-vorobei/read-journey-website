import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import css from "./SharedLayout.module.css";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const SharedLayout = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <div className={css.container}>
      {isLoggedIn && <Header />}
      {children}
    </div>
  );
};
export default SharedLayout;
