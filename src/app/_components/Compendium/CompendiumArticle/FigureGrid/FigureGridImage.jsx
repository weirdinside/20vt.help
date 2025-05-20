import React from "react";
import styles from "../../CompendiumContent.module.css"

function FigureGridImage({handlePictureClick, imageSrc, numFig, caption}) {
  return (
    <div className={styles["figure__grid_image-container"]}>
      <p className={styles["figure__grid_image-num"]}>{`fig. ${numFig}`}</p>
      <img
        onClick={()=>{handlePictureClick({imageSrc, caption})}}
        src={imageSrc}
        alt="figure image"
        className={styles["figure__grid_image"]}
      ></img>
      <p className={styles['figure__grid_image-name']}>{`${caption}`}</p>
    </div>
  );
}
export default FigureGridImage;