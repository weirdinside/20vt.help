import React from "react";
import { useRef } from "react";
import { cc_codes } from "../../../../utils/constants";
import styles from "./ClimateControlTable.module.css";

function ClimateControlTable({ setActiveModal }) {
  const searchBar = useRef(null);
  const codesList = useRef(null);

  function searchFunc() {
    let input = searchBar.current;
    let filter = input.value.toUpperCase();
    let ul = codesList.current;
    let li = Array.from(ul.getElementsByTagName("tr"));
    li.forEach((item) => {
      let location = item.textContent.toUpperCase().indexOf(filter);
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

  // for rendering: if i = 0, 51 or 52, then underline the item, have it in a different color and append (click for more info) to the end of the string of the name of the code
  // create modals in compendium to show the subcodes

  function isExtraClickThrough(code) {
    if (["01", "52", "53"].includes(code)) {
      return true;
    }
    return false;
  }

  function showCodesTable() {
    let rows = [];
    for (let i = 0; i < cc_codes.length; i++) {
      isExtraClickThrough(cc_codes[i].code);
      rows.push(
        <tr key={cc_codes[i].code}>
          <td className={styles["codetable__code"]}>{cc_codes[i].code}</td>
          <td
            onClick={() => {
              if (isExtraClickThrough(cc_codes[i].code)) {
                switch (cc_codes[i].code) {
                  case "01":
                    setActiveModal("CC01");
                    break;
                  case "52":
                    setActiveModal("CC52");
                    break;
                  case "53":
                    setActiveModal("CC53");
                    break;
                }
              }
            }}
            style={
              isExtraClickThrough(cc_codes[i].code)
                ? {
                    cursor: "pointer",
                    color: "#471616",
                    textDecoration: "underline",
                  }
                : null
            }
            className={styles["codetable__caption"]}
          >
            {cc_codes[i].caption}{" "}
            {isExtraClickThrough(cc_codes[i].code)
              ? "(click for more information)"
              : ""}
          </td>
        </tr>
      );
    }
    return (
      <>
        <table className={styles["codetable__table"]}>
          <thead>
            <tr>
              <th width="60px">code</th>
              <th>description</th>
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

export default ClimateControlTable;
