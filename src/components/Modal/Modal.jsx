import { useEffect } from "react";
import Icon from "../Icon/Icon";
import css from "./Modal.module.css";

export const Modal = ({ handleClose, children }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClose]);

  const handleBackDropClick = (event) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };
  return (
    <div className={css.backdrop} onClick={handleBackDropClick}>
      <div className={css.modal}>
        <span className={css.btn} onClick={() => handleClose()}>
          <Icon id="icon-close-burger-menu" className={css.icon} />
        </span>
        <div className={css.content}>{children}</div>
      </div>
    </div>
  );
};
