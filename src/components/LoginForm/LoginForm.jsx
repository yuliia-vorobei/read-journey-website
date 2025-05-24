import { Form, Formik, ErrorMessage, Field } from "formik";
import { useId } from "react";
import css from "./LoginForm.module.css";
import { useNavigate } from "react-router-dom";

const initialValues = {
  name: "",
  email: "",
  password: "",
};

export const LoginForm = () => {
  const navigate = useNavigate();
  const emailFieldId = useId();
  const passwordFieldId = useId();

  const handleSubmit = (values, actions) => {
    actions.resetForm();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <div className={css.formContainer}>
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
            Log In
          </button>
          <button
            className={css.accountBtn}
            onClick={() => navigate("/register")}
          >
            Don't have an account?
          </button>
        </div>
      </Form>
    </Formik>
  );
};
