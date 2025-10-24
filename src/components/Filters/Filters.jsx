import { useEffect, useId, useState } from "react";
import css from "./Filters.module.css";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { recommendation } from "../../redux/recommendedBooks/operations";

export const Filters = () => {
  const dispatch = useDispatch();

  const initialValues = {
    title: "",
    author: "",
  };

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(2);

  useEffect(() => {
    const updatePerPage = () => {
      if (window.innerWidth < 768) {
        setPage(1);
        setPerPage(2);
      } else if (window.innerWidth < 1024) {
        setPerPage(8);
      } else {
        setPerPage(10);
      }
    };

    updatePerPage();
    window.addEventListener("resize", updatePerPage);
    return () => window.removeEventListener("resize", updatePerPage);
  }, [perPage]);

  const handleSubmit = async (values, actions) => {
    const { title, author } = values;

    if (title || author) {
      dispatch(recommendation({ title, author, page, perPage }));
    }

    actions.resetForm();
  };

  const bookFieldId = useId();
  const authorFieldId = useId();

  return (
    <div className={css.container}>
      <p className={css.filterTitle}>Filters: </p>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form autoComplete="off">
          <div className={css.formContainer}>
            <label htmlFor={bookFieldId} className={css.fieldContainer}>
              <span className={css.label}>Book title:</span>
              <Field
                type="authorName"
                name="title"
                className={css.field}
                id={bookFieldId}
                placeholder="Enter text"
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
                autoComplete="off"
              />
              <ErrorMessage
                name="author"
                component="span"
                className={css.errorMsg}
              />
            </label>
          </div>
          <button type="submit" className={css.button}>
            To apply
          </button>
        </Form>
      </Formik>
      <div></div>
    </div>
  );
};
