import css from "./Diary.module.css";
import Icon from "../Icon/Icon";
import { OneDayProgress } from "../OneDayProgress/OneDayProgress";

export const Diary = () => {
  return (
    <section className={css.container}>
      <OneDayProgress />
    </section>
  );
};
