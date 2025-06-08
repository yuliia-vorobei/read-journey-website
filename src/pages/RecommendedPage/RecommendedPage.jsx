import css from "./RecommendedPage.module.css";
import { Dashboard } from "../../components/Dashboard/Dashboard .jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { recommendation } from "../../redux/books/operations.js";
import { selectIsLoading } from "../../redux/auth/selectors.js";
import { Loader } from "../../components/Loader/Loader.jsx";
import { RecommendedBooks } from "../../components/RecommendedBooks/RecommendedBooks.jsx";

const RecommendedPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(recommendation());
  }, [dispatch]);

  return (
    <section className={css.container}>
      <Dashboard />
      <RecommendedBooks />
      {isLoading && <Loader />}
    </section>
  );
};
export default RecommendedPage;
