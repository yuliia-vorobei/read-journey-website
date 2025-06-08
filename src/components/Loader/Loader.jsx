import { RotatingLines } from "react-loader-spinner";
import css from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={css.loader}>
      <RotatingLines  strokeColor="#F9F9F9" />
    </div>
  );
};
