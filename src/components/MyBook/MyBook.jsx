import { useDispatch, useSelector } from "react-redux";
import css from "./MyBook.module.css";
import { useEffect } from "react";
import { Loader } from "../Loader/Loader";
import { getBookInfo } from "../../redux/startReadingBook/operations";
import Icon from "../Icon/Icon";

export const MyBook = () => {
  const dispatch = useDispatch();
  const selectedBook = useSelector(
    (state) => state.startReadingBook.selectedBook
  );

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
      <Icon id="icon-start-reading" className={css.startIcon} />
    </div>
  );
};
