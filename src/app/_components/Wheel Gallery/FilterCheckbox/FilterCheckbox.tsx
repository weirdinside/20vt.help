"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./FilterCheckbox.module.css";

interface CheckboxTypes {
  toggleOption: Function;
  checkedOptions: Array<string>;
  label: string;
  modifier: string;
  category: string;
  muted: boolean;
}

export default function FilterCheckbox({
  toggleOption,
  checkedOptions,
  muted,
  label,
  category,
  modifier,
}: CheckboxTypes) {
  const [isChecked, setCheckedState] = useState(false);

  function handleCheck(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    e.stopPropagation();
    toggleOption(label);
  }

  useEffect(() => {
    setCheckedState(checkedOptions.includes(label));
  }, [checkedOptions, label]);

  const sanitizedLabel = String(label).replace(/[^a-zA-Z0-9]/g, "");
  const key = sanitizedLabel + modifier;
  return (
    <div onMouseDown={(e)=>{
      e.preventDefault();
    }} key={key}>
      <label
        style={muted && !isChecked ? { opacity: 0.5 } : { opacity: 1 }}
        className={`${styles["wheelfinder__checkbox"]} ${
          isChecked ? styles["active"] : ""
        }`}
      >
        {label}
        <input
          onChange={handleCheck}
          checked={isChecked}
          id={label}
          value={label}
          data-categ={category}
          className={styles["checkbox_ref"]}
          type="checkbox"
        />
      </label>
    </div>
  );
}
