import { useId } from "react";
import css from "./AddReading.module.css";
import { ErrorMessage, Field, Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  startReading,
  stopReading,
} from "../../redux/startReadingBook/operations";
import { selectBooks } from "../../redux/startReadingBook/selectors";

const AddingPageSchema = Yup.object().shape({
  page: Yup.number().required("Required").positive(),
});

export const AddReading = () => {
  const dispatch = useDispatch();
  const pageFieldId = useId();

  const selectedBooks = useSelector(selectBooks);
  const _id = selectedBooks?._id || null;
  const progress = selectedBooks?.progress || [];

  console.log(selectedBooks);
  const lastProgress =
    progress.length > 0 ? progress[progress.length - 1] : null;
  console.log(lastProgress);

  const initialValues = {
    id: _id || "",
    page: 0,
  };

  const handleSubmit = async (values, actions) => {
    if (!_id) {
      alert("No book selected");
      actions.setSubmitting(false);
      return;
    }
    if (!lastProgress || lastProgress.status === "inactive") {
      await dispatch(startReading(values));
    } else {
      await dispatch(stopReading(values));
    }
    actions.resetForm();
  };

  const isActive = lastProgress?.status === "active";

  return (
    <div className={css.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={AddingPageSchema}
        onSubmit={handleSubmit}
      >
        <Form autoComplete="off">
          <div className={css.formContainer}>
            <p className={css.filterTitle}>
              {isActive ? "Stop page:" : "Start page:"}
            </p>

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
            {isActive ? "To stop" : "To start"}
          </button>
        </Form>
      </Formik>
    </div>
  );
};
