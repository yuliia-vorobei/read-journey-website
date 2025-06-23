import css from "./Dashboard.module.css";

export const Dashboard = ({ children }) => {
  return (
    <section className={css.container}>
      <main className={css.dashboardContent}>{children}</main>
    </section>
  );
};
