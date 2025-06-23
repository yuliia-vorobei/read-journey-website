import { AddReading } from "../../components/AddReading/AddReading";
import { Dashboard } from "../../components/Dashboard/Dashboard ";
import { MyBook } from "../../components/MyBook/MyBook";
import css from "./ReadingPage.module.css";

const ReadingPage = () => {
  return (
    <section className={css.container}>
      <Dashboard>
        <AddReading />
      </Dashboard>
      <MyBook />
    </section>
  );
};

export default ReadingPage;
