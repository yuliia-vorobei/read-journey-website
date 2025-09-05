import { Modal } from "../Modal/Modal";
import css from "./NotFoundModal.module.css";

export const NotFoundModal = ({ onClose }) => {
  return (
    <Modal handleClose={onClose}>
      <div className={css.modalContainer}>
        <p className={css.modalQuote}>Nothing was found, try again!</p>
      </div>
    </Modal>
  );
};
