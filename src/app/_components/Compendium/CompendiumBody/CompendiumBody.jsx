import React from "react";
import styles from "./CompendiumBody.module.css";

function CompendiumBody({ children }) {
  return (
    <main className={styles["main"]}>
      <section className={styles["index"]}>
        <ol className={styles["index__list"]}>{children}</ol>
      </section>
    </main>
  );
}

export default CompendiumBody;
