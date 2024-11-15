"use client";
import React, { useState, useEffect } from "react";
import styles from "./ImageStack.module.css";
import GalleryItem from "../GalleryItem/GalleryItem";

import { fetchAllApprovedImages } from "@/app/supabase/storage/client";
import { getRandomInt } from "@/app/utils";

export default function ImageStack() {
  const [images, setImages] = useState<ImageInfo[]>([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    fetchAllApprovedImages().then((res) => {
      if(res){
        setImages(res);
      }
    });
  }, []);

  useEffect(() => {
    setStartIndex(getRandomInt(images.length - 7));
  }, [images]);

  return (
    <div className={styles["login__photo-stack"]}>
      {images.slice(startIndex, startIndex + 5).map((image, index) => {
        return (
          <div
            style={{ rotate: `${getRandomInt(8) - 4}deg` }}
            key={index}
            className={styles["photo-stack__item"]}
          >
            <GalleryItem imageInfo={image}></GalleryItem>
          </div>
        );
      })}
    </div>
  );
}
