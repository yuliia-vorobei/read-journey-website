import { Form, Formik, ErrorMessage, Field } from "formik";
import { useId, useState } from "react";
import css from "./LoginForm.module.css";
import { useNavigate } from "react-router-dom";
import Icon from "../Icon/Icon";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operations.js";

const initialValues = {
  email: "",
  password: "",
};

export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailFieldId = useId();
  const passwordFieldId = useId();
  const [visible, setVisible] = useState(false);
  const togglePassword = () => {
    setVisible(!visible);
  };

  const handleSubmit = (values, actions) => {
    dispatch(login(values));
    actions.resetForm();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form autoComplete="off">
        <div className={css.formContainer}>
          <label htmlFor={emailFieldId} className={css.fieldContainer}>
            <span className={css.label}>Mail:</span>
            <Field
              type="email"
              name="email"
              autoComplete="off"
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
              type={visible ? "text" : "password"}
              name="password"
              className={css.field}
              id={passwordFieldId}
              placeholder="Yourpasswordhere"
              autoComplete="off"
            />
            <ErrorMessage
              name="password"
              component="span"
              className={css.errorMsg}
            />
            <span onClick={togglePassword} className={css.iconButton}>
              {visible ? (
                <Icon id="icon-eye-off" className={css.icon} />
              ) : (
                <Icon id="icon-eye" className={css.icon} />
              )}
            </span>
          </label>
        </div>
        <div className={css.buttonContainer}>
          <button type="submit" className={css.button}>
            Log In
          </button>
          <button
            className={css.accountBtn}
            type="button"
            onClick={() => navigate("/register")}
          >
            Don't have an account?
          </button>
        </div>
      </Form>
    </Formik>
  );
};
