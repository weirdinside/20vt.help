import React, { ChangeEventHandler, useContext } from "react";
import Link from "next/link";
import styles from "./CompendiumHeader.module.css";
import { SearchContext } from "@/app/contexts/SearchProvider";

export default function CompendiumHeader({
  searchInput,
  handleChange,
}: {
  searchInput: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
}) {
  const { setSearchTerm } = useContext(SearchContext);
  return (
    <header className={styles["header"]}>
       {searchInput && (
        <div
          onClick={() => {
            setSearchTerm("");
          }}
          className={styles["search__close"]}
        >
          ✕
        </div>
      )}
      <h1 className={styles["header__title"]}>Compendium.</h1>
     
      <input
        className={styles["header__search"]}
        type="text"
        onChange={handleChange}
        value={searchInput}
        placeholder="search"
        id="search-bar"
      />
      <div className={styles["header__logo"]}>
        <div className={styles["logo__big-rhombus"]} id="big-rhombus"></div>
        <div
          className={styles["logo__small-rhombus-1"]}
          id="small-rhombus-1"
        ></div>
        <div
          className={styles["logo__small-rhombus-2"]}
          id="small-rhombus-2"
        ></div>
        <Link href="/">
          <p className={styles["header__back"]}>back to 20vt.help</p>
        </Link>
      </div>
    </header>
  );
}
