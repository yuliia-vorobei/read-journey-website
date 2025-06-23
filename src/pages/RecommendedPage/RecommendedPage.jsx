import css from "./RecommendedPage.module.css";
import { Dashboard } from "../../components/Dashboard/Dashboard .jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Loader } from "../../components/Loader/Loader.jsx";
import { RecommendedBooks } from "../../components/RecommendedBooks/RecommendedBooks.jsx";
import { recommendation } from "../../redux/recommendedBooks/operations.js";
import { selectIsLoading } from "../../redux/recommendedBooks/selectors.js";
import { Filters } from "../../components/Filters/Filters.jsx";
import { WorkoutComponent } from "../../components/WorkoutComponent/WorkoutComponent.jsx";
import { QuoteComponent } from "../../components/QuoteComponent/QuoteComponent.jsx";

const RecommendedPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(recommendation());
  }, [dispatch]);

  return (
    <section className={css.container}>
      <Dashboard>
        <Filters />
        <WorkoutComponent />
        <QuoteComponent />
      </Dashboard>
      <RecommendedBooks />
      {isLoading && <Loader />}
    </section>
  );
};
export default RecommendedPage;
