import { Logo } from "../../components/Logo/Logo.jsx";
import { PhoneComponent } from "../../components/PhoneComponent/PhoneComponent.jsx";
import { RegistrationForm } from "../../components/RegistrationForm/RegistrationForm.jsx";
import css from "./RegistrationPage.module.css";

const RegistrationPage = () => {
  return (
    <div className={css.layout}>
      <div className={css.container}>
        <div className={css.logoContainer}>
          <Logo />
          <p className={css.logo}>read journey</p>
        </div>

        <h1 className={css.title}>
          Expand your mind, reading <span className={css.span}>a book</span>
        </h1>
        <RegistrationForm />
      </div>
      <PhoneComponent />
    </div>
  );
};

export default RegistrationPage;
