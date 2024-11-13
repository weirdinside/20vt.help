"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";

// css
import styles from "./WheelGallery.module.css";

// actions
import { paginatedFetch, getUniqueElements } from "./actions";

// components
import Gallery from "../_components/Wheel Gallery/Gallery/Gallery";
import CheckboxSection from "../_components/Wheel Gallery/CheckboxSection/CheckboxSection";
// components -> modals
import SubmitModal from "../_components/Wheel Gallery/SubmitModal/SubmitModal";
import PreviewModal from "../_components/Wheel Gallery/PreviewModal/PreviewModal";

function WheelGalleryContent() {
  // ---------------------------------------- //
  //            VARIABLE DECLARATION          //
  // ---------------------------------------- //

  const router = useRouter();
  const galleryRef = useRef<HTMLDivElement>(null);

  // for handling the checkbox states

  // ___ holds the possible items for each column, so no single query yields zero results
  const [possibleFilters, setPossibleFilters] = useState<FilterOptions>({
    car_type: [],
    subtype: [],
    wheel_size: [],
    wheel_brand: [],
  });

  // ____ holds all checekd options
  const [checkedFilters, setCheckedFilters] = useState<FilterOptions>({
    car_type: [],
    subtype: [],
    wheel_size: [],
    wheel_brand: [],
  });
  const [subtypeFilters, setSTF] = useState<string[]>([]);

  // for handling the gallery state
  const [currentPage, setPage] = useState(0);
  const [images, setImages] = useState<ImageInfo[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [fetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [readComplete, setReadComplete] = useState(false);

  // for handling modal state
  const [activeModal, setActiveModal] = useState<string>("");
  const [clickedPhotoData, setClickedPhotoData] = useState<ImageInfo>({
    approved: true,
    wheel_size: 15,
    id: 0,
    subtype: "",
    photo_url: "",
    wheel_brand: "",
    wheel_name: "",
    submitted_by: "",
    car_type: "",
  });

  // ---------------------------------------- //
  //               EVENT HANDLERS             //
  // ---------------------------------------- //

  // on image click, pass image data to the preview modal and open it
  function handleImageClick(imageData: ImageInfo) {
    setClickedPhotoData(imageData);
    setActiveModal("preview");
  }

  // checks conditions for subtypes to be active. logic is as follows:
  // if C3 sedan/avant are active, display '10v' and '20v' in the subtypes when available
  // if C4 sedan/avant are active, display 'S4' and 'S6' in the subtypes when available
  const updateSubtypeOptions = useCallback(
    (car_typeFilters: string[]) => {
      const chassisC4 = ["C4 sedan", "C4 avant"];
      const chassisC3 = ["C3 sedan", "C3 avant"];
      const subtypesC4 = ["S4", "S6"];
      const subtypesC3 = ["10v", "20v"];

      if (car_typeFilters.some((item) => chassisC3.includes(item))) {
        if (car_typeFilters.some((item) => chassisC4.includes(item))) {
          return possibleFilters.subtype;
        } else {
          return possibleFilters.subtype?.filter((item) =>
            subtypesC3.includes(item),
          );
        }
      } else if (car_typeFilters.some((item) => chassisC4.includes(item))) {
        return possibleFilters.subtype?.filter((item) =>
          subtypesC4.includes(item),
        );
      } else {
        return [];
      }
    },
    [possibleFilters],
  );

  // requests more images from the database
  // this function is called by onScroll
  const loadMoreData = useCallback(async () => {
    if (fetchingMore) {
      return;
    } // prevents code from rerunning if loadMoreData is already running. prevents stacking
    setIsFetchingMore(true);
    paginatedFetch({
      filters: checkedFilters,
      numItems: 25,
      page: currentPage + 1,
    })
      .then((data) => {
        if (data) {
          if (data.length > 0) {
            setPage((prevPage) => prevPage + 1);
          }
          if (data.length <= 25) {
            setHasMore(false);
          } else if (data.length > 25) {
            setHasMore(true);
          }
          console.log("images set,", data, fetchingMore, currentPage);
          return setImages((prevImages) => [
            ...prevImages,
            ...data?.slice(0, 25),
          ]);
        }
      })
      .catch((error) => {
        console.error(`Error loading more data: ${error}`);
      })
      .finally(() => {
        console.log("data loaded");
        setIsFetchingMore(false);
      });
  }, [checkedFilters, currentPage, fetchingMore]);

  //
  const onScroll = useCallback(async () => {
    const gallery = galleryRef.current;

    if (isFetching) return;
    if (
      gallery!.scrollTop + gallery!.offsetHeight >= gallery!.scrollHeight &&
      !isFetching
    ) {
      if (!hasMore) {
        return console.log("no more images to load");
      }
      await loadMoreData();
      return;
    }
  }, [hasMore, isFetching, loadMoreData]);

  // pathing for this function is as follows:
  // it references checkedFilters which is at the top level (here)
  // it is passed through CheckboxSection to FilterCheckbox, where
  // it gets executed by toggling an option from the possible items.
  // the possible items come in from the useEffect with fetchPossibleFilters
  async function toggleOption(
    category: keyof FilterOptions,
    value: string | number,
  ) {
    setCheckedFilters((prevFilters) => {
      // deals with subtyping
      if (category === "car_type") {
        const stringValue = String(value);
        const updatedCarTypes = prevFilters.car_type.includes(stringValue)
          ? prevFilters.car_type.filter((option) => option !== stringValue)
          : [...prevFilters.car_type, stringValue];

        const subtypeOptions = updateSubtypeOptions(updatedCarTypes);
        return {
          ...prevFilters,
          car_type: updatedCarTypes,
          subtype: prevFilters.subtype.filter((item) =>
            subtypeOptions.includes(item),
          ),
        };
      }

      // separate due to number value
      if (category === "wheel_size") {
        const numValue = Number(value);
        const updatedWheelSizes = prevFilters.wheel_size.includes(numValue)
          ? prevFilters.wheel_size.filter((option) => option !== numValue)
          : [...prevFilters.wheel_size, numValue];

        return {
          ...prevFilters,
          wheel_size: updatedWheelSizes,
        };
      }

      const stringValue = String(value);
      const categoryOptions = prevFilters[category] as string[];
      const updatedOptions = categoryOptions.includes(stringValue)
        ? categoryOptions.filter((option) => option !== stringValue)
        : [...categoryOptions, stringValue];

      return {
        ...prevFilters,
        [category]: updatedOptions,
      };
    });
  }

  // controls modal close, passed to modals/popups
  const closeModal = useCallback(() => {
    setActiveModal("");
  }, []);

  // passed to previewModal, possibly could live in that component
  const copyUrl = useCallback(() => {
    if (window) {
      const url = window.location.href;
      navigator.clipboard
        .writeText(url)
        .then(() => alert("URL copied to clipboard!"))
        .catch((err) => console.error("Failed to copy:", err));
    }
  }, []);

  // clears checkedFilters
  function clearOptions() {
    setPage(0);
    setCheckedFilters({
      car_type: [],
      wheel_size: [],
      wheel_brand: [],
      subtype: [],
    });
  }

  // checks which subtypes are possible and sets them
  // the reason the subtypes show based on this array and not a CSS
  // visibility property is due to the way CheckboxSection is styled
  const setSubtypeExclusion = useCallback(() => {
    setSTF(updateSubtypeOptions(checkedFilters.car_type));
  }, [checkedFilters.car_type, updateSubtypeOptions]);

  // ---------------------------------------- //
  //                   HOOKS                  //
  // ---------------------------------------- //

  // when the document loads, gallery has a listener that calls onScroll
  // (this is intended to trigger loadMoreImages in turn)
  useEffect(
    function setScrollListener() {
      const gallery = galleryRef.current;
      gallery!.addEventListener("scroll", onScroll);
      return () => {
        gallery!.removeEventListener("scroll", onScroll);
      };
    },
    [onScroll, galleryRef], // this is a dependencies array. when these changes, the hook is rerun
  );

  // checks active subtypes for cars on load and when filters are changed
  useEffect(() => {
    if (checkedFilters && possibleFilters) {
      setSubtypeExclusion();
    }
    console.log('setSubtypeExclusion')
  }, [setSubtypeExclusion, checkedFilters, possibleFilters]);

  // reads query from URL on load and sets filters on page to its values
  const searchParams = useSearchParams();
  const searchParamsRef = useRef(searchParams);

  useEffect(
    function readQueryOnLoad() {
      const params = searchParamsRef.current;
      const parsedOptions: FilterOptions = {
        car_type: [],
        wheel_size: [],
        wheel_brand: [],
        subtype: [],
      };

      params.forEach((value, key) => {
        const valuesArray = value.split(",").filter(Boolean);

        if (key in parsedOptions) {
          const category = key as keyof FilterOptions;
          if (category === "wheel_size") {
            parsedOptions[category] = valuesArray.map((size) => parseInt(size));
          } else if (
            category === "car_type" ||
            category === "wheel_brand" ||
            category === "subtype"
          ) {
            parsedOptions[category] = valuesArray;
          }
        }
      });
      setReadComplete(true);
      setIsFetching(false);
      setCheckedFilters(parsedOptions);
      console.log('readQueryOnLoad')
    },[]);

  // sets query and updates images, clears images present in array and repopulates it.
  // isFetching controls whether or not the 12453 dots are present on screen
  useEffect(() => {
    if(!readComplete) return
    async function setQueryAndUpdateImages() {
      setPage(0);
      setIsFetching(true);

      const queryParameters = Object.entries(checkedFilters)
        .map(([category, values]: [string, string[]]) => {
          const queryString = values.join(",");
          return values.length > 0 ? `${category}=${queryString}` : "";
        })
        .filter(Boolean)
        .join("&");

      router.push(`?${queryParameters}`);

      setImages([]);
      paginatedFetch({
        filters: checkedFilters,
        numItems: 25,
        page: 0,
      }).then((data) => {
        if (data) {
          if (data.length <= 25) {
            setHasMore(false);
          } else if (data.length > 25) {
            setHasMore(true);
          }
          setIsFetching(false);
          setImages(data?.slice(0, 25));
        } else {
          console.log("no data returned");
        }
      });
    }
    console.log('setQueryAndUpdateImages');
    // the above function can probably be declared outside the useEffect, but i will have to check.
    // this way, it does not have to be reloaded every time this hook is called
    setQueryAndUpdateImages();
  }, [readComplete, router, checkedFilters]);

  // checks table in supabase for possible values so no 1D query = 0 results
  // returns them to the object possibleFilters and populates the CheckboxSection components
  useEffect(() => {
    async function fetchPossibleFilters() {
      const [carTypes, wheelSizes, wheelBrands, subtypes] = await Promise.all([
        getUniqueElements("car_type"),
        getUniqueElements("wheel_size"),
        getUniqueElements("wheel_brand"),
        getUniqueElements("subtype"),
      ]);

      setPossibleFilters({
        car_type: carTypes,
        wheel_size: wheelSizes.map(Number),
        wheel_brand: wheelBrands,
        subtype: subtypes,
      });
    }
    // the above function can probably be declared outside the useEffect, but i will have to check.
    // this way, it does not have to be reloaded every time this hook is called
    fetchPossibleFilters();
    console.log('fetchPossibleFilters')
  }, [setPossibleFilters, checkedFilters]);

  // ---------------------------------------- //
  //           MAIN COMPONENT RETURN          //
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
            <CheckboxSection
              key={1}
              arrayName={"car_type"}
              checkedFilters={checkedFilters}
              toggleOption={toggleOption}
              filtersArray={possibleFilters["car_type" as keyof FilterOptions]}
            ></CheckboxSection>

            <CheckboxSection
              key={4}
              arrayName={"subtype"}
              checkedFilters={checkedFilters}
              toggleOption={toggleOption}
              filtersArray={subtypeFilters}
            ></CheckboxSection>

            <CheckboxSection
              key={2}
              arrayName={"wheel_size"}
              checkedFilters={checkedFilters}
              toggleOption={toggleOption}
              filtersArray={
                possibleFilters["wheel_size" as keyof FilterOptions]
              }
            ></CheckboxSection>

            <CheckboxSection
              key={3}
              arrayName={"wheel_brand"}
              checkedFilters={checkedFilters}
              toggleOption={toggleOption}
              filtersArray={
                possibleFilters["wheel_brand" as keyof FilterOptions]
              }
            ></CheckboxSection>
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
        <Gallery
          fetching={fetchingMore}
          handleImageClick={handleImageClick}
          loading={isFetching}
          images={images}
          galleryRef={galleryRef}
        ></Gallery>
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
      </main>
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

// this is a bit strange and not something i am used to -
// the whole component has to be wrapped in a 'suspense' component, due to the
// fact that i am using useSearchParams();. i will have to investigate this
export default function WheelGallery() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WheelGalleryContent />
    </Suspense>
  );
}
