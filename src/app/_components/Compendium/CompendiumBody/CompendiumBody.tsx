import React from "react";
import styles from "./CompendiumBody.module.css";

export default function CompendiumBody({ children }: {children: React.ReactNode[]}) {
  return (
    <main className={styles["main"]}>
      <section className={styles["index"]}>
        <ol className={styles["index__list"]}>{children}</ol>
      </section>
    </main>
  );
}

