import React, { useState } from "react";
import styles from "./ECUPinout.module.css";
import { ecu_pins } from "@/app/utils/constants";
import ECUPinoutTable from "./ECUPinoutTable";
export default function ECUPinout() {
  const [activePin, setActivePin] = useState<number>();

  return (
    <div className={styles["pinout__container"]}>
      <div className={styles["pinout"]}>
        <div className={styles["pinout__grid_row1"]}>
          {Array.from({ length: 18 }, (_, i) => i + 1)
            .reverse()
            .map((number, idx) => {
              return (
                <div
                  key={idx + 37}
                  className={`${styles["pinout__grid_pin"]} ${
                    activePin === number + 37 && styles["active"]
                  }`}
                >
                  <div className={styles["pin__graphic"]}>-</div>
                  <div
                    onPointerDown={() => {
                      setActivePin(number + 37);
                    }}
                    className={styles["pin__number"]}
                  >
                    {number + 37}
                  </div>
                </div>
              );
            })}
        </div>
        <div className={styles["pinout__grid_row2"]}>
          {Array.from({ length: 18 }, (_, i) => i + 1)
            .reverse()
            .map((number, idx) => {
              return (
                <div
                  key={idx + 19}
                  className={`${styles["pinout__grid_pin"]} ${
                    activePin === number + 19 && styles["active"]
                  }`}
                >
                  <div className={styles["pin__graphic"]}>-</div>
                  <div
                    onPointerDown={() => {
                      setActivePin(number + 19);
                    }}
                    className={styles["pin__number"]}
                  >
                    {number + 19}
                  </div>
                </div>
              );
            })}
        </div>
        <div className={styles["pinout__grid_row3"]}>
          {Array.from({ length: 19 }, (_, i) => i + 1)
            .reverse()
            .map((number, idx) => {
              return (
                <div
                  key={idx}
                  className={`${styles["pinout__grid_pin"]} ${
                    activePin === number && styles["active"]
                  }`}
                >
                  <div className={styles["pin__graphic"]}>-</div>
                  <div
                    onPointerDown={() => {
                      setActivePin(number);
                    }}
                    className={styles["pin__number"]}
                  >
                    {number}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {activePin && (
        <div className={styles["pinout__description"]}>
          <div className={styles["wire"]}>
            <div
              style={{ backgroundColor: `${ecu_pins[activePin].pc}` }}
              className={styles["wire1"]}
            />
            <div
              style={{ backgroundColor: `${ecu_pins[activePin].sc}` }}
              className={styles["wire2"]}
            />
            <div
              style={{ backgroundColor: `${ecu_pins[activePin].pc}` }}
              className={styles["wire3"]}
            />
          </div>
          Pin {activePin}: {ecu_pins[activePin].desc}
        </div>
      )}
      <div className={styles["table"]}>
        <p className={styles["pinout__description"]}>
          or search the table below for a pin (click the pin # to see it in the
          diagram above):
        </p>
        <ECUPinoutTable setActivePin={setActivePin} />
      </div>
    </div>
  );
}
