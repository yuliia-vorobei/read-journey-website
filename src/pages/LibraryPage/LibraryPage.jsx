import { DashboardLibrary } from "../../components/DashboardLibrary/DashboardLibrary";
import { MyLibraryBooks } from "../../components/MyLibraryBooks/MyLibraryBooks";
import css from "./LibraryPage.module.css";

const LibraryPage = () => {
  return (
    <div className={css.container}>
      <DashboardLibrary />
      <MyLibraryBooks />
    </div>
  );
};

export default LibraryPage;
