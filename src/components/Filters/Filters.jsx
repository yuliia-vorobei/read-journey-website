import { useId } from "react";
import css from "./Filters.module.css";
import { ErrorMessage, Field, Formik, Form } from "formik";

export const Filters = () => {
  const initialValues = {
    title: "",
    author: "",
  };

  const handleSubmit = (values, actions) => {
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
                autoComplete="off"
                required
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
