import { OneBookComponent } from "../OneBookComponent/OneBookComponent";
import { useDispatch, useSelector } from "react-redux";
import css from "./RecommendedBooks.module.css";
import { selectError } from "../../redux/recommendedBooks/selectors";
import { Loader } from "../Loader/Loader";
import { useEffect, useState } from "react";
import { recommendation } from "../../redux/recommendedBooks/operations";
import Icon from "../Icon/Icon";

export const RecommendedBooks = () => {
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { totalPages } = useSelector((state) => state.recommendedBooks);
  const getInitialPerPage = () => {
    const width = window.innerWidth;
    if (width >= 1440) return 10;
    if (width >= 768) return 8;
    return 2;
  };

  const [perPage, setPerPage] = useState(getInitialPerPage);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width >= 1440) {
        setPerPage(10);
      } else if (width >= 768) {
        setPerPage(8);
      } else {
        setPerPage(2);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [perPage]);

  useEffect(() => {
    dispatch(recommendation({ page, perPage }));
  }, [dispatch, page, perPage]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };
  return (
    <section className={css.container}>
      <div className={css.titleContainer}>
        <h2 className={css.title}>Recommended</h2>
        <div className={css.iconsContainer}>
          {page > 1 && (
            <span onClick={handlePreviousPage} className={css.btn}>
              <Icon id="icon-previous" className={css.icon} />
            </span>
          )}
          {page < totalPages && (
            <span onClick={handleNextPage} className={css.btn}>
              <Icon id="icon-next" className={css.icon} />
            </span>
          )}
        </div>
      </div>
      {error && <p>{error}</p>}
      <OneBookComponent />
    </section>
  );
};
