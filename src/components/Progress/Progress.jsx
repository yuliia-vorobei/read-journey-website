import css from "./Progress.module.css";
export const Progress = () => {
  return (
    <div className={css.progressContainer}>
      <h4 className={css.titleProgress}>Progress</h4>
      <p className={css.quoteProgress}>
        Here you will see when and how much you read. To record, click on the
        red button above.
      </p>
      <span className={css.iconProgress}>
        <img src="/progress-emoji.png" className={css.icon} />
      </span>
    </div>
  );
};
