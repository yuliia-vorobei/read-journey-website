import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../../../redux/auth/selectors";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ component, redirectTo }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn ? component : <Navigate to={redirectTo} />;
};
