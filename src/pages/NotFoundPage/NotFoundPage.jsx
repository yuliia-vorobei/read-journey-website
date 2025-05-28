import css from "./NotFoundPage.module.css";
import { Link } from "react-router-dom";
import { PiSmileySadDuotone } from "react-icons/pi";

const NotFoundPage = () => {
  return (
    <div className={css.container}>
      <PiSmileySadDuotone />
      <h3 className={css.title}>Sorry this page does not exist!</h3>
      <Link to="/">To Home Page</Link>
    </div>
  );
};
export default NotFoundPage;
