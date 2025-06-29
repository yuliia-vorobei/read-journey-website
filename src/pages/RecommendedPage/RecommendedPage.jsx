import css from "./RecommendedPage.module.css";
import { Dashboard } from "../../components/Dashboard/Dashboard .jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Loader } from "../../components/Loader/Loader.jsx";
import { RecommendedBooks } from "../../components/RecommendedBooks/RecommendedBooks.jsx";
import { recommendation } from "../../redux/recommendedBooks/operations.js";
import { Filters } from "../../components/Filters/Filters.jsx";
import { WorkoutComponent } from "../../components/WorkoutComponent/WorkoutComponent.jsx";
import { QuoteComponent } from "../../components/QuoteComponent/QuoteComponent.jsx";
import Icon from "../../components/Icon/Icon.jsx";

const RecommendedPage = () => {
  const dispatch = useDispatch();

  return (
    <section className={css.container}>
      <Dashboard>
        <Filters />
        <WorkoutComponent />
        <QuoteComponent />
      </Dashboard>
      <RecommendedBooks />
    </section>
  );
};
export default RecommendedPage;
