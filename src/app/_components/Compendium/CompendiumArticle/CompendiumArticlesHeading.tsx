import React from "react";
import styles from "./CompendiumArticle.module.css";

export default function CompendiumArticlesHeading() {
  return (
    <li className={styles["index__list_heading"]}>
      <h2 className={styles["index__list_heading_main"]}>
        List of Information Groups
      </h2>
      <h3 className={styles["index__list_heading_description"]}>
        1991-1997 Audi C4 &#9654;
      </h3>
      <h4 className={styles["index__list_heading_construction"]}>
        This website is still under construction. If you would like to
        contribute to the information base or see any incomplete information,
        please contact{" "}
        <a
          className={styles["index__list_heading_construction"]}
          href="mailto:ani@20vt.help"
        >
          ani@20vt.help
        </a>
      </h4>
    </li>
  );
}
