import { Dashboard } from "../../components/Dashboard/Dashboard ";
import { AddBook } from "../../components/AddBook/AddBook";
import { MyLibraryBooks } from "../../components/MyLibraryBooks/MyLibraryBooks";
import css from "./LibraryPage.module.css";
import { RecommendedBookInLibrary } from "../../components/RecommendedBookInLibrary/RecommendedBookInLibrary";

const LibraryPage = () => {
  return (
    <div className={css.container}>
      <Dashboard>
        <AddBook />
        <RecommendedBookInLibrary />
      </Dashboard>
      <MyLibraryBooks />
    </div>
  );
};

export default LibraryPage;
