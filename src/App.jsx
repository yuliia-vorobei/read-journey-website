import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { selectIsRefreshing } from "./redux/auth/selectors";

function App() {
  const dispatch = useDispatch();
  const [initialized, setInitialized] = useState(false);

  const isRefreshing = useSelector(selectIsRefreshing);
  useEffect(() => {
    const fetchUserData = async () => {
      const result = await dispatch(refreshUser());
      if (refreshUser.fulfilled.match(result)) {
        await dispatch(getCurrent());
      }
      setInitialized(true);
    };
    fetchUserData();
  }, [dispatch]);

  if (!initialized) {
    return <Loader />;
  }

  return isRefreshing ? (
    <Loader />
  ) : (
    <Suspense fallback={null}>
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
          <Route index element={<Navigate to="recommended" />} />
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
