import { useId } from "react";
import css from "./AddReading.module.css";
import { ErrorMessage, Field, Formik, Form } from "formik";
import * as Yup from "yup";

const AddingPageSchema = Yup.object().shape({
  page: Yup.number().required("Required").positive(),
});
export const AddReading = () => {
  const initialValues = {
    page: 0,
  };

  const handleSubmit = (values, actions) => {
    actions.resetForm();
  };

  const pageFieldId = useId();

  return (
    <div className={css.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={AddingPageSchema}
        onSubmit={handleSubmit}
      >
        <Form autoComplete="off">
          <div className={css.formContainer}>
            <p className={css.filterTitle}>Start page: </p>

            <label htmlFor={pageFieldId} className={css.fieldContainer}>
              <span className={css.label}>Page number:</span>
              <Field
                type="number"
                name="page"
                className={css.field}
                id={pageFieldId}
                placeholder="0"
                required
              />
              <ErrorMessage
                name="page"
                component="span"
                className={css.errorMsg}
              />
            </label>
          </div>
          <button type="submit" className={css.button}>
            To start
          </button>
        </Form>
      </Formik>

      <div className={css.progressContainer}>
        <h4 className={css.titleProgress}>Progress</h4>
        <p className={css.quoteProgress}>
          Here you will see when and how much you read. To record, click on the
          red button above.
        </p>
        <span className={css.iconProgress}>
          <img src="../../../public/progress-emoji.png" className={css.icon} />
        </span>
      </div>
    </div>
  );
};
