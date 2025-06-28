import { useSelector } from "react-redux";
import css from "./Statistics.module.css";
import { selectBooks } from "../../redux/startReadingBook/selectors";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect, useRef } from "react";
import Icon from "../Icon/Icon";

export const Statistics = () => {
  const selectedBooks = useSelector(selectBooks);
  const { progress, totalPages } = selectedBooks;
  const stoppedSessions = selectedBooks.progress.filter(
    (session) => session.status === "inactive"
  );

  const pagesRead = stoppedSessions.reduce((total, session) => {
    const start = session.startPage ?? 0;
    const finish = session.finishPage ?? 0;
    return total + (finish - start);
  }, 0);

  const percent = totalPages
    ? ((pagesRead / totalPages) * 100).toFixed(2)
    : "0";

  const chartRef = useRef(null);

  useLayoutEffect(() => {
    if (!chartRef.current || !totalPages || totalPages <= 0) return;

    if (chartRef.current.dataset.chartInitialized === "true") return;
    chartRef.current.dataset.chartInitialized = "true";
    const root = am5.Root.new(chartRef.current);

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        width: am5.percent(100),
        height: am5.percent(100),
        innerRadius: am5.percent(80),
      })
    );

    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category",
      })
    );

    series.ticks.template.set("visible", false);

    series.slices.template.set("toggleKey", "none");
    series.labels.template.set("forceHidden", true);

    series.slices.template.adapters.add("fill", (fill, target) => {
      const category = target.dataItem?.dataContext?.category;
      if (category === "Read") return am5.color("#30b94d"); // green
      if (category === "Remaining") return am5.color("#1f1f1f"); // grey
      return fill;
    });

    series.slices.template.adapters.add("stroke", (stroke, target) => {
      const category = target.dataItem?.dataContext?.category;
      if (category === "Read") return am5.color("#30b94d");
      if (category === "Remaining") return am5.color("#1f1f1f");
      return stroke;
    });

    series.data.setAll([
      {
        category: "Read",
        value: pagesRead,
      },
      {
        category: "Remaining",
        value: totalPages - pagesRead,
      },
    ]);

    const labelFontSize = window.innerWidth < 768 ? 18 : 20;

    chart.seriesContainer.children.push(
      am5.Label.new(root, {
        text: `${percent}%`,
        centerX: am5.percent(50),
        centerY: am5.percent(50),
        fontSize: labelFontSize,
        fontWeight: "700",
        fill: am5.color("#f9f9f9"),
      })
    );

    requestAnimationFrame(() => {
      root.resize();
    });

    const handleResize = () => {
      root.resize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      root.dispose();
      chartRef.current.dataset.chartInitialized = "false"; // reset
    };
  }, [pagesRead, totalPages, percent]);

  console.log(selectedBooks);
  return (
    <section>
      <p className={css.text}>
        Each page, each chapter is a new round of knowledge, a new step towards
        understanding. By rewriting statistics, we create our own reading
        history.
      </p>
      <div className={css.statisticContainer}>
        <div ref={chartRef} className={css.graph} />
        <div className={css.pagesContainer}>
          <p className={css.percentage}>{percent}%</p>
          <p className={css.pages}>{pagesRead} pages read</p>
        </div>
      </div>
    </section>
  );
};
