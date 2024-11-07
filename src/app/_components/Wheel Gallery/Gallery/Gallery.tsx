"use client";

import React, { useEffect, useState, useRef } from "react";
import styles from "./Gallery.module.css";
import GalleryItem from "../GalleryItem/GalleryItem";

export default function Gallery({ data }) {

  return (
      <div className={styles["gallery"]}>
        {data.map((image, index) => {
          return <GalleryItem key={index} imageInfo={image}></GalleryItem>;
        })}
      </div>
  );
}
