import { Form, Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { useId, useState } from "react";
import css from "./RegistrationForm.module.css";
import { useNavigate } from "react-router-dom";
import Icon from "../Icon/Icon.jsx";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations.js";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const togglePassword = () => {
    setVisible(!visible);
  };

  const nameFieldId = useId();
  const emailFieldId = useId();
  const passwordFieldId = useId();

  const handleSubmit = (values, actions) => {
    dispatch(register(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={RegistrationSchema}
    >
      <Form autoComplete="off">
        <div className={css.formContainer}>
          <label htmlFor={nameFieldId} className={css.fieldContainer}>
            <span className={css.label}>Name:</span>
            <Field
              type="text"
              name="name"
              className={css.field}
              id={nameFieldId}
              placeholder="Yuliia Vorobei"
              autoComplete="off"
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
              autoComplete="new-password"
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
              type={visible ? "text" : "password"}
              autoComplete="off"
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
            Registration
          </button>
          <button
            type="button"
            className={css.accountBtn}
            onClick={() => navigate("/login")}
          >
            Already have an account?
          </button>
        </div>
      </Form>
    </Formik>
  );
};
