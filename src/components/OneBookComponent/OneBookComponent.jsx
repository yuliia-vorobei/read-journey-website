import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../Loader/Loader";
import css from "./OneBookComponent.module.css";
import { useState } from "react";
import { BookModalComponent } from "../BookModalComponent/BookModalComponent";
import { addRecommendedBook } from "../../redux/ownBooks/operations";
import { AddedBookModal } from "../AddedBookModal/AddedBookModal";
import { selectError, selectResults } from "../../redux/ownBooks/selectors";
import { handleError } from "../../hooks/handleError";
import { selectItems } from "../../redux/recommendedBooks/selectors";

export const OneBookComponent = () => {
  const results = useSelector(selectItems);
  const ownBookResults = useSelector(selectResults);
  const titles = ownBookResults.map((t) => t.title);
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  const [selectedBook, setSelectedBook] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const addToLibrary = async (_id) => {
    const existedBook = await dispatch(addRecommendedBook(_id));
    if (!titles.includes(existedBook.payload.title)) {
      setIsOpenModal(true);
    } else {
      setIsOpenModal(false);
    }
    // if (addRecommendedBook.fulfilled.match(existedBook)) {
    //   setIsOpenModal(true);
    // }
    if (error) {
      handleError(409);
      setIsOpenModal(false);
    }
    setSelectedBook(null);
  };

  if (!results) {
    return <Loader />;
  }

  return (
    <ul className={css.list}>
      {results.map((book) => {
        const { _id, imageUrl, title, author } = book;
        return (
          <li key={_id} className={css.item}>
            <img
              src={imageUrl}
              width="137"
              height="208"
              className={css.image}
              onClick={() => setSelectedBook(book)}
            />
            <p className={css.title}>{title}</p>
            <p className={css.author}>{author}</p>
          </li>
        );
      })}
      {selectedBook && (
        <BookModalComponent
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          submitButton={
            <button
              type="button"
              className={css.btn}
              onClick={() => addToLibrary(selectedBook._id)}
            >
              Add to library
            </button>
          }
        />
      )}
      {isOpenModal && <AddedBookModal onClose={() => setIsOpenModal(false)} />}
    </ul>
  );
};
