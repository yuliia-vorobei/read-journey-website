import { useSelector } from "react-redux";
import { selectItems } from "../../redux/books/selectors";
import { Loader } from "../Loader/Loader";
import css from "./OneBookComponent.module.css";

export const OneBookComponent = () => {
  const items = useSelector(selectItems);
  console.log(items.results);

  if (!items || !items.results) {
    return <Loader />;
  }

  return (
    <ul className={css.list}>
      {items.results.map(({ _id, imageUrl, title, author }) => {
        return (
          <li key={_id} className={css.item}>
            <img
              src={imageUrl}
              width="137"
              height="208"
              className={css.image}
            />
            <p className={css.title}>{title}</p>
            <p className={css.author}>{author}</p>
          </li>
        );
      })}
    </ul>
  );
};
