import { OneBookComponent } from "../OneBookComponent/OneBookComponent";
import { useSelector } from "react-redux";
import css from "./RecommendedBooks.module.css";
import { selectError } from "../../redux/recommendedBooks/selectors";
import { Loader } from "../Loader/Loader";

export const RecommendedBooks = () => {
  const error = useSelector(selectError);

  return (
    <section className={css.container}>
      <div className={css.titleContainer}>
        <h2 className={css.title}>Recommended</h2>
      </div>
      {error && <p>{error}</p>}
      <OneBookComponent />
    </section>
  );
};
