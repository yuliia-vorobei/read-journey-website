import { selectIsLoading } from "../../redux/auth/selectors";
import { Loader } from "../Loader/Loader";
import { OneBookComponent } from "../OneBookComponent/OneBookComponent";
import { useSelector } from "react-redux";
import css from "./RecommendedBooks.module.css";
import { selectError } from "../../redux/recommendedBooks/selectors";

export const RecommendedBooks = () => {
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  return (
    <section className={css.container}>
      <h2 className={css.title}>Recommended</h2>
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      <OneBookComponent />
    </section>
  );
};
