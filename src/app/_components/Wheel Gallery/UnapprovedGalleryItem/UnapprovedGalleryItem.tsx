"use client";

import React, { useState, useRef, useTransition } from "react";
import styles from "./UnapprovedGalleryItem.module.css";

import { wheelSizes, carTypes } from "@/app/constants";
import { createClient } from "@/app/supabase/auth/server";
import { setApproved } from "@/app/wheel-gallery/admin/actions";

interface imageData {
  approved: boolean;
  car_type: string;
  created_at: string;
  id: number;
  photo_url: string;
  submitted_by: string;
  wheel_brand: string;
  wheel_name: string;
  wheel_size: string;
}

interface UnapprovedGalleryItemProps {
  data: imageData;
}

export default function UnapprovedGalleryItem({
  data,
}: UnapprovedGalleryItemProps) {
  const [isPending, startTransition] = useTransition();

  const [editMode, setEditMode] = useState(false);
  const [carType, setCarType] = useState(data.car_type);
  const [wheelSize, setWheelSize] = useState(data.wheel_size + '"');
  const [wheelBrand, setWheelBrand] = useState(data.wheel_brand);
  const [wheelName, setWheelName] = useState(data.wheel_name);

  const initialValues = useRef({
    carType: data.car_type,
    wheelSize: data.wheel_size + '"',
    wheelBrand: data.wheel_brand,
    wheelName: data.wheel_name,
  });

  function handleRevertChanges() {
    setCarType(initialValues.current.carType);
    setWheelSize(initialValues.current.wheelSize);
    setWheelBrand(initialValues.current.wheelBrand);
    setWheelName(initialValues.current.wheelName);
  }

  async function updateImageColumn(
    id: number,
    columnName: string,
    newValue: any,
  ) {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("images")
      .update({ [columnName]: newValue })
      .eq("id", id);

    if (error) {
      console.error("Error updating image:", error.message);
      return null;
    }

    return data;
  }

  async function handleApprove() {
    startTransition(() => {
      setApproved(data.id)
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.error("Error in handleApprove: ", err);
        });
    });
  }

  return (
    <div className={styles["unapproved__item"]}>
      <div key={data.id} className={styles["gallery__item"]}>
        <div className={styles["gallery__item_frame"]}>
          <p className={styles["gallery__item_description_size"]}>
            {data.wheel_size}"
          </p>
        </div>
        <div
          style={{ backgroundImage: `url(${data.photo_url})` }}
          className={styles["gallery__item_photo"]}
        ></div>
        <div className={styles["gallery__item_description"]}>
          <p className={styles["gallery__item_description_name"]}>
            {data.wheel_brand} {data.wheel_name}
          </p>
          <p className={styles["gallery__item_description_user"]}>
            {data.submitted_by}'s {data.car_type}
          </p>
        </div>
      </div>
      {!editMode ? (
        <div className={styles["gallery__item_edit"]}>
          <button className={styles["gallery__item_edit_button"]}>
            delete
          </button>
          <button
            onClick={() => {
              setEditMode(true);
            }}
            className={styles["gallery__item_edit_button"]}
          >
            edit
          </button>
          <button
            onClick={() => {
              handleApprove();
            }}
            className={styles["gallery__item_edit_button"]}
          >
            {isPending ? "approving..." : "approve"}
          </button>
        </div>
      ) : null}
      {editMode ? (
        <form className={styles["edit__form"]}>
          <select
            onChange={(e) => {
              setCarType(e.target.value);
            }}
            value={carType}
            className={styles["edit__form_select"]}
          >
            {carTypes.map((car) => {
              return (
                <option key={car} value={car}>
                  {car}
                </option>
              );
            })}
          </select>
          <select
            onChange={(e) => {
              setWheelSize(e.target.value);
            }}
            value={wheelSize}
            className={styles["edit__form_select"]}
          >
            {wheelSizes.map((size) => {
              return (
                <option key={size} value={size}>
                  {size}
                </option>
              );
            })}
          </select>
          <input
            onChange={(e) => {
              setWheelBrand(e.target.value);
            }}
            value={wheelBrand}
            placeholder="wheel brand"
            className={styles["edit__form_input"]}
          ></input>
          <input
            onChange={(e) => {
              setWheelName(e.target.value);
            }}
            value={wheelName}
            placeholder="wheel name"
            className={styles["edit__form_input"]}
          ></input>
          <div className={styles["edit__form_buttons"]}>
            <button
              type="button"
              onClick={handleRevertChanges}
              className={styles["edit__form_button"]}
            >
              revert
            </button>
            <button onClick={() => {}} className={styles["edit__form_button"]}>
              confirm edits
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
}
