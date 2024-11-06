"use client";

import React, { useEffect, useState } from "react";
import styles from "./ReviewGallery.module.css";
import { fetchAllUnapprovedImages } from "@/app/supabase/storage/client";
import ReviewItem from "../ReviewItem/ReviewItem";

export default function ReviewGallery() {
  const [unapprovedImages, setUnapprovedImages] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState(false);

  useEffect(() => {
    fetchAllUnapprovedImages()
      .then((data) => {
        return setUnapprovedImages(data);
      }).then(()=>{
        console.log(unapprovedImages)
      })
      .catch((err) => {
        console.error(err);
      });
  }, [fetchTrigger]);

  function triggerRefetch () {
    setFetchTrigger((prev) => !prev);
  };

  return (
    <div className={styles["review-gallery"]}>
      {unapprovedImages.length > 0 ? (
        unapprovedImages.map((data, index) => (
          <ReviewItem triggerRefetch={triggerRefetch} data={data} key={index}></ReviewItem>
        ))
      ) : (
        <p className={styles["review-gallery__notice"]}>nothing to be reviewed</p>
      )}
    </div>
  );
}
