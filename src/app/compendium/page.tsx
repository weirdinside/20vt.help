'use client'

import React, { useEffect } from "react";
import { useState, useRef } from "react";
import styles from "./Compendium.module.css";

// import { translateHTMLImageMap, translateThis } from "../../assets/image-maps";

//------------------------------------//
//           MAIN COMPONENTS          //
//------------------------------------//

import CompendiumHeader from "../_components/Compendium/CompendiumHeader/CompendiumHeader";
import CompendiumBody from "../_components/Compendium/CompendiumBody/CompendiumBody";
import CompendiumArticlesHeading from "../_components/Compendium/CompendiumArticle/CompendiumArticlesHeading";
import CompendiumFooter from "../_components/Compendium/CompendiumFooter/CompendiumFooter";
import CompendiumAboutModal from "../_components/Compendium/CompendiumAboutModal/CompendiumAboutModal";
import CompendiumSettingsModal from "../_components/Compendium/CompendiumSettingsModal/CompendiumSettingsModal";
import CompendiumPictureModal from "../_components/Compendium/CompendiumPictureModal/CompendiumPictureModal";

import ScreenSizeWarning from '../_components/Compendium/CompendiumScreenSizeWarning/ScreenSizeWarning'

//------------------------------------//
//       ARTICLE SUBCOMPONENTS        //
//------------------------------------//

// import InformationHeading from "./CompendiumArticle/Information/InformationHeading";
// import InformationText from "./CompendiumArticle/Information/InformationText";
// import InformationCited from "./CompendiumArticle/Information/InformationCited";
// import InformationLink from "./CompendiumArticle/Information/InformationLink";
// import FigureList from "./CompendiumArticle/FigureList/FigureList";
// import FigureListItem from "./CompendiumArticle/FigureList/FigureListItem";
// import FigureGrid from "./CompendiumArticle/FigureGrid/FigureGrid";
// import FigureGridImage from "./CompendiumArticle/FigureGrid/FigureGridImage";
// import CompendiumImageMap from "./CompendiumImageMap-v2";
// import NestedNav from "./CompendiumArticle/NestedNav";
// import NestedNavItem from "./CompendiumArticle/NestedNavItem";
// import ClimateControl from "./CompendiumArticle/ClimateControl/ClimateControl";
// import ClimateControlTable from "./CompendiumArticle/ClimateControl/ClimateControlTable";


//------------------------------------//
//                IMAGES              //
//------------------------------------//

// import climateControlImage from "../../assets/articles/climate_control_diagnostic/climate-control-images/default.png";

// import AANexhaustManifold1 from "../../assets/articles/exhaust_manifold/AAN-exhaust-manifold-1.png";
// import AANexhaustManifold2 from "../../assets/articles/exhaust_manifold/AAN-exhaust-manifold-2.png";
// import RS2exhaustManifold1 from "../../assets/articles/exhaust_manifold/RS2-exhaust-manifold-1.png";
// import RS2exhaustManifold2 from "../../assets/articles/exhaust_manifold/RS2-exhaust-manifold-2.png";

// import thumbnail_headlight from "../../assets/articles/body_differences/thumbnail_headlight.png";
// import thumbnail_taillight from "../../assets/articles/body_differences/thumbnail_taillight.png";
// import thumbnail_fender_molding from "../../assets/articles/body_differences/thumbnail_fender+molding.png";
// import thumbnail_bumper from "../../assets/articles/body_differences/thumbnail_bumper.png";

// import UrS6USFrontBumper from "../../assets/articles/body_differences/UrS6frontbumper_US.jpg";
// import UrS4USFrontBumper from "../../assets/articles/body_differences/UrS4frontbumper_US.jpg";
// import UrS6EuroFrontBumper from "../../assets/articles/body_differences/UrS6frontbumper_euro.jpg";
// import UrS4EuroFrontBumper from "../../assets/articles/body_differences/UrS4frontbumper_euro.jpg";

// import exhaustManifoldPartsImage from "../../assets/articles/exhaust_manifold/exhaust-manifold-parts-0/emparts.png";
// import NA_UrS4FrontBumperPartsImage from "../../assets/articles/body_differences/part numbers/NA_UrS4FrontBumper.png";
// import Euro_UrS6FrontBumperPartsImage from "../../assets/articles/body_differences/part numbers/EuroUrS6FrontBumper.png";
// import Euro_UrS4FrontBumperPartsImage from "../../assets/articles/body_differences/part numbers/EuroUrS4frontbumper.png";

// import rearSubframePartsImage from "../../assets/articles/suspension/rearsubframe.png";
// import rearShockSpringPartsImage from "../../assets/articles/suspension/rearspringshock.png";

// import HnR29971 from "../../assets/articles/suspension/hnrsprings/HnR29771.png";
// import HnR29921 from "../../assets/articles/suspension/hnrsprings/HnR29921.jpg";
// import HnR29800 from "../../assets/articles/suspension/hnrsprings/HnR29800.png";

// import A6wagon_29771 from "../../assets/articles/suspension/cars_examples_suspension/29771_UrA6avant.png";
// import UrS6avant_29921 from "../../assets/articles/suspension/cars_examples_suspension/29921_UrS6avant.jpg";
// import UrS4avant_1BE from "../../assets/articles/suspension/cars_examples_suspension/1BEsuspension_UrS4avant.jpg";
// import UrS6sedan_29800 from "../../assets/articles/suspension/cars_examples_suspension/HnR29800_UrS6sedan.jpg";
// import UrS4sedan_29921 from "../../assets/articles/suspension/cars_examples_suspension/HnR29921_UrS4Sedan.jpg";
// import UrS4sedan_92S4spring from "../../assets/articles/suspension/cars_examples_suspension/1992S4Spring_UrS4Sedan.jpg";

