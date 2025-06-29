import { useState } from "react";
import Icon from "../Icon/Icon";
import css from "./ReadingPageHeader.module.css";
import clsx from "clsx";
import { Statistics } from "../Statistics/Statistics";
import { Diary } from "../Diary/Diary";
import { useSelector } from "react-redux";
import { selectBooks } from "../../redux/startReadingBook/selectors";

export const ReadingPageHeader = () => {
  const [isActive, setIsActive] = useState("statistics");
  const selectedBooks = useSelector(selectBooks);
  const hasProgress = selectedBooks?.progress?.length > 0;

  const activeClass = (tab) => {
    return clsx(css.icon, tab === isActive && css.active);
  };

  return (
    hasProgress && (
      <div>
        <div className={css.container}>
          {isActive === "diary" && <h4 className={css.title}>Diary</h4>}
          {isActive === "statistics" && (
            <h4 className={css.title}>Statistics</h4>
          )}
          <div className={css.iconContainer}>
            <span onClick={() => setIsActive("diary")}>
              <Icon id="icon-statistics" className={activeClass("diary")} />
            </span>

            <span onClick={() => setIsActive("statistics")}>
              <Icon id="icon-diary" className={activeClass("statistics")} />
            </span>
          </div>
        </div>

        {isActive === "statistics" && <Statistics />}
        {isActive === "diary" && <Diary />}
      </div>
    )
  );
};
