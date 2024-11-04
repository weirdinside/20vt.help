"use client";

import React, { useEffect, useState } from "react";
import styles from "./Gallery.module.css";
import GalleryItem from "../GalleryItem/GalleryItem";

import { fetchAllImages } from "@/app/supabase/storage/client";

export default function Gallery() {
  const [images, setImages] = useState<object[]>([]);

  useEffect(() => {
    fetchAllImages().then((data) => {
      setImages(data);
    });
  }, []);

  return (
    <div className={styles["gallery"]}>
      {images.map((image) => {
        return <GalleryItem imageInfo={image}></GalleryItem>;
      })}
    </div>
  );
}
