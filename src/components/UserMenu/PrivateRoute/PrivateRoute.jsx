import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectIsRefreshing,
} from "../../../redux/auth/selectors";
import { Navigate } from "react-router-dom";
import { Loader } from "../../Loader/Loader";

export const PrivateRoute = ({ component, redirectTo }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);

  if (isRefreshing) {
    return <Loader />;
  }
  return isLoggedIn ? component : <Navigate to={redirectTo} />;
};
