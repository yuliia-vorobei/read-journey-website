import { useDispatch, useSelector } from "react-redux";
import css from "./MyBook.module.css";
import { useEffect } from "react";
import { Loader } from "../Loader/Loader";
import { getBookInfo } from "../../redux/startReadingBook/operations";
import Icon from "../Icon/Icon";
import {
  selectBooks,
  selectStartReadingIcon,
} from "../../redux/startReadingBook/selectors";

export const MyBook = () => {
  const dispatch = useDispatch();
  const selectedBook = useSelector(selectBooks);
  const selectIcon = useSelector(selectStartReadingIcon);

  useEffect(() => {
    if (selectedBook && selectedBook._id) {
      dispatch(getBookInfo(selectedBook._id));
    }
  }, [dispatch]);

  if (!selectedBook) {
    return <Loader />;
  }

  return (
    <div className={css.container}>
      <h4 className={css.title}>My reading</h4>
      <div className={css.contentContainer}>
        {selectedBook.imageUrl === null ? (
          <img
            src="../../../public/book_placeholder.png"
            width="137"
            height="208"
            className={css.image}
          />
        ) : (
          <img src={selectedBook.imageUrl} className={css.image} />
        )}
        <p className={css.bookTitle}>{selectedBook.title}</p>
        <p className={css.bookAuthor}>{selectedBook.author}</p>
      </div>
      {!selectIcon ? (
        <Icon id="icon-pause" className={css.pauseIcon} />
      ) : (
        <Icon id="icon-start-reading" className={css.startIcon} />
      )}
    </div>
  );
};
