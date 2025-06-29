import { useSelector } from "react-redux";
import { AddReading } from "../../components/AddReading/AddReading";
import { Dashboard } from "../../components/Dashboard/Dashboard ";
import { MyBook } from "../../components/MyBook/MyBook";
import css from "./ReadingPage.module.css";
import { selectBooks } from "../../redux/startReadingBook/selectors";
import { Progress } from "../../components/Progress/Progress";
import { ReadingPageHeader } from "../../components/ReadingPageHeader/ReadingPageHeader";

const ReadingPage = () => {
  const selectedBooks = useSelector(selectBooks);
  const hasProgress = selectedBooks?.progress?.length > 0;

  return (
    <section className={css.container}>
      <Dashboard>
        <div className={css.dashboardContainer}>
          <AddReading />
          <div>{!hasProgress ? <Progress /> : <ReadingPageHeader />}</div>
        </div>
      </Dashboard>
      <MyBook />
    </section>
  );
};

export default ReadingPage;
