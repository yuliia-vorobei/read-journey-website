import { useDispatch, useSelector } from "react-redux";
import css from "./OneDayProgress.module.css";
import { selectBooks } from "../../redux/startReadingBook/selectors";
import Icon from "../Icon/Icon";
import { deleteProgress } from "../../redux/startReadingBook/operations";

export const OneDayProgress = () => {
  const selectedBook = useSelector(selectBooks);
  console.log(selectedBook);
  const { progress, totalPages } = selectedBook;
  const dispatch = useDispatch();

  const handleDelete = (bookId, targetDate) => {
    const sessionsToDelete = progress.filter(
      (session) => session.finishReading?.slice(0, 10) === targetDate
    );

    sessionsToDelete.forEach((session) => {
      console.log(session._id, "session");
      dispatch(deleteProgress({ bookId, readingId: session._id }));
    });
  };

  console.log(progress);
  const sessionByDate = progress.reduce((acc, session) => {
    if (!session?.finishReading) return acc;
    const date = session.finishReading.slice(0, 10);
    if (!date) return acc;
    if (!acc[date]) {
      acc[date] = [];
    }

    acc[date].push(session);
    return acc;
  }, {});

  const dateEntries = Object.entries(sessionByDate).map(([date, sessions]) => {
    const pagesRead = sessions.reduce((sum, s) => {
      const start = s.startPage ?? 0;
      const finish = s.finishPage ?? 0;
      return sum + (finish - start);
    }, 0);

    const formattedDate = `${date.slice(8, 10)}.${date.slice(
      5,
      7
    )}.${date.slice(0, 4)}`;

    const percentPages = totalPages
      ? ((pagesRead / totalPages) * 100).toFixed(2)
      : "0";

    return { pagesRead, formattedDate, percentPages, date };
  });

  //   const pagesPerDay = uniqueDate.reduce((prevValue, page) => {
  //     const start = page.startPage ?? 0;
  //     const finish = page.finishPage ?? 0;
  //     return prevValue + (finish - start);
  //   }, 0);

  //   console.log(dateEntries);
  //   const totalPages = progress.reduce((prevValue, page) => {
  //     const start = page.startPage ?? 0;
  //     const finish = page.finishPage ?? 0;
  //     return prevValue + (finish - start);
  //   }, 0);

  return (
    <ul className={css.list}>
      {dateEntries.map(
        ({ formattedDate, pagesRead, percentPages, date }, index) => {
          return (
            <li key={index} className={css.item}>
              <div className={css.leftContainer}>
                <p className={css.date}>{formattedDate}</p>
                <p className={css.totalPages}>{pagesRead} pages</p>
              </div>
              <div className={css.rightContainer}>
                <p className={css.pagePercentage}>{percentPages} %</p>
                <div className={css.iconContainer}>
                  <span className={css.dairyContainer}>
                    <Icon
                      id="icon-diary-progress"
                      className={css.iconProgress}
                    />
                  </span>
                  <span onClick={() => handleDelete(selectedBook._id, date)}>
                    <Icon id="icon-bin" className={css.iconBin} />
                  </span>
                </div>
              </div>
            </li>
          );
        }
      )}
    </ul>
  );
};
