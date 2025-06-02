"use client";

import { useRef } from "react";
import styles from "../../CompendiumContent.module.css";

export default function InformationImage({
  caption,
  handlePictureClick,
  figureNum,
  imageSrc,
}: {
  caption: string;
  figureNum: string;
  handlePictureClick: ({
    imageSrc,
    caption,
  }: {
    imageSrc: string;
    caption: string;
  }) => void;
  imageSrc: string;
}) {
  const captionRef = useRef(null);
  const parentRef = useRef(null);
  return (
    <div className={styles["information__image"]}>
      <p className={styles["information__image_figure-num"]}>
        fig. {figureNum}
      </p>
      <img
        ref={parentRef}
        onClick={() => {
          handlePictureClick({ imageSrc, caption });
        }}
        alt={caption}
        className={styles["information__image_img"]}
        src={imageSrc}
      />
      <p ref={captionRef} className={styles["information__image_caption"]}>
        {caption}
      </p>
    </div>
  );
}
