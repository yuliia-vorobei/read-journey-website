import { NavLink, useNavigate } from "react-router-dom";
import css from "./RecommendedBookInLibrary.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectItems } from "../../redux/recommendedBooks/selectors";
import Icon from "../Icon/Icon";
import { Loader } from "../Loader/Loader";
import { useEffect, useState } from "react";
import { recommendation } from "../../redux/recommendedBooks/operations";

export const RecommendedBookInLibrary = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigation = () => {
    navigate("/recommended");
  };

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(8);

  useEffect(() => {
    setPage(1);
    setPerPage(8);
  }, [perPage]);

  useEffect(() => {
    dispatch(recommendation({ page, perPage }));
  }, [dispatch, page, perPage]);

  const results = useSelector(selectItems);
  if (!results) {
    return <Loader />;
  }

  return (
    <div className={css.recommendedContainer}>
      <h3 className={css.recommendedTitle}>Recommended books</h3>
      <ul className={css.list}>
        {results.slice(0, 3).map(({ _id, imageUrl, title, author }) => {
          return (
            <li key={_id} className={css.item}>
              <img
                src={imageUrl}
                width="137"
                height="208"
                className={css.image}
                onClick={navigation}
              />
              <p className={css.bookTitle}>{title}</p>
              <p className={css.bookAuthor}>{author}</p>
            </li>
          );
        })}
      </ul>
      <div className={css.buttonContainer}>
        <NavLink to="/" className={css.homeLink}>
          Home
        </NavLink>
        <NavLink to="/recommended">
          <Icon id="icon-log-in" className={css.icon} />
        </NavLink>
      </div>
    </div>
  );
};
