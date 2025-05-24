import { useNavigate } from "react-router-dom";

export const Logo = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate("/");
  return (
    <div onClick={handleClick}>
      <img src="../../../public/favicon.png" />
    </div>
  );
};
