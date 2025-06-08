import { Filters } from "../Filters/Filters";
import { QuoteComponent } from "../QuoteComponent/QuoteComponent";
import { WorkoutComponent } from "../WorkoutComponent/WorkoutComponent";
import css from "./Dashboard.module.css";

export const Dashboard = () => {
  return (
    <div className={css.container}>
      <Filters />
      <WorkoutComponent />
      <QuoteComponent />
    </div>
  );
};
