import { useId } from "react";
import css from "./AddReading.module.css";
import { ErrorMessage, Field, Formik, Form } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import {
  startReading,
  stopReading,
} from "../../redux/startReadingBook/operations";
import { selectBooks } from "../../redux/startReadingBook/selectors";

const AddingPageSchema = Yup.object().shape({
  page: Yup.number().required("Required").positive("Must be positive"),
});

export const AddReading = () => {
  const dispatch = useDispatch();
  const pageFieldId = useId();

  const selectedBooks = useSelector(selectBooks);
  const _id = selectedBooks?._id || null;
  const progress = selectedBooks?.progress || [];

  const lastProgress =
    progress.length > 0 ? progress[progress.length - 1] : null;

  const initialValues = {
    id: _id || "",
    page: "",
  };

  const handleSubmit = async (values, actions) => {
    if (!_id) {
      swal({
        title: "No book selected",
        button: "Close",
        className: "my-swal-modal",
      });
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
                placeholder="1"
                className={css.field}
                id={pageFieldId}
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
