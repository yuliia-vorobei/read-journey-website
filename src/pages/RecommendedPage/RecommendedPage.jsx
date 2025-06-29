import css from "./RecommendedPage.module.css";
import { Dashboard } from "../../components/Dashboard/Dashboard .jsx";
import { Loader } from "../../components/Loader/Loader.jsx";
import { RecommendedBooks } from "../../components/RecommendedBooks/RecommendedBooks.jsx";
import { Filters } from "../../components/Filters/Filters.jsx";
import { WorkoutComponent } from "../../components/WorkoutComponent/WorkoutComponent.jsx";
import { QuoteComponent } from "../../components/QuoteComponent/QuoteComponent.jsx";
import Icon from "../../components/Icon/Icon.jsx";

const RecommendedPage = () => {
  return (
    <section className={css.container}>
      <Dashboard>
        <Filters />
        <WorkoutComponent />
        <QuoteComponent />
      </Dashboard>
      <RecommendedBooks />
    </section>
  );
};
export default RecommendedPage;
