"use client";

import React, { useEffect, useState } from "react";
import styles from "./FilterCheckbox.module.css";

interface CheckboxTypes {
  arrayName: string;
  toggleOption: void;
  checkedOptions: Array<string>;
  label: string;
  modifier: string;
  muted: boolean;
}

export default function FilterCheckbox({
  arrayName,
  toggleOption,
  checkedOptions,
  muted,
  label,
  modifier,
}: CheckboxTypes) {
  const [isChecked, setCheckedState] = useState(false);

  function handleCheck(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    e.stopPropagation();
    toggleOption(arrayName, label);
  }

  useEffect(() => {
    setCheckedState(checkedOptions[arrayName].includes(label));
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
          className={styles["checkbox_ref"]}
          type="checkbox"
        />
      </label>
    </div>
  );
}
