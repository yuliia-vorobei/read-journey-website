import { useEffect, useId, useState } from "react";
import css from "./MyLibraryBooks.module.css";
import Icon from "../Icon/Icon";
import { useDispatch, useSelector } from "react-redux";
import { deleteBook, getOwnBooks } from "../../redux/ownBooks/operations";
import { selectResults } from "../../redux/ownBooks/selectors";
import { Loader } from "../Loader/Loader";
import { BookModalComponent } from "../BookModalComponent/BookModalComponent";
import { useNavigate } from "react-router-dom";
import { getBookInfo } from "../../redux/startReadingBook/operations";

export const MyLibraryBooks = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("all");
  const results = useSelector(selectResults) || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  }, [perPage, status]);

  useEffect(() => {
    dispatch(getOwnBooks({ status }));
  }, [dispatch, status]);

  const totalPages = Math.ceil(results.length / perPage);

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

  const start = (page - 1) * perPage;
  const end = start + perPage;
  const currentItems = results.slice(start, end);

  const startReading = async (book) => {
    await dispatch(getBookInfo(book._id));
    navigate("/reading");
  };

  const handleDelete = async (bookId) => {
    await dispatch(deleteBook(bookId));
  };

  const selectId = useId();

  if (!results) {
    return <Loader />;
  }

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <h2 className={css.title}>My library</h2>
        <div className={css.filterContainer}>
          <div className={css.selectWrapper}>
            <label htmlFor={selectId} />
            <div>
              <select
                className={css.select}
                id={selectId}
                value={status}
                onChange={(evt) => setStatus(evt.target.value)}
              >
                <option value="unread" className={css.option}>
                  Unread
                </option>
                <option value="in-progress" className={css.option}>
                  In progress
                </option>
                <option value="done" className={css.option}>
                  Done
                </option>
                <option value="all" className={css.option}>
                  All books
                </option>
              </select>
              <Icon id="icon-chevron-down" className={css.icon} />
            </div>
          </div>
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
      </div>
      {results.length === 0 ? (
        <div className={css.readingContainer}>
          <span className={css.decorativeContainer}>
            <img
              src="/books.png"
              width="50"
              height="50"
              className={css.imageEmoji}
            />
          </span>
          <p className={css.quote}>
            To start training, add{" "}
            <span className={css.spanQuote}>some of your books</span> or from
            the recommended ones
          </p>
        </div>
      ) : (
        <ul className={css.list}>
          {currentItems.map((book) => {
            const { _id, imageUrl, title, author } = book;
            return (
              <li key={_id} className={css.item}>
                {imageUrl === null ? (
                  <img
                    src="/book_placeholder.png"
                    width="137"
                    height="208"
                    className={css.image}
                    onClick={() => setSelectedBook(book)}
                  />
                ) : (
                  <img
                    src={imageUrl}
                    width="137"
                    height="208"
                    className={css.image}
                    onClick={() => setSelectedBook(book)}
                  />
                )}
                <div className={css.infoContainer}>
                  <div className={css.titleContainer}>
                    <p className={css.bookTitle}>{title}</p>
                    <p className={css.author}>{author}</p>
                  </div>
                  <span
                    className={css.iconSpan}
                    onClick={() => handleDelete(_id)}
                  >
                    <Icon id="icon-bin" className={css.bin} />
                  </span>
                </div>
              </li>
            );
          })}
          {selectedBook && (
            <BookModalComponent
              book={selectedBook}
              onClose={() => setSelectedBook(null)}
              submitButton={
                <button
                  type="button"
                  className={css.btn}
                  onClick={() => startReading(selectedBook)}
                >
                  Start reading
                </button>
              }
            />
          )}
        </ul>
      )}
    </div>
  );
};
