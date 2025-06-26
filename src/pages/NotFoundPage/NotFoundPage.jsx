import css from "./NotFoundPage.module.css";
import { Link, Navigate } from "react-router-dom";
import { PiSmileySadDuotone } from "react-icons/pi";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const NotFoundPage = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <div className={css.container}>
      <PiSmileySadDuotone />
      <h3 className={css.title}>Sorry this page does not exist!</h3>
      {isLoggedIn ? <Navigate to="/" /> : <Navigate to="/login" />}
    </div>
  );
};
export default NotFoundPage;
