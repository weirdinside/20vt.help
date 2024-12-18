"use client";

import React, { useEffect, useState } from "react";
import { ChangeEvent } from "react";
import styles from "./FilterCheckbox.module.css";

export default function FilterCheckbox({
  arrayName,
  toggleOption,
  checkedFilters,
  label,
  modifier,
}: {
  arrayName: keyof FilterOptions;
  toggleOption: (
    category: keyof FilterOptions,
    value: string | number,
  ) => Promise<void>;
  checkedFilters: FilterOptions;
  label: string | number;
  modifier: string;
}) {
  const [isChecked, setCheckedState] = useState(false);

  function handleCheck(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    e.stopPropagation();
    toggleOption(arrayName, label);
  }

  useEffect(() => {
    const filterArray = checkedFilters[arrayName] as (string | number)[];
    setCheckedState(filterArray.includes(label));
  }, [arrayName, checkedFilters, label]);
  
  const sanitizedLabel = String(label).replace(/[^a-zA-Z0-9]/g, "");
  const key = sanitizedLabel + modifier;

  if (label === null) {
    return <></>;
  }

  return (
    <div
      onMouseDown={(e) => {
        e.preventDefault();
      }}
      key={key}
    >
      <label
        style={!isChecked ? { opacity: 0.5 } : { opacity: 1 }}
        className={`${styles["wheelfinder__checkbox"]} ${
          isChecked ? styles["active"] : ""
        }`}
      >
        {label}
        <input
          onChange={handleCheck}
          checked={isChecked}
          value={label}
          className={styles["checkbox_ref"]}
          type="checkbox"
        />
      </label>
    </div>
  );
}
