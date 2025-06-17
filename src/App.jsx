import "./App.css";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, selectIsRefreshing } from "./redux/auth/selectors";
import { getCurrent, refreshUser } from "./redux/auth/operations";
import { Loader } from "./components/Loader/Loader";
import SharedLayout from "./components/SharedLayout/SharedLayout";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const RegistrationPage = lazy(() =>
  import("./pages/RegistrationPage/RegistrationPage")
);
const RecommendedPage = lazy(() =>
  import("./pages/RecommendedPage/RecommendedPage")
);
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

import LibraryPage from "./pages/LibraryPage/LibraryPage";
import { PrivateRoute } from "./components/UserMenu/PrivateRoute/PrivateRoute";
import { RestrictedRoute } from "./components/UserMenu/RestrictedRoute";
// import ReadingPage from "./pages/ReadingPage/ReadingPage";

function App() {
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser()).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(getCurrent());
      }
    });
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(refreshUser());
  //   // dispatch(getCurrent());
  // }, [dispatch]);

  return isRefreshing && !isLoggedIn ? (
    <Loader />
  ) : (
    <SharedLayout>
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

          {/* {isLoggedIn && (
            <> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/recommended" element={<RecommendedPage />} />
          <Route path="/library" element={<LibraryPage />} />
          {/* </>
          )} */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </SharedLayout>
  );
}

export default App;
