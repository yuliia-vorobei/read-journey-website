import { useSelector } from "react-redux";
import { Loader } from "../Loader/Loader";
import css from "./OneBookComponent.module.css";
import { useState } from "react";
import { Modal } from "../Modal/Modal";
import { selectItems } from "../../redux/recommendedBooks/selectors";

export const OneBookComponent = () => {
  const items = useSelector(selectItems);
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  function openModal(book) {
    setShowModal(true);
    setSelectedBook(book);
  }
  const handleClose = () => {
    setShowModal(false);
    setSelectedBook(null);
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
              onClick={() => openModal(book)}
            />
            <p className={css.title}>{title}</p>
            <p className={css.author}>{author}</p>
          </li>
        );
      })}
      {showModal && selectedBook && (
        <Modal handleClose={handleClose}>
          <img
            src={selectedBook.imageUrl}
            width="137"
            height="208"
            className={css.imageModal}
          />
          <p className={css.titleModal}>{selectedBook.title}</p>
          <p className={css.authorModal}>{selectedBook.author}</p>
          <p className={css.pages}>{selectedBook.totalPages} pages</p>
          <button type="button" className={css.btn}>
            Add to library
          </button>
        </Modal>
      )}
    </ul>
  );
};
