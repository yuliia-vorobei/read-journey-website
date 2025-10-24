import { OneBookComponent } from "../OneBookComponent/OneBookComponent";
import { useDispatch, useSelector } from "react-redux";
import css from "./RecommendedBooks.module.css";
import { selectItems } from "../../redux/recommendedBooks/selectors";
import { useEffect, useState } from "react";
import { recommendation } from "../../redux/recommendedBooks/operations";
import Icon from "../Icon/Icon";
import { PiSmileySadDuotone } from "react-icons/pi";

export const RecommendedBooks = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const { totalPages, title, author } = useSelector(
    (state) => state.recommendedBooks
  );
  const recommended = useSelector(selectItems);
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
    dispatch(recommendation({ page, perPage, title, author }));
  }, [dispatch, page, perPage, author, title]);

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
          {page > 1 ? (
            <span onClick={handlePreviousPage} className={css.iconButton}>
              <Icon id="icon-previous" className={css.iconPage} />
            </span>
          ) : (
            <span onClick={handlePreviousPage} className={css.iconButton}>
              <Icon id="icon-previous" className={css.iconPageDisabled} />
            </span>
          )}
          {page < totalPages ? (
            <span onClick={handleNextPage} className={css.iconButton}>
              <Icon id="icon-next" className={css.iconPage} />
            </span>
          ) : (
            <span onClick={handleNextPage} className={css.iconButton}>
              <Icon id="icon-next" className={css.iconPageDisabled} />
            </span>
          )}
        </div>
      </div>
      {recommended.length === 0 ? (
        <div className={css.notFoundContainer}>
          <PiSmileySadDuotone />
          <p className={css.titleNotFound}>Sorry, nothing was found!</p>
        </div>
      ) : (
        <OneBookComponent />
      )}
    </section>
  );
};
