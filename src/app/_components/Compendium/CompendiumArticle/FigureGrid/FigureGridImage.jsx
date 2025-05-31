import React from "react";
import styles from "../../CompendiumContent.module.css";
import Image from "next/image";

function FigureGridImage({ handlePictureClick, imageSrc, numFig, caption }) {
  return (
    <div className={styles["figure__grid_image-container"]}>
      <p className={styles["figure__grid_image-num"]}>{`fig. ${numFig}`}</p>
      <Image
        onClick={() => {
          handlePictureClick({ imageSrc, caption });
        }}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
        src={imageSrc}
        alt="figure image"
        className={styles["figure__grid_image"]}

        loading="eager"
        decoding="sync"
        placeholder="blur"
        blurDataURL={imageSrc}
      />
      {/* <img
        onClick={()=>{handlePictureClick({imageSrc, caption})}}
        src={imageSrc}
        alt="figure image"
        className={styles["figure__grid_image"]}
      ></img> */}
      <p className={styles["figure__grid_image-name"]}>{`${caption}`}</p>
    </div>
  );
}
export default FigureGridImage;
