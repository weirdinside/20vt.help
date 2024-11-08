"use client";
import React, { useState, useEffect, useCallback, useTransition } from "react";
import Link from "next/link";
import styles from "./WheelGallery.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import Gallery from "../_components/Wheel Gallery/Gallery/Gallery";

import { filterElements, getUniqueElements } from "./actions";

import SubmitModal from "../_components/Wheel Gallery/SubmitModal/SubmitModal";

import CheckboxSection from "../_components/Wheel Gallery/CheckboxSection/CheckboxSection";
import { debounce } from "../utils";
import { fetchAllApprovedImages } from "../supabase/storage/client";
import PreviewModal from "../_components/Wheel Gallery/PreviewModal/PreviewModal";

// wheelBrands needs to be generated by a GET request from the server.
// if table category for brand has 2 or more items listed below it, it should be added to array.

interface Options {
  wheel_size: number[];
  wheel_brand: string[];
  car_type: string[];
}

export default function WheelGallery() {
  // ---------------------------------------- //
  //            VARIABLE DECLARATION          //
  // ---------------------------------------- //
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeModal, setActiveModal] = useState("");
  const [images, setImages] = useState<object[]>([]);
  const [clickedPhotoData, setClickedPhotoData] = useState({});

  const [wheelBrands, setWheelBrands] = useState([]);
  const [wheelSizes, setWheelSizes] = useState([]);
  const [carTypes, setCarTypes] = useState([]);
  const [triggerRender, retriggerRender] = useState(false);

  const [waitingForImages, setLoading] = useTransition();

  const fullOptions = {
    car_type: carTypes,
    wheel_size: wheelSizes,
    wheel_brand: wheelBrands,
  };

  const [checkedOptions, setCheckedOptions] = useState<Options>({
    car_type: [],
    wheel_size: [],
    wheel_brand: [],
  });

  // ---------------------------------------- //
  //               EVENT HANDLERS             //
  // ---------------------------------------- //

  function handleImageClick(imageData) {
    setClickedPhotoData(imageData);
    setActiveModal("preview");
  }

  const closeModal = useCallback(() => {
    setActiveModal("");
  }, []);

  const copyUrl = useCallback(() => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => alert("URL copied to clipboard!"))
      .catch((err) => console.error("Failed to copy:", err));
  }, []);

  function clearOptions() {
    setCheckedOptions({ car_type: [], wheel_size: [], wheel_brand: [] });
  }

  async function toggleOption(category: keyof Options, value: string) {
    setCheckedOptions((previousOptions) => {
      const categoryOptions = previousOptions[category];
      const updatedCategoryOptions = categoryOptions.includes(value)
        ? categoryOptions.filter((option) => option !== value)
        : [...categoryOptions, value];
      return {
        ...previousOptions,
        [category]: updatedCategoryOptions,
      };
    });
  }

  // ---------------------------------------- //
  //                   HOOKS                  //
  // ---------------------------------------- //

  useEffect(
    function setQueryOnChange() {
      setLoading(() => {
        const queryParameters = Object.entries(checkedOptions)
          .map(([category, values]) => {
            const queryString = values.join(",");
            return values.length > 0 ? `${category}=${queryString}` : "";
          })
          .filter(Boolean)
          .join("&");
        router.push(`?${queryParameters}`);
        filterElements(checkedOptions).then((data) => {
          return setImages(data);
        });
      });
    },
    [checkedOptions],
  );

  useEffect(function readQueryOnLoad() {
    const parsedOptions: Options = {
      car_type: [],
      wheel_size: [],
      wheel_brand: [],
    };
    searchParams.forEach((value, key) => {
      const valuesArray = value.split(",").filter(Boolean);
      if (key in parsedOptions) {
        parsedOptions[key as keyof Options] = valuesArray;
      }
    });
    setCheckedOptions(parsedOptions);
  }, []);

  useEffect(() => {
    getUniqueElements("wheel_size").then((res) => {
      setWheelSizes(res);
      retriggerRender(!triggerRender);
    });
    getUniqueElements("wheel_brand").then((res) => {
      setWheelBrands(res);
      retriggerRender(!triggerRender);
    });
    getUniqueElements("car_type").then((res) => {
      setCarTypes(res);
      retriggerRender(!triggerRender);
    });
  }, [checkedOptions]);

  // ---------------------------------------- //
  //             COMPONENT RETURN             //
  // ---------------------------------------- //

  return (
    <div className={styles["page"]}>
      <header className={styles["header"]}>
        <h1 className={styles["header__title"]}>wheel gallery.</h1>
        <div
          onClick={() => {
            setActiveModal("submit");
          }}
          className={styles["header__submit-modal-trigger"]}
          id="submit-modal-trigger"
        >
          submit a wheel
        </div>
        <Link className={styles["header__logo"]} href="/">
          <div className={styles["logo__big-rhombus"]} id="big-rhombus"></div>
          <div
            className={styles["logo__small-rhombus-1"]}
            id="small-rhombus-1"
          ></div>
          <div
            className={styles["logo__small-rhombus-2"]}
            id="small-rhombus-2"
          ></div>
          <p className={styles["header__back"]}>back to 20vt.help</p>
        </Link>
      </header>
      <main className={styles["main"]}>
        <section className={styles["wheelfinder"]}>
          <form className={styles["wheelfinder__selector"]}>
            {Object.keys(fullOptions).map((category, index) => {
              return (
                <CheckboxSection
                  key={index}
                  arrayName={String(category)}
                  checkedOptions={checkedOptions}
                  toggleOption={toggleOption}
                  optionsArray={fullOptions[category as keyof Options]}
                ></CheckboxSection>
              );
            })}
          </form>
          <div className={styles["wheelfinder__button_section"]}>
            <button
              type="reset"
              className={styles["wheelfinder__button"]}
              id="wheelfinder-clear"
              onClick={clearOptions}
            >
              reset selection
            </button>
            <button onClick={copyUrl} className={styles["wheelfinder__button"]}>
              share results
            </button>
          </div>
        </section>
        <Gallery handleImageClick={handleImageClick} data={images}></Gallery>
      </main>
      <footer className={styles["footer"]}>
        <p className={styles["footer__credits"]} id="site-credits-button">
          site credits_
        </p>
        <Link
          className={styles["footer__credits"]}
          href="/"
          id="back-home-button"
        >
          back to 20vt.help_
        </Link>
      </footer>
      <SubmitModal
        activeModal={activeModal}
        closeModal={closeModal}
      ></SubmitModal>
      <PreviewModal
        activeModal={activeModal}
        closeModal={closeModal}
        data={clickedPhotoData}
      ></PreviewModal>
    </div>
  );
}
