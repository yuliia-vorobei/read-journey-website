import { useSelector } from "react-redux";
import { AddReading } from "../../components/AddReading/AddReading";
import { Dashboard } from "../../components/Dashboard/Dashboard ";
import { MyBook } from "../../components/MyBook/MyBook";
import { Statistics } from "../../components/Statistics/Statistics";
import css from "./ReadingPage.module.css";
import { selectBooks } from "../../redux/startReadingBook/selectors";
import { Progress } from "../../components/Progress/Progress";
import Icon from "../../components/Icon/Icon";
import { ReadingPageHeader } from "../../components/ReadingPageHeader/ReadingPageHeader";

const ReadingPage = () => {
  const selectedBooks = useSelector(selectBooks);
  const hasProgress = selectedBooks?.progress?.length > 0;

  return (
    <section className={css.container}>
      <Dashboard>
        <div className={css.dashboardContainer}>
          <AddReading />
          <div>
            <ReadingPageHeader />
            {!hasProgress && <Progress />}
          </div>
        </div>
      </Dashboard>
      <MyBook />
    </section>
  );
};

export default ReadingPage;
