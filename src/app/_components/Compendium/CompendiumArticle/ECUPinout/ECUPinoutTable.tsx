import React from "react";
import { useRef } from "react";
import { ecu_pins } from "../../../../utils/constants";
import styles from "./ECUPinoutTable.module.css";

export default function ECUPinoutTable({
  setActivePin,
}: {
  setActivePin: (arg0: number) => void;
}) {
  const searchBar = useRef(null);
  const codesList = useRef(null);

  function searchFunc() {
    let input: any = searchBar.current;
    if (!input) return;
    let filter = input.value.toUpperCase();
    let ul: HTMLUListElement = codesList.current!;
    let li = Array.from(ul.getElementsByTagName("tr"));
    li.forEach((item: HTMLTableRowElement) => {
      let location = item.textContent!.toUpperCase().indexOf(filter);
      if (location > -1) {
        item.style.visibility = "visible";
        item.style.display = "table-row";
        item.style.overflow = "";
        item.style.maxHeight = "";
        // item.style.lineHeight = "140%";
      } else {
        item.style.visibility = "hidden";
        item.style.display = "none";
        item.style.overflow = "hidden";
        item.style.maxHeight = "0px";
        // item.style.lineHeight = "0px";
      }
    });
  }

  function showCodesTable() {
    let rows = [];
    for (let i = 1; i < 56; i++) {
      rows.push(
        <tr key={i}>
          <td
            onClick={() => {
              setActivePin(i);
            }}
            className={styles["codetable__code"]}
          >
            {i}
          </td>
          <td className={styles["codetable__caption"]}>
            {ecu_pins[`${i}`].desc}{" "}
          </td>
          <td className={styles["codetable__caption"]}>
            {ecu_pins[`${i}`].pc === "transparent" ? "N/" : ecu_pins[`${i}`].pc + "/"}
            {ecu_pins[`${i}`].sc === "transparent" ? "A" : ecu_pins[`${i}`].sc}
          </td>
        </tr>
      );
    }
    return (
      <>
        <table className={styles["codetable__table"]}>
          <thead style={{ width: "100%" }}>
            <tr
              style={{
                display: "flex",
                marginTop: "22px",
                borderTop: "2px solid black",
                width: "100%",
              }}
            >
              <th style={{ marginLeft: "5px", width: "80px" }}>pin</th>
              <th style={{ width: "100%" }}>purpose</th>
              <th
                style={{
                  marginLeft: "auto",
                  width: "min-content",
                  marginRight: "10px",
                  textWrap: "nowrap",
                }}
              >
                wire
              </th>
            </tr>
            <tr>
              <td>
                <input
                  ref={searchBar}
                  onChange={() => {
                    searchFunc();
                  }}
                  placeholder="&#x1F50E;search"
                  type="text"
                  className={styles["codetable__search"]}
                />
              </td>
            </tr>
          </thead>
        </table>
        <div className={styles["codetable__lower-table"]}>
          <table>
            <tbody ref={codesList} className={styles["codetable__table-body"]}>
              {rows}
            </tbody>
          </table>
        </div>
      </>
    );
  }
  return <div>{showCodesTable()}</div>;
}