// import S4_100_bodymolding from "../../assets/articles/body_differences/100-S4_bodymolding.jpg";
// import A6_S6_bodymolding from "../../assets/articles/body_differences/A6-S6_bodymolding.jpg";

// import UrS6_US_taillights from "../../assets/articles/body_differences/US-UrS6_taillights.png";
// import UrS4_US_taillights from "../../assets/articles/body_differences/US-UrS4_taillights.jpg";

// import UrS4headlights from "../../assets/articles/body_differences/headlights/S4_headlights.png";
// import UrS6headlights from "../../assets/articles/body_differences/headlights/S6_headlights.jpg";
// import UrS4headlights_US from "../../assets/articles/body_differences/headlights/S4_headlights_US.jpg";
// import UrS6headlights_US from "../../assets/articles/body_differences/headlights/S6_headlights_US.jpg";

// import RS2turbo from "../../assets/articles/turbocharger/RS2turbo.png";
// import K247000 from "../../assets/articles/turbocharger/K247000.png";
// import modified7400housing from "../../assets/articles/turbocharger/modified7400housing.jpeg";
// import nicAllen7400Dyno from "../../assets/articles/turbocharger/nic-allen-7400-dyno.png";

//------------------------------------//
//             IMAGE MAPS             //
//------------------------------------//

// import * as exhaustManifoldPartsImageMap from "../../assets/exhaustManifoldImageMap.json";
// import * as NA_UrS4FrontBumperPartsImageMap from "../../assets/NA_UrS4FrontBumperImageMap.json";
// import * as Euro_UrS6FrontBumperPartsImageMap from "../../assets/Euro_UrS6FrontBumperImageMap.json";
// import * as Euro_UrS4FrontBumperPartsImageMap from "../../assets/Euro_UrS4FrontBumperImageMap.json";
// import * as rearSubframePartsImageMap1BE from "../../assets/rearSubframePartsImageMap1BE.json";
// import * as rearSubframePartsImageMap1BA from "../../assets/rearSubframePartsImageMap1BA.json";
// import * as rearShockSpringPartsImageMap1BA from "../../assets/rearShockSpringPartsImageMap1BA.json";
// import * as rearShockSpringImageMap1BE from "../../assets/rearShockSpringPartsImageMap1BE.json";

// there has to be a better way to parse json from image maps. lots of manual work here that doesn't need to be manual

//------------------------------------//
//           COMPONENT ENTRY          //
//------------------------------------//

// challenges to address:

/*
    - basically every link in the InformationCited component has a link to the site, a title,
    and two common elements that are shared for every single damn link. you can break this down
    inside the InformationCited component without using children

    - go into the image map component and try using useCallback to reduce the amount of recalculations

    - for each image on the page, make it so that when clicked, a popup (CompendiumPictureModal) pops up 
    and is able to display the photo + details on the item. you have to pass through activeModal as 'compendium-picture'
     to the click handler, and the item you clicked on to the CompendiumPictureModal element
*/

function Compendium({
  setActiveModal,
  handleSettingsClick,
  handleCompendiumAboutClick,
  activeModal,
  closeModal,
}) {
  // util for translating image maps from HTML quickly. check console
  // console.log(translateHTMLImageMap(translateThis));

  //------------------------------------//
  //         STATES / VARIABLES         //
  //------------------------------------//

  const [bigWindow, setBigWindow] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [clickSetting, setClickSetting] = useState(false);
  const [pictureModalData, setPictureModalData] = useState({});
  const [windowWidth, setWindowWidth] = useState();
  const [windowHeight, setWindowHeight] = useState();

  //------------------------------------//
  //              HANDLERS              //
  //------------------------------------//

  function handleClickCheckbox() {
    setClickSetting(!clickSetting);
  }

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  function handlePictureClick(item) {
    setPictureModalData(item);
    setActiveModal("preview");
  }

  //------------------------------------//
  //                HOOKS               //
  //------------------------------------//

  function checkBigWindow(){
    setWindowWidth(parseInt(window.innerWidth));
    setWindowHeight(parseInt(window.innerHeight));
    setBigWindow(windowHeight > 500 && windowWidth > 580);
  }

  useEffect(() => {
    checkBigWindow();
    window.addEventListener("resize", () => {
      checkBigWindow();
    });
  }, [windowWidth, windowHeight]);

  //------------------------------------//
  //              ENDPOINT              //
  //------------------------------------//

  return (
    <>
      <ScreenSizeWarning></ScreenSizeWarning>
      <div className={styles["page"]}>
        <CompendiumHeader
          searchInput={searchInput}
          handleChange={handleChange}
        ></CompendiumHeader>
        <CompendiumBody>
          <CompendiumArticlesHeading></CompendiumArticlesHeading>
          
        </CompendiumBody>

        <CompendiumFooter
          handleSettingsClick={handleSettingsClick}
          handleCompendiumAboutClick={handleCompendiumAboutClick}
        ></CompendiumFooter>

        <CompendiumAboutModal activeModal={activeModal}></CompendiumAboutModal>

        <CompendiumPictureModal

          closeModal={closeModal}
          pictureModalData={pictureModalData}
          activeModal={activeModal}
        ></CompendiumPictureModal>

        <CompendiumSettingsModal
          pictureModalData={pictureModalData}
          clickSetting={clickSetting}
          handleClickCheckbox={handleClickCheckbox}
          activeModal={activeModal}
        ></CompendiumSettingsModal>
      </div>
    </>
  );
}

export default Compendium;
