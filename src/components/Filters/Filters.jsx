import { useEffect, useId, useState } from "react";
import css from "./Filters.module.css";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { recommendation } from "../../redux/recommendedBooks/operations";
import { NotFoundModal } from "../NotFoundModal/NotFoundModal";
import { selectItems } from "../../redux/recommendedBooks/selectors";

export const Filters = () => {
  const dispatch = useDispatch();
  const recommended = useSelector(selectItems);

  const initialValues = {
    title: "",
    author: "",
  };

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(8);
  useEffect(() => {
    setPage(1);
    setPerPage(8);
  }, [perPage]);

  const handleSubmit = async (values, actions) => {
    const { title, author } = values;

    dispatch(recommendation({ title, author, page, perPage }));

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
    </div>
  );
};
