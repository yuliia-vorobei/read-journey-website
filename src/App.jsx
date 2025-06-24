import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, selectIsRefreshing } from "./redux/auth/selectors";
import { getCurrent, refreshUser } from "./redux/auth/operations";
import { Loader } from "./components/Loader/Loader";
import MainLayout from "./components/MainLayout/MainLayout";

const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const RegistrationPage = lazy(() =>
  import("./pages/RegistrationPage/RegistrationPage")
);
const RecommendedPage = lazy(() =>
  import("./pages/RecommendedPage/RecommendedPage")
);
const ReadingPage = lazy(() => import("./pages/ReadingPage/ReadingPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

import LibraryPage from "./pages/LibraryPage/LibraryPage";
import { PrivateRoute } from "./components/UserMenu/PrivateRoute/PrivateRoute";
import { RestrictedRoute } from "./components/UserMenu/RestrictedRoute";

function App() {
  const [authChecked, setAuthChecked] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser())
      .then(() => {
        dispatch(getCurrent());
      })
      .finally(() => {
        setAuthChecked(true);
      });
  }, [dispatch]);

  if (!authChecked) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route
          path="/login"
          element={
            <RestrictedRoute
              component={<LoginPage />}
              redirectTo="/recommended"
            />
          }
        />
        <Route
          path="/register"
          element={
            <RestrictedRoute
              component={<RegistrationPage />}
              redirectTo="/recommended"
            />
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute component={<MainLayout />} redirectTo="/login" />
          }
        >
          <Route index element={<Navigate to="/recommended" />} />
          <Route path="recommended" element={<RecommendedPage />} />
          <Route path="library" element={<LibraryPage />} />
          <Route path="reading" element={<ReadingPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
