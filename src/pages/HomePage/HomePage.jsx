import { useSelector } from "react-redux";
import { Header } from "../../components/Header/Header";

const HomePage = () => {
  const { title } = useSelector((state) => state.books);
  return (
    <>
      <Header />
      <p>{title}</p>
    </>
  );
};

export default HomePage;
