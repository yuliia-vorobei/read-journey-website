import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../Loader/Loader";
import css from "./OneBookComponent.module.css";
import { useState } from "react";
import { selectItems } from "../../redux/recommendedBooks/selectors";
import { BookModalComponent } from "../BookModalComponent/BookModalComponent";
import { addRecommendedBook } from "../../redux/ownBooks/operations";
import { AddedBookModal } from "../AddedBookModal/AddedBookModal";

export const OneBookComponent = () => {
  const items = useSelector(selectItems);
  const dispatch = useDispatch();

  const [selectedBook, setSelectedBook] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const addToLibrary = (_id) => {
    dispatch(addRecommendedBook(_id));
    setSelectedBook(null);
    setIsOpenModal(true);
  };

  if (!items || !items.results) {
    return <Loader />;
  }

  return (
    <ul className={css.list}>
      {items.results.map((book) => {
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
