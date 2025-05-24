import { Form, Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { useId } from "react";
import css from "./RegistrationForm.module.css";
import { useNavigate } from "react-router-dom";

const RegistrationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  email: Yup.string()
    .email("Must be a valid email!")
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
    .required("Required"),
  password: Yup.string()
    .min(7, "Password too short!")
    .max(25, "Password too long!")
    .required("Required"),
});

const initialValues = {
  name: "",
  email: "",
  password: "",
};

export const RegistrationForm = () => {
  const navigate = useNavigate();
  const nameFieldId = useId();
  const emailFieldId = useId();
  const passwordFieldId = useId();

  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={RegistrationSchema}
    >
      <Form>
        <div className={css.formContainer}>
          <label htmlFor={nameFieldId} className={css.fieldContainer}>
            <span className={css.label}>Name:</span>
            <Field
              type="text"
              name="name"
              className={css.field}
              id={nameFieldId}
              placeholder="Yuliia Vorobei"
            />
            <ErrorMessage
              name="name"
              component="span"
              className={css.errorMsg}
            />
          </label>

          <label htmlFor={emailFieldId} className={css.fieldContainer}>
            <span className={css.label}>Mail:</span>
            <Field
              type="email"
              name="email"
              className={css.field}
              id={emailFieldId}
              placeholder="Your@email.com"
            />
            <ErrorMessage
              name="email"
              component="span"
              className={css.errorMsg}
            />
          </label>

          <label htmlFor={passwordFieldId} className={css.fieldContainer}>
            <span className={css.label}>Password:</span>
            <Field
              type="password"
              name="password"
              className={css.field}
              id={passwordFieldId}
              placeholder="Yourpasswordhere"
            />
            <ErrorMessage
              name="password"
              component="span"
              className={css.errorMsg}
            />
          </label>
        </div>
        <div className={css.buttonContainer}>
          <button type="submit" className={css.button}>
            Registration
          </button>
          <button className={css.accountBtn} onClick={() => navigate("/login")}>
            Already have an account?
          </button>
        </div>
      </Form>
    </Formik>
  );
};
