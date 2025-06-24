import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import css from "./MainLayout.module.css";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const MainLayout = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <div className={css.container}>
      {isLoggedIn && <Header />}
      <main>
        <Outlet />
      </main>
    </div>
  );
};
export default MainLayout;
