import { selectIsLoading } from "../../redux/auth/selectors";
import { Loader } from "../Loader/Loader";
import { OneBookComponent } from "../OneBookComponent/OneBookComponent";
import { selectError } from "../../redux/books/selectors";
import { useSelector } from "react-redux";
import css from "./RecommendedBooks.module.css";

export const RecommendedBooks = () => {
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  return (
    <section className={css.container}>
      <p className={css.title}>Recommended</p>
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      <OneBookComponent />
    </section>
  );
};
