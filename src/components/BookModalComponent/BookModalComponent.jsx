import css from "./BookModalComponent.module.css";
import { Modal } from "../Modal/Modal";

export const BookModalComponent = ({ book, onClose, submitButton }) => {
  return (
    <Modal handleClose={onClose} submitButton={submitButton}>
      <div className={css.modalContainer}>
        {book.imageUrl === null ? (
          <img
            src="../../../public/book_placeholder.png"
            width="137"
            height="208"
            className={css.imageModal}
          />
        ) : (
          <img
            src={book.imageUrl}
            width="137"
            height="208"
            className={css.imageModal}
          />
        )}
        <p className={css.titleModal}>{book.title}</p>
        <p className={css.authorModal}>{book.author}</p>
        <p className={css.pages}>{book.totalPages} pages</p>
      </div>
    </Modal>
  );
};
