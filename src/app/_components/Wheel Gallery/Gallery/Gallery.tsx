"use client";

import React, { useEffect, useState, useRef } from "react";
import styles from "./Gallery.module.css";
import ClickableGalleryItem from "../ClickableGalleryItem/ClickableGalleryItem";

export default function Gallery({ handleImageClick, data }) {

  return (
      <div className={styles["gallery"]}>
        {data.map((image, index) => {
          return <ClickableGalleryItem handleImageClick={handleImageClick} key={index} imageInfo={image}></ClickableGalleryItem>;
        })}
      </div>
  );
}
