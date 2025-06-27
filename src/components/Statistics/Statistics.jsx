import { useSelector } from "react-redux";
import css from "./Statistics.module.css";
import { selectBooks } from "../../redux/startReadingBook/selectors";

export const Statistics = () => {
  const selectedBooks = useSelector(selectBooks);
  const { progress, totalPages } = selectedBooks;

  const lastReadPage = progress.length > 0 && progress.finishPage;
  console.log(selectedBooks);
  return (
    <section>
      <h4 className={css.title}>Statistics</h4>
      <p className={css.text}>
        Each page, each chapter is a new round of knowledge, a new step towards
        understanding. By rewriting statistics, we create our own reading
        history.
      </p>
      <div>
        <p>{totalPages}</p>
        <p>{lastReadPage}</p>
      </div>
    </section>
  );
};
