import css from "./QuoteComponent.module.css";

export const QuoteComponent = () => {
  return (
    <div className={css.container}>
      <img src="../../../public/books.png" width="40" height="40" />
      <p className={css.text}>
        "Books are <span className={css.span}>windows</span> to the world, and
        reading is a journey into the unknown."
      </p>
    </div>
  );
};
