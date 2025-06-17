import { useEffect, useId, useState } from "react";
import css from "./DashboardLibrary.module.css";
import { ErrorMessage, Field, Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Icon from "../Icon/Icon";
import { recommendation } from "../../redux/recommendedBooks/operations";
import { addBook } from "../../redux/ownBooks/operations";
import { selectItems } from "../../redux/recommendedBooks/selectors";
import { Modal } from "../Modal/Modal";

const AddingBookSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  author: Yup.string().required("Required"),
  totalPages: Yup.number().required("Required").positive(),
});

const initialValues = {
  title: "",
  author: "",
  totalPages: "",
};

export const DashboardLibrary = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(recommendation());
  }, [dispatch]);

  const handleSubmit = (values, actions) => {
    console.log(values);
    dispatch(addBook(values));
    actions.resetForm();
    openModal();
  };

  const bookFieldId = useId();
  const authorFieldId = useId();
  const pagesFieldId = useId();

  const items = useSelector(selectItems);
  if (!items || !items.results) {
    return <Loader />;
  }

  return (
    <div className={css.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={AddingBookSchema}
      >
        <Form>
          <div className={css.formContainer}>
            <p className={css.libraryTitle}>Create your library: </p>

            <label htmlFor={bookFieldId} className={css.fieldContainer}>
              <span className={css.label}>Book title:</span>
              <Field
                type="text"
                name="title"
                className={css.field}
                id={bookFieldId}
                placeholder="Enter text"
                required
              />
              <ErrorMessage
                name="title"
                component="span"
                className={css.errorMsg}
              />
            </label>

            <label htmlFor={authorFieldId} className={css.fieldContainer}>
              <span className={css.label}>The author:</span>
              <Field
                type="text"
                name="author"
                className={css.field}
                id={authorFieldId}
                placeholder="Enter text"
                required
              />
              <ErrorMessage
                name="author"
                component="span"
                className={css.errorMsg}
              />
            </label>

            <label htmlFor={pagesFieldId} className={css.fieldContainer}>
              <span className={css.label}>Number of pages:</span>
              <Field
                type="number"
                name="totalPages"
                className={css.field}
                id={pagesFieldId}
                placeholder="0"
                required
              />
              <ErrorMessage
                name="totalPages"
                component="span"
                className={css.errorMsg}
              />
            </label>
          </div>
          <button type="submit" className={css.button}>
            Add book
          </button>
        </Form>
      </Formik>
      {isOpenModal && (
        <Modal handleClose={closeModal}>
          <img src="../../../public/thumb-up.png" />
          <h4>Good job</h4>
          <p>
            Your book is now in <span>the library!</span> The joy knows no
            bounds and now you can start your training
          </p>
        </Modal>
      )}
      <div className={css.recommendedContainer}>
        <h3 className={css.recommendedTitle}>Recommended books</h3>
        <ul className={css.list}>
          {items.results.slice(0, 3).map(({ _id, imageUrl, title, author }) => {
            return (
              <li key={_id} className={css.item}>
                <img
                  src={imageUrl}
                  width="137"
                  height="208"
                  className={css.image}
                />
                <p className={css.bookTitle}>{title}</p>
                <p className={css.bookAuthor}>{author}</p>
              </li>
            );
          })}
        </ul>
        <div className={css.buttonContainer}>
          <NavLink to="/" className={css.homeLink}>
            Home
          </NavLink>
          <NavLink to="/recommended">
            <Icon id="icon-log-in" className={css.icon} />
          </NavLink>
        </div>
      </div>
    </div>
  );
};
