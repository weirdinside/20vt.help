import React, { useState, useRef, useEffect } from "react";
import styles from "./CompendiumContent.module.css";
import imageMapResize from "../../hooks/imageMapResize";

interface MapArea {
  name: string;
  coords: string;
  shape: string;
  caption: string;
}

interface CompendiumImageMapProps {
  mapName: string;
  imageSrc: string;
  imageMap: MapArea[];
  clickSetting: boolean;
  handleClickCheckbox: () => void;
  renderAs?: "html" | "svg";
}

function CompendiumImageMap({
  mapName,
  imageSrc,
  imageMap,
  clickSetting,
  handleClickCheckbox,
  renderAs = "html",
}: CompendiumImageMapProps) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const mapInHTML = useRef<HTMLMapElement>(null);
  const imageInHTML = useRef<HTMLImageElement>(null);

  const [mapDrawn, setMapState] = useState(false);
  const [caption, changeCaption] = useState("");
  const [clickedText, setClickedText] = useState("");
  const [clickedTextClasses, setClickedTextClasses] = useState(
    styles["part__numbers_copied"]
  );

  let ctx: CanvasRenderingContext2D | null = null;

  function drawArea(area: HTMLAreaElement) {
    const img = imageInHTML.current;
    const canvasEl = canvas.current;
    if (!img || !canvasEl || !ctx) return;

    const xScale = img.width / canvasEl.width;
    const yScale = img.height / canvasEl.height;

    const temp = typeof area.coords === "string" ? area.coords.split(",") : [];

    const pairedCoords: [string, string][] = [];
    for (let i = 0; i < temp.length; i += 2) {
      pairedCoords.push([temp[i], temp[i + 1]]);
    }

    for (let i = 0; i < pairedCoords.length; i++) {
      const x = parseInt(pairedCoords[i][0]) / xScale;
      const y = parseInt(pairedCoords[i][1]) / yScale;

      if (i === 0) {
        ctx.fillStyle = "#b94646";
        ctx.beginPath();
        ctx.moveTo(x, y);
      } else if (i < pairedCoords.length - 1) {
        ctx.lineTo(x, y);
      } else {
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.fill();
      }
    }
  }

  function drawAll() {
    if (!mapDrawn && mapInHTML.current) {
      Array.from(mapInHTML.current.areas).forEach((area) => {
        drawArea(area as HTMLAreaElement);
      });
      setMapState(true);
    }
  }

  function findElementById(area: MapArea): HTMLAreaElement | undefined {
    return Array.from(mapInHTML.current?.areas || []).find(
      (element) => (element as HTMLAreaElement).id === area.name
    ) as HTMLAreaElement | undefined;
  }

  function handleHoverOver(area: MapArea) {
    const matchedArea = findElementById(area);
    if (matchedArea) {
      changeCaption(matchedArea.alt);
      if (ctx) ctx.reset();
      drawArea(matchedArea);
    }
  }

  function handleHoverAway() {
    checkClickSetting();
    setMapState(false);
    if (ctx) ctx.reset();
    drawAll();
  }

  function handleObjectClick(area: MapArea) {
    const matchedArea = findElementById(area);
    if (!matchedArea) return;

    setClickedTextClasses(
      `${styles["part__numbers_copied"]} ${styles["active"]}`
    );

    setTimeout(() => {
      setClickedTextClasses(styles["part__numbers_copied"]);
    }, 2000);

    const partNumber = matchedArea.alt.substring(
      0,
      matchedArea.alt.indexOf("-")
    );

    if (clickSetting) {
      setTimeout(() => {
        window.open(
          `https://google.com/search?q=${partNumber}`,
          "_blank",
          "noopener"
        );
        window.focus();
      }, 1500);
    } else {
      navigator.clipboard.writeText(partNumber);
    }
  }

  function checkClickSetting() {
    if (clickSetting) {
      changeCaption("click on an item to search for the part #");
      setClickedText("opened a new tab with search for the part");
    } else {
      changeCaption("click on an item to copy the part #");
      setClickedText("part number copied to clipboard");
    }
  }

  useEffect(() => {
    checkClickSetting();
  }, [clickSetting]);

  imageMapResize();

  useEffect(() => {
    ctx = canvas.current!.getContext("2d");

    const handleImageLoad = () => {
      setTimeout(() => {
        drawAll();
      }, 0); // small delay to wait for imageMapResize. i don't know why this is necessary
    };

    const img = imageInHTML.current;

    if (img?.complete) {
      handleImageLoad();
    } else {
      img?.addEventListener("load", handleImageLoad);
    }

    return () => {
      img?.removeEventListener("load", handleImageLoad);
    };
  }, []);

  function translateMap() {
    return (
      <map ref={mapInHTML} id={mapName} name={mapName}>
        {imageMap.map((area) => (
          <area
            key={area.name}
            id={area.name}
            alt={area.caption}
            coords={area.coords}
            shape={area.shape}
            className={styles["cursor_hover"]}
            onMouseOver={() => handleHoverOver(area)}
            onMouseLeave={handleHoverAway}
            onClick={() => handleObjectClick(area)}
          />
        ))}
      </map>
    );
  }

  return (
    <div className={styles["part__numbers"]}>
      <div className={clickedTextClasses}>
        <p>{clickedText}</p>
      </div>
      <div className={styles["part__numbers_heading"]}>
        part numbers
        <div className={styles["part__numbers_setting"]}>
          <p className={styles["settings__switch-heading"]}>
            automatically search part number on click
          </p>
          <label className={styles["settings__switch"]}>
            <input
              style={{ height: "0", width: "0" }}
              id="click-through-for-search"
              type="checkbox"
              checked={clickSetting}
              onChange={handleClickCheckbox}
            />
            <span className={styles["slider"]}></span>
          </label>
        </div>
      </div>
      <div
        className={styles["part__numbers_image-container"]}
        id="image-container"
      >
        <img
          draggable="false"
          ref={imageInHTML}
          className={styles["part__numbers_image"]}
          src={imageSrc}
          useMap={`#${mapName}`}
        />
        <canvas ref={canvas} className={styles["part__numbers_image-canvas"]} />
        {renderAs === "html" && translateMap()}
        {/* ffy: renderAs === "svg" && renderSVGMap() */}
      </div>

      <p className={styles["part__numbers_caption"]}>{caption}</p>
    </div>
  );
}

export default CompendiumImageMap;
