import { Modal } from "../Modal/Modal";
import css from "./AddedBookModal.module.css";

export const AddedBookModal = ({ onClose }) => {
  return (
    <Modal handleClose={onClose}>
      <div className={css.modalContainer}>
        <img src="/thumb-up.png" className={css.thumbEmoji} />
        <h4 className={css.modalTitle}>Good job</h4>
        <p className={css.modalQuote}>
          Your book is now in{" "}
          <span className={css.spanModal}>the library!</span> The joy knows no
          bounds and now you can start your training
        </p>
      </div>
    </Modal>
  );
};
