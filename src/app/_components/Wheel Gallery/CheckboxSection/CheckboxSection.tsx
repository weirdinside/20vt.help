"use client";

import React, { useEffect, useState, useRef } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import styles from "./CheckboxSection.module.css";
import { debounce } from "@/app/utils";

export default function CheckboxSection({
  arrayName,
  checkedOptions,
  toggleOption,
  optionsArray,
}) {
  const [tooWide, setIsWide] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef(null);
  const optionsRef = useRef(null);

  const [scrollPosition, setScrollPosition] = useState("");

  const handleWindowSizeChange = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  useEffect(
    function checkWindowSize() {
      if (containerRef.current && optionsRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const optionsWidth = optionsRef.current.scrollWidth;
        if (optionsWidth > containerWidth) {
          setIsWide(true);
        } else {
          setIsWide(false);
          setIsOpen(false);
        }
      }
    },
    [windowWidth, setIsWide, containerRef, optionsRef],
  );

  useEffect(() => {
    const instance = optionsRef.current;
    const scrollWidth = instance.scrollWidth - instance.offsetWidth;
    if (scrollWidth > 0) {
      setScrollPosition("left");
    }

    const handleScroll = () => {
      const scrollLeft = instance.scrollLeft;
      const scrollDecimal = (scrollLeft / scrollWidth).toFixed(2);
      if (Number(scrollDecimal) <= 0.05) {
        setScrollPosition("left");
      } else if (Number(scrollDecimal) >= 0.95) {
        setScrollPosition("right");
      } else if (Number(scrollDecimal) > 0.05 && Number(scrollDecimal) < 0.95) {
        setScrollPosition("center");
      } else {
        setScrollPosition("");
      }
    };

    const debouncedHandleScroll = debounce(handleScroll, 20);
    if (instance) {
      instance.addEventListener("scroll", debouncedHandleScroll);
    }
    return () => {
      instance.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [optionsRef.current, windowWidth]);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <fieldset
      ref={containerRef}
      className={styles["wheelfinder__category"]}
      key={arrayName}
    >
      <div
        ref={optionsRef}
        style={
          isOpen
            ? { flexWrap: "wrap", height: "max-content" }
            : { flexWrap: "nowrap", height: "40px" }
        }
        className={styles["wheelfinder__category_options"]}
      >
        {optionsArray.map((option, index) => {
          return (
            <FilterCheckbox
              key={index}
              arrayName={arrayName}
              toggleOption={toggleOption}
              checkedOptions={checkedOptions}
              muted={true}
              label={option}
              modifier="body"
            ></FilterCheckbox>
          );
        })}
        {tooWide && isOpen ? (
          <p
            onClick={toggleMenu}
            className={styles["wheelfinder__category_less"]}
          >
            less
          </p>
        ) : null}
      </div>
      {scrollPosition == "right" || scrollPosition == "center" ? (
        <div className={styles["wheelfinder__category_scroll-left"]}></div>
      ) : null}
      {scrollPosition == "left" || scrollPosition == "center" ? (
        <div className={styles["wheelfinder__category_scroll-right"]}></div>
      ) : null}
      {tooWide && !isOpen ? (
        <div
          onClick={toggleMenu}
          className={styles["wheelfinder__category_more"]}
        >
          <p className={styles["wheelfinder__category_more-text"]}>more</p>
          <div
            className={styles["wheelfinder__category_more-background"]}
          ></div>
        </div>
      ) : null}
    </fieldset>
  );
}
