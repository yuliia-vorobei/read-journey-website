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
import { setItemsPerPage } from "../../redux/ownBooks/ownBooksSlice";

export const MyLibraryBooks = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [status, setStatus] = useState("all");
  const results = useSelector(selectResults);

  const unique = (res) => {
    const seen = new Set();
    return res.filter((item) => {
      if (seen.has(item.title)) return false;
      seen.add(item.title);
      return true;
    });
  };
  const u = unique(results);

  // const page = results.length;
  // const [pageNumber, setPageNumber] = useState(1);
  // const [bookNumber] = useState(6);
  // const currentPageNumber = pageNumber * bookNumber - bookNumber;

  // const handlePrev = () => {
  //   if (pageNumber === 1) {
  //     return setPageNumber(pageNumber - 1);
  //   }
  // };

  // const handleNext = () => {
  //   setPageNumber(pageNumber + 1);
  // };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOwnBooks({ status }));
  }, [dispatch, status]);

  useEffect(() => {
    const updatePerPage = () => {
      if (window.innerWidth < 640) {
        dispatch(setItemsPerPage(2));
      } else if (window.innerWidth < 1024) {
        dispatch(setItemsPerPage(8));
      } else {
        dispatch(setItemsPerPage(10));
      }
    };

    updatePerPage();
    window.addEventListener("resize", updatePerPage);
    return () => window.removeEventListener("resize", updatePerPage);
  }, [dispatch]);

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
          <span className={css.btnPage}>
            <Icon
              id="icon-previous"
              className={css.iconPage}
              // onClick={handlePrev}
            />
          </span>
          <span className={css.btnPage}>
            <Icon
              id="icon-next"
              className={css.iconPage}
              // onClick={handleNext}
            />
          </span>
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
          {u.map((book) => {
            const { _id, imageUrl, title, author } = book;
            // console.log(book);
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
