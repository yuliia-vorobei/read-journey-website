import { useSelector } from "react-redux";
import {
  selectIsLoading,
  selectIsLoggedIn,
  selectIsRefreshing,
} from "../../../redux/auth/selectors";
import { Navigate } from "react-router-dom";
import { Loader } from "../../Loader/Loader";

export const PrivateRoute = ({ component, redirectTo }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoading = useSelector(selectIsLoading);
  const isRefreshing = useSelector(selectIsRefreshing);
  if (isRefreshing || isLoading) {
    return <Loader />;
  }
  return isLoggedIn ? component : <Navigate to={redirectTo} />;
};
