"use client";

import React, { MouseEventHandler, useRef } from "react";
import { cc_ch1_codes } from "@/app/utils/constants";
import styles from "./ClimateControlCh1Modal.module.css";

export default function ClimateControlCh1Modal({
  activeModal,
  closeModal,
}: {
  activeModal: string;
  closeModal: () => void;
}) {
  let rows = [];

  const searchBar = useRef<HTMLInputElement>(null);
  const ch1ItemList = useRef<HTMLTableSectionElement>(null);

  function searchFunc() {
    const input = searchBar.current;
    const ul = ch1ItemList.current;

    if (!input || !ul) return;

    const filter = input.value.toUpperCase();
    const rows = Array.from<HTMLTableRowElement>(ul.getElementsByTagName("tr"));

    rows.forEach((item) => {
      const location = item.textContent?.toUpperCase().indexOf(filter) ?? -1;

      if (location > -1) {
        item.style.visibility = "visible";
        item.style.display = "table-row";
        item.style.overflow = "";
        item.style.maxHeight = "";
      } else {
        item.style.visibility = "hidden";
        item.style.display = "none";
        item.style.overflow = "hidden";
        item.style.maxHeight = "0px";
      }
    });
  }

  for (let i = 0; i < cc_ch1_codes.length; i++) {
    rows.push(
      <tr
        className={styles["tr"]}
        key={cc_ch1_codes[i].code + cc_ch1_codes[i].caption}
      >
        <td className={styles["ch1__table-code"]}>{cc_ch1_codes[i].code}</td>
        <td className={styles["ch1__table-caption"]}>
          {cc_ch1_codes[i].caption}
        </td>
      </tr>
    );
  }

  return (
    <div
      className={`${styles["modal"]} ${
        activeModal === "CC01" && styles["active"]
      }`}
      onClick={(e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if ((e.target as HTMLElement).classList.contains(styles["modal"]))
          closeModal();
      }}
    >
      <div className={styles["modal__container"]}>
        <div onClick={closeModal} className={styles["close"]}>
          ✕
        </div>
        <table className={styles["ch1__table"]}>
          <thead>
            <tr className={styles["tr"]}>
              <th style={{ width: "82px" }}>code</th>
              <th>description</th>
            </tr>
            <tr>
              <td>
                <input
                  ref={searchBar}
                  onChange={() => {
                    searchFunc();
                  }}
                  placeholder="type to search"
                  type="text"
                  className={styles["ch1__search"]}
                />
              </td>
            </tr>
          </thead>
        </table>
        <div className={styles["ch1__lower-table"]}>
          <table>
            <tbody ref={ch1ItemList} className={styles["ch1__table-body"]}>
              {rows}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
