import { useEffect, useId, useState } from "react";
import css from "./AddBook.module.css";
import { ErrorMessage, Field, Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { recommendation } from "../../redux/recommendedBooks/operations";
import { addBook } from "../../redux/ownBooks/operations";
import { AddedBookModal } from "../AddedBookModal/AddedBookModal";

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

export const AddBook = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const openModal = () => {
    setIsOpenModal(true);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(recommendation());
  }, [dispatch]);

  const handleSubmit = async (values, actions) => {
    await dispatch(addBook(values));
    actions.resetForm();
    openModal();
  };

  const bookFieldId = useId();
  const authorFieldId = useId();
  const pagesFieldId = useId();

  return (
    <>
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
      {isOpenModal && <AddedBookModal onClose={() => setIsOpenModal(false)} />}
    </>
  );
};
