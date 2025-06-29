import { useNavigate } from "react-router-dom";
import css from "./Logo.module.css";

export const Logo = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate("/");
  return (
    <div onClick={handleClick} className={css.logo}>
      <img src="/favicon.png" />
    </div>
  );
};
