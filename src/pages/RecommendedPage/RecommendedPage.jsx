import css from "./RecommendedPage.module.css";
import { Dashboard } from "../../components/Dashboard/Dashboard .jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Loader } from "../../components/Loader/Loader.jsx";
import { RecommendedBooks } from "../../components/RecommendedBooks/RecommendedBooks.jsx";
import { recommendation } from "../../redux/recommendedBooks/operations.js";
import { selectIsLoading } from "../../redux/recommendedBooks/selectors.js";

const RecommendedPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  console.log("📚 RecommendedPage rendered");

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
