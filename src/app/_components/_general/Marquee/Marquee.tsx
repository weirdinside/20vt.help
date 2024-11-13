import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./Marquee.module.css";

interface MarqueeProps {
  trigger: boolean;
  textContent: string;
  fontSize: number;
  fontFamily: string;
  scrollSpeed: number; // set this to being greater than zero and less than 100
  pauseTime: number;
}

export default function Marquee({
  trigger = false,
  textContent = "",
  scrollSpeed = 1,
  pauseTime = 0,
}: MarqueeProps) {
  // on page load, set style and transition: right 0px and transition to true

  const [scrollTime, setScrollTime] = useState(0); // stores scrollTime variable after calculation in checkWindowSize hook
  const [width, setWidth] = useState(0); // arbitrary number but tracks window width
  const [difference, setDifference] = useState(0);
  const [textStyle, setTextStyle] = useState({});
  const [intervalTime, setIntervalTime] = useState(0);

  const marqueeRef = useRef<HTMLDivElement>(null); // reference for the parent container (if marquee is to be active, this is smaller)
  const textRef = useRef<HTMLParagraphElement>(null); // reference for the text container (if marquee is to be active, this is larger)

  const setStylesSequentially = useCallback(async () => {
    setTextStyle({
      transition: `none`,
      right: `${-difference}px`,
    });
    await delay(20); // a glitch occurs if this delay is too short, and as a result does not reset the styles properly
    // sets text style to ending position, which relies on <scrollTime> (calculated in checkWindowSize) and pauseTime, but does not require <difference>
    setTextStyle({
      transition: `${scrollTime}ms linear ${pauseTime}ms`,
      right: "0px",
    });
  }, [setTextStyle, difference, pauseTime, scrollTime]);

  const resetText = useCallback(() => {
    setTextStyle({
      transition: `none`,
      right: `${-difference}px`,
    });
  }, [setTextStyle, difference]);

  // is run when the window size is changed or the marquee element is triggered
  useEffect(
    function checkWindowSize() {
      if (marqueeRef.current && textRef.current) {
        //confirms both container and inner text exist
        const marqueeWidth = marqueeRef.current.offsetWidth; // variable for width of container (SMALLER or EQUAL)
        const textWidth = textRef.current.offsetWidth; // variable for width of text (LARGER or EQUAL)
        const diff = textWidth - marqueeWidth; // calculated value for distance required to be traveled by text
        setScrollTime(diff * 21 * (1 / scrollSpeed)); // pixelwidth * 21 is the ms for scrolling at timescale "1",
        setDifference(diff); // sets <difference> to be used in style setting functions
      }
    },
    [scrollSpeed, width, difference, trigger],
  );

  //
  useEffect(
    function setInitialStyle() {
      if (difference > 0) {
        return setTextStyle({
          transition: `none`,
          right: `${-difference}px`,
        });
      } else {
        return setTextStyle({
          transition: `none`,
          right: `0px`,
        });
      }
    },
    [scrollTime, pauseTime, width, difference],
  );

  useEffect(
    function initIntervalTime() {
      setIntervalTime(scrollTime + pauseTime * 2);
    },
    [scrollTime, pauseTime, difference, width],
  );

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(
    function loopSet() {
      let interval: ReturnType<typeof setInterval> | undefined;
      if (difference > 0) {
        if (trigger) {
          interval = setInterval(() => {
            setStylesSequentially();
          }, intervalTime);
          setStylesSequentially();
        }
        if (!trigger) {
          clearInterval(interval);
          resetText();
        }
      }
      return () => {
        clearInterval(interval);
      };
    },
    [
      difference,
      resetText,
      setStylesSequentially,
      trigger,
      intervalTime,
      pauseTime,
    ],
  );

  useEffect(() => {
    // sets 'width' variable to the size of the window, does nothing but triggers the container to check if its size potentially has changed
    const handleWindowSizeChange = () => {
      if (window) {
        setWidth(window.innerWidth);
      }
    };

    window?.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window?.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return (
    <div className={styles["marquee"]} ref={marqueeRef}>
      <p style={textStyle} className={styles["marquee__text"]} ref={textRef}>
        {textContent}
      </p>
    </div>
  );
}
