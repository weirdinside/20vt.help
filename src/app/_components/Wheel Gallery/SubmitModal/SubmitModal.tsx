"use client";

import { ChangeEvent, useState, useRef, useTransition } from "react";
import { uploadImage } from "@/app/supabase/storage/client";
import { convertBlobUrlToFile } from "@/app/utils";
import styles from "./SubmitModal.module.css";
import SLogo from "@/app/_components/Homepage/SLogo/SLogo";
import { getRandomInt } from "@/app/utils";
import Marquee from "../../_general/Marquee/Marquee";
import { createSupabaseClient } from "@/app/supabase/client";

export default function SubmitModal({ activeModal, closeModal }) {

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [wheelSize, setWheelSize] = useState("");
  const [carType, setCarType] = useState("");
  const [wheelBrand, setWheelBrand] = useState("");
  const [wheelName, setWheelName] = useState("");
  const [username, setUsername] = useState("");

  function isFormValid(){
    if (!wheelSize || !carType || !wheelBrand || !wheelName || !username || imageUrls.length === 0) {
      return false;
    }
    return true; 
  };

  function handleChangeSize(e: ChangeEvent<HTMLSelectElement>) {
    setWheelSize(e.target.value);
  }

  function handleSelectCar(e: ChangeEvent<HTMLSelectElement>) {
    setCarType(e.target.value);
  }

  function handleChangeBrand(e: ChangeEvent<HTMLInputElement>) {
    setWheelBrand(e.target.value);
  }

  function handleChangeWheelName(e: ChangeEvent<HTMLInputElement>) {
    setWheelName(e.target.value);
  }

  function handleChangeUsername(e: ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  function clearAllFields() {
    setWheelSize("");
    setCarType("");
    setWheelBrand("");
    setWheelName("");
    setUsername("");
    imageInputRef.current.value = null;
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImageUrls([]);
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newImageUrls = filesArray.map((file) => URL.createObjectURL(file));
      setImageUrls(newImageUrls);
    }
  };

  const [imageSubmitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleClickUploadImagesButton = async () => {
    if(!isFormValid){
      return;
    }
    startTransition(async () => {
      try {
        let urls = [];
        for (const url of imageUrls) {
          const imageFile = await convertBlobUrlToFile(url);
          const { imageUrl, error } = await uploadImage({
            file: imageFile,
            bucket: "submitted-images",
          });
          if (error) {
            console.error("Upload error:", error);
            return;
          }
          urls.push(imageUrl);
        }

        const convertedWheelSize = Number(wheelSize.replace('"', ""));
        console.log("Converted wheel size:", convertedWheelSize);

        const rowsToInsert = urls.map((imageUrl) => ({
          photo_url: imageUrl,
          wheel_brand: wheelBrand,
          wheel_size: convertedWheelSize,
          wheel_name: wheelName,
          submitted_by: username,
          car_type: carType,
          approved: false,
        }));

        const supabase = createSupabaseClient();
        const { data, error: insertError } = await supabase
          .from("images")
          .insert(rowsToInsert);

        if (insertError) {
          console.error("Insert error:", insertError);
          return;
        }
        console.log("Inserted image data:", data);
        console.log("Image URLs:", urls);
        clearAllFields();
        setSubmitted(true);
      } catch (error) {
        console.error(
          "Unexpected error in handleClickUploadImagesButton:",
          error,
        );
      }
    });
  };

  return (
    <div
      onClick={(e)=>{
        e.stopPropagation();
        if(e.target.classList.contains(styles['modal'])){
          closeModal();
        }
      }}
      className={`${styles["modal"]} ${
        activeModal === "submit" ? styles["active"] : null
      }`}
    >
      <div className={styles["submit"]}>
        <h1 className={styles["submit__heading"]}>
          submit a photo
          <div onClick={closeModal} className={styles["submit__heading_logo"]}>
            <SLogo color="white" inElement="landing" />
          </div>
        </h1>
        {!imageSubmitted ? (
          <form className={styles["submit__form"]}>
            <label className={styles["submit__label"]}>
              what kind of car?*
              <select
                required
                onChange={handleSelectCar}
                value={carType}
                className={styles["submit__input"]}
              >
                <option
                  className={styles["submit__input_option_placeholder"]}
                  value=""
                  disabled
                >
                  select a car...
                </option>
                <option
                  className={styles["submit__input_option"]}
                  value="UrS4 sedan"
                >
                  UrS4 sedan
                </option>
                <option
                  className={styles["submit__input_option"]}
                  value="UrS4 avant"
                >
                  UrS4 avant
                </option>
                <option
                  className={styles["submit__input_option"]}
                  value="UrS6 sedan"
                >
                  UrS6 sedan
                </option>
                <option
                  className={styles["submit__input_option"]}
                  value="UrS6 avant"
                >
                  UrS6 avant
                </option>
                <option
                  className={styles["submit__input_option"]}
                  value="T44 sedan"
                >
                  T44 sedan
                </option>
                <option
                  className={styles["submit__input_option"]}
                  value="T44 avant"
                >
                  T44 avant
                </option>
                <option
                  className={styles["submit__input_option"]}
                  value="B3/B4 coupe"
                >
                  B3/B4 coupe
                </option>
                <option
                  className={styles["submit__input_option"]}
                  value="B3/B4 sedan"
                >
                  B3/B4 sedan
                </option>
                <option
                  className={styles["submit__input_option"]}
                  value="B3/B4 avant"
                >
                  B3/B4 avant
                </option>
              </select>
            </label>
            <label className={styles["submit__label"]}>
              what size of wheel?*
              <select
                required
                onChange={handleChangeSize}
                value={wheelSize}
                className={styles["submit__input"]}
              >
                <option
                  disabled
                  value=""
                  className={styles["submit__input_option_placeholder"]}
                >
                  select a size...
                </option>
                <option value='15"' className={styles["submit__input_option"]}>
                  15"
                </option>
                <option value='16"' className={styles["submit__input_option"]}>
                  16"
                </option>
                <option value='17"' className={styles["submit__input_option"]}>
                  17"
                </option>
                <option value='18"' className={styles["submit__input_option"]}>
                  18"
                </option>
                <option value='19"' className={styles["submit__input_option"]}>
                  19"
                </option>
                <option value='20"' className={styles["submit__input_option"]}>
                  20"
                </option>
              </select>
            </label>
            <label className={styles["submit__label"]}>
              wheel brand?*
              <input
                onChange={handleChangeBrand}
                value={wheelBrand}
                className={styles["submit__input"]}
                placeholder="BBS"
                required
                type="text"
              ></input>
            </label>
            <label className={styles["submit__label"]}>
              wheel name?*
              <input
                onChange={handleChangeWheelName}
                value={wheelName}
                className={styles["submit__input"]}
                placeholder="CH-R"
                required
                type="text"
              ></input>
            </label>
            <label className={styles["submit__label"]}>
              name/username*
              <input
                onChange={handleChangeUsername}
                value={username}
                className={styles["submit__input"]}
                placeholder="ani / @95urs6"
                required
                type="text"
              ></input>
            </label>
            <label className={styles["submit__label"]}>
              upload photo(s)*
              <input
                ref={imageInputRef}
                onChange={(e)=>{
                  handleImageChange(e);
                }}
                className={styles["submit__input_file"]}
                required
                multiple
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/heic"
              ></input>
            </label>
            <div style={imageUrls.length > 0 ? { minHeight: "200px"}: {}} className={styles["submit__post_photo-list"]}>
              {imageUrls.map((image) => {
                return (
                  <div
                    key={imageUrls[imageUrls.indexOf(image)]}
                    className={styles["submit__post_photo"]}
                    style={{ rotate: `${getRandomInt(5)}deg` }}
                  >
                    <div
                      style={{ backgroundImage: `url(${image})` }}
                      className={styles["submit__post_photo_image"]}
                    ></div>
                    <p
                      className={styles["submit__post_photo_image-description"]}
                    ></p>
                  </div>
                );
              })}
            </div>
            <div className={styles["submit__button_container"]}>
              <button
              type='button'
                className={styles["submit__button-i"]}
                onClick={() => {
                  clearAllFields();
                  setImageUrls([]);
                }}
              >
                reset form
              </button>
              <button
                style={!isFormValid() ? {opacity: 0.7, pointerEvents: 'none'} : {}}
                type="button"
                className={styles["submit__button"]}
                onClick={handleClickUploadImagesButton}
                disabled={!isFormValid()}
              >
                {isPending ? "submitting..." : "submit"}
              </button>
            </div>
          </form>
        ) : (
          <div>
            <p className={styles["submit__post_text"]}>
              thanks for your contribution!
            </p>
   

            <div style={imageUrls.length > 0 ? { minHeight: "200px"}: {}} className={styles["submit__post_photo-list"]}>
              {imageUrls.map((image) => {
                return (
                  <div
                    key={imageUrls[imageUrls.indexOf(image)]}
                    className={styles["submit__post_photo"]}
                    style={{ rotate: `${getRandomInt(5)}deg` }}
                  >
                    <div
                      style={{ backgroundImage: `url(${image})` }}
                      className={styles["submit__post_photo_image"]}
                    ></div>
                    <p
                      className={styles["submit__post_photo_image-description"]}
                    ></p>
                  </div>
                );
              })}
            </div>
            <div className={styles["submit__button_container"]}>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setImageUrls([]);
                }}
                className={styles["submit__button-i"]}
              >
                submit another image
              </button>

              <button
                onClick={() => {
                  closeModal();
                  clearAllFields();
                  setImageUrls([]);
                  setTimeout(() => {
                    setSubmitted(false);
                  }, 100);
                }}
                className={styles["submit__button"]}
              >
                browse gallery
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
