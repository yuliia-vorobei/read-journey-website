import { useDispatch, useSelector } from "react-redux";
import css from "./MyBook.module.css";
import { useEffect } from "react";
import { Loader } from "../Loader/Loader";
import { getBookInfo } from "../../redux/startReadingBook/operations";
import Icon from "../Icon/Icon";
import { selectBooks } from "../../redux/startReadingBook/selectors";

export const MyBook = () => {
  const dispatch = useDispatch();
  const selectedBook = useSelector(selectBooks);
  useEffect(() => {
    if (selectedBook && selectedBook._id) {
      dispatch(getBookInfo(selectedBook._id));
    }
  }, [dispatch]);
  if (!selectedBook) {
    return (
      <div className={css.defaultcontainer}>
        <img
          src="../../../public/book-shelf.png"
          width="137"
          height="208"
          className={css.imageBookShelf}
        />
        <p className={css.message}>Select a book to start reading!</p>
      </div>
    );
  }

  const { progress, imageUrl, title, author } = selectedBook;
  const lastProgress =
    progress.length > 0 ? progress[progress.length - 1] : null;

  if (!selectedBook) {
    return <Loader />;
  }

  const isActive = lastProgress?.status === "active";

  return (
    <div className={css.container}>
      <h4 className={css.title}>My reading</h4>
      <div className={css.contentContainer}>
        {imageUrl === null ? (
          <img
            src="../../../public/book_placeholder.png"
            width="137"
            height="208"
            className={css.image}
          />
        ) : (
          <img src={imageUrl} className={css.image} />
        )}
        <p className={css.bookTitle}>{title}</p>
        <p className={css.bookAuthor}>{author}</p>
      </div>
      {isActive ? (
        <Icon id="icon-pause" className={css.pauseIcon} />
      ) : (
        <Icon id="icon-start-reading" className={css.startIcon} />
      )}
    </div>
  );
};
