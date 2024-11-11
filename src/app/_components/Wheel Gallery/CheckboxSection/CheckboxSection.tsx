"use client";

import React, { useEffect, useState, useRef } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import styles from "./CheckboxSection.module.css";
import { debounce } from "@/app/utils";

export default function CheckboxSection({
  arrayName,
  checkedFilters,
  toggleOption,
  filtersArray,
}: {
  arrayName: keyof FilterOptions;
  checkedFilters: FilterOptions;
  toggleOption: (category: keyof FilterOptions, value: string) => Promise<void>;
  filtersArray: keyof FilterOptions;
}) {
  const [tooWide, setIsWide] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const [sectionStyle, setSectionStyle] = useState({})

  const containerRef = useRef<HTMLFieldSetElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

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

  useEffect(function setStyle(){
    // if no options are loaded, the height is 0 - otherwise 40px
    // if isOpen, flexWrap = wrap and height is max-content - otherwise nowrap 40px
    let height = '0px';
    let wrap = 'nowrap'
    let margin = '0px'

    if(filtersArray.length === 0){
      height = '0px'
      margin = '0px'
    }else if (filtersArray.length > 0){
      if(isOpen){
        height = 'max-content'
        wrap = 'wrap'
      }
      if(!isOpen){
        height = '40px'
        wrap = 'nowrap'
      }
    }

    setSectionStyle({height: height, margin: margin, wrap: wrap})

  }, [filtersArray, isOpen, checkedFilters])

  useEffect(
    function checkWindowSize() {
      if (containerRef.current && optionsRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const optionsWidth = optionsRef.current.scrollWidth;
        if (optionsWidth > containerWidth) {
          setIsWide(true);
        } else {
          if (!isOpen) {
            setIsWide(false);
          }
        }
      }
    },
    [isOpen, windowWidth, filtersArray, setIsWide, containerRef, optionsRef],
  );

  useEffect(
    function logScrollPosition() {
      const instance: HTMLDivElement | null = optionsRef.current;
      const scrollWidth = instance!.scrollWidth - instance!.offsetWidth;
      if (scrollWidth > 0) {
        setScrollPosition("left");
      }

      const handleScroll = () => {
        const scrollLeft = instance!.scrollLeft;
        const scrollDecimal = (scrollLeft / scrollWidth).toFixed(2);
        if (Number(scrollDecimal) <= 0.05) {
          setScrollPosition("left");
        } else if (Number(scrollDecimal) >= 0.95) {
          setScrollPosition("right");
        } else if (
          Number(scrollDecimal) > 0.05 &&
          Number(scrollDecimal) < 0.95
        ) {
          setScrollPosition("center");
        } else {
          setScrollPosition("");
        }
      };

      const debouncedHandleScroll = debounce(handleScroll, 20);
      if (instance) {
        instance!.addEventListener("scroll", debouncedHandleScroll);
      }
      return () => {
        instance!.removeEventListener("scroll", debouncedHandleScroll);
      };
    },
    [windowWidth, filtersArray],
  );

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <fieldset
      style={filtersArray.length === 0 ? {padding: '0px', border: "0px"} : {}}
      ref={containerRef}
      className={styles["wheelfinder__category"]}
      key={arrayName}
    >
      <div
        ref={optionsRef}
        style={sectionStyle}
        className={styles["wheelfinder__category_options"]}
      >
        {filtersArray.map((option, index) => {
          return (
            <FilterCheckbox
              key={index}
              arrayName={arrayName}
              toggleOption={toggleOption}
              checkedFilters={checkedFilters}
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
