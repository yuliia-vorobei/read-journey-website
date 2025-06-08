import "./App.css";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsRefreshing } from "./redux/auth/selectors";
import { getCurrent, refreshUser } from "./redux/auth/operations";
import { RestrictedRoute } from "./components/UserMenu/RestrictedRoute/RestrictedRoute";
import { PrivateRoute } from "./components/UserMenu/RestrictedRoute/PrivateRoute/PrivateRoute";
import { Loader } from "./components/Loader/Loader";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const RegistrationPage = lazy(() =>
  import("./pages/RegistrationPage/RegistrationPage")
);
const RecommendedPage = lazy(() =>
  import("./pages/RecommendedPage/RecommendedPage")
);
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

// import LibraryPage from "./pages/LibraryPage/LibraryPage";
// import ReadingPage from "./pages/ReadingPage/ReadingPage";

function App() {
  const isRefreshing = useSelector(selectIsRefreshing);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
    dispatch(getCurrent());
  }, [dispatch]);

  return isRefreshing ? (
   <Loader />
  ) : (
    <div>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/login"
            element={<RestrictedRoute component={<LoginPage />} redirectTo="/"/>}
          />
          <Route
            path="/register"
            element={<RestrictedRoute component={<RegistrationPage />} redirectTo="/"/>}
          />

          <Route
            path="/"
            element={
              <PrivateRoute component={<HomePage />} redirectTo="/login" />
            }
          />
          <Route
            path="/recommended"
            element={
              <PrivateRoute
                component={<RecommendedPage />}
                redirectTo="/login"
              />
            }
          />
          {/* <Route path="/library" element={<LibraryPage />} />
              <Route path="/reading" element={<ReadingPage />} /> */}

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
