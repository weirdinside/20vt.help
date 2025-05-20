import React from "react";
import styles from "../CompendiumArticle.module.css";
import { useRef, useEffect } from 'react'

function FigureListItem({ handlePictureClick, figureNum, imageSrc, caption }) {
  // let figureWidth = '';
  // let captionWidth = '';
  let translationAmount = '';

  const captionRef = useRef();
  const parentRef = useRef();
  
  // useEffect(()=>{

  //   window.addEventListener('resize', ()=>{
  //     figureWidth = parentRef.current.offsetWidth;
  //     captionWidth = captionRef.current.offsetWidth;
  //     if((captionWidth - figureWidth) > 0){
  //       translationAmount = Math.round(((captionWidth - figureWidth) / captionWidth) * 100);
  //       console.log(translationAmount)
  //     }
  //   })

  //   return (
  //     window.removeEventListener('resize', ()=>{
  //     })
  //   )
  // },[captionRef]);

  return (
    <div className={styles["information__figure"]}>
      <p className={styles["figure__num"]}>{figureNum}</p>
      <img ref={parentRef} onClick={()=>{handlePictureClick({imageSrc, caption})}} alt={caption} className={styles["figure__image"]} src={imageSrc} />
      <p style={{translate: `-${translationAmount}%`}} ref={captionRef} className={styles["figure__caption"]}>{caption}</p>
    </div>
  );
}

export default FigureListItem;
