import { useSelector } from "react-redux";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { Logo } from "../../components/Logo/Logo";
import { PhoneComponent } from "../../components/PhoneComponent/PhoneComponent";
import css from "./LoginPage.module.css";
import { selectIsLoading } from "../../redux/auth/selectors";
import { Loader } from "../../components/Loader/Loader";

export const LoginPage = () => {
  const isLoading = useSelector(selectIsLoading);
  return (
    <div className={css.layout}>
      {isLoading && <Loader />}
      <div className={css.container}>
        <div className={css.logoContainer}>
          <Logo />
          <p className={css.logo}>read journey</p>
        </div>

        <h1 className={css.title}>
          Expand your mind, reading <span className={css.span}>a book</span>
        </h1>
        <LoginForm />
      </div>
      <PhoneComponent />
    </div>
  );
};

export default LoginPage;
