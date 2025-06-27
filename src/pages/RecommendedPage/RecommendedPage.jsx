import css from "./RecommendedPage.module.css";
import { Dashboard } from "../../components/Dashboard/Dashboard .jsx";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Loader } from "../../components/Loader/Loader.jsx";
import { RecommendedBooks } from "../../components/RecommendedBooks/RecommendedBooks.jsx";
import { recommendation } from "../../redux/recommendedBooks/operations.js";
import { Filters } from "../../components/Filters/Filters.jsx";
import { WorkoutComponent } from "../../components/WorkoutComponent/WorkoutComponent.jsx";
import { QuoteComponent } from "../../components/QuoteComponent/QuoteComponent.jsx";
import { setLoadMoreEnabled } from "../../redux/recommendedBooks/recommendedBooksSlice.js";
import Icon from "../../components/Icon/Icon.jsx";

const RecommendedPage = () => {
  const dispatch = useDispatch();
  // const [page, setPage] = useState(1);
  // const { totalPages, perPage } = useSelector(
  //   (state) => state.recommendedBooks
  // );
  // const total = Math.ceil(totalPages / perPage);
  // const handleLoadMore = () => {
  //   dispatch(setLoadMoreEnabled(false));
  //   setPage((prevPage) => prevPage + 1);
  //   dispatch(setLoadMoreEnabled(true));
  // };

  // const handlePreviousPage = () => {
  //   dispatch(setLoadMoreEnabled(false));
  //   setPage((prevPage) => prevPage - 1);
  //   dispatch(setLoadMoreEnabled(true));
  // };
  // useEffect(() => {
  //   dispatch(recommendation({ page, perPage }));
  // }, [dispatch]);

  useEffect(() => {
    dispatch(recommendation());
  }, [dispatch]);

  return (
    <section className={css.container}>
      <Dashboard>
        <Filters />
        <WorkoutComponent />
        <QuoteComponent />
      </Dashboard>
      <RecommendedBooks />

      {/* <div className={css.iconsContainer}>
        <span onClick={handlePreviousPage} className={css.btn}>
          <Icon id="icon-previous" className={css.icon} />
        </span>
        {total > page && (
          <span onClick={handleLoadMore} className={css.btn}>
            <Icon id="icon-next" className={css.icon} />
          </span>
        )}
      </div> */}
    </section>
  );
};
export default RecommendedPage;
