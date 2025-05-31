"use client";

import { ChangeEvent, useContext, useEffect, useState } from "react";
import styles from "./CompendiumContent.module.css";

//------------------------------------//
//           MAIN COMPONENTS          //
//------------------------------------//

import CompendiumAboutModal from "./CompendiumAboutModal/CompendiumAboutModal";
import CompendiumArticle from "./CompendiumArticle/CompendiumArticle";
import CompendiumArticlesHeading from "./CompendiumArticle/CompendiumArticlesHeading";
import CompendiumBody from "./CompendiumBody/CompendiumBody";
import CompendiumFooter from "./CompendiumFooter/CompendiumFooter";
import CompendiumHeader from "./CompendiumHeader/CompendiumHeader";
import CompendiumPictureModal from "./CompendiumPictureModal/CompendiumPictureModal";
import CompendiumSettingsModal from "./CompendiumSettingsModal/CompendiumSettingsModal";

//------------------------------------//
//       ARTICLE SUBCOMPONENTS        //
//------------------------------------//

import ClimateControl from "./CompendiumArticle/ClimateControl/ClimateControl";
import ClimateControlTable from "./CompendiumArticle/ClimateControl/ClimateControlTable";
import FigureGrid from "./CompendiumArticle/FigureGrid/FigureGrid";
import FigureGridImage from "./CompendiumArticle/FigureGrid/FigureGridImage";
import FigureList from "./CompendiumArticle/FigureList/FigureList";
import FigureListItem from "./CompendiumArticle/FigureList/FigureListItem";
import InformationCited from "./CompendiumArticle/Information/InformationCited";
import InformationLink from "./CompendiumArticle/Information/InformationLink";
import InformationText from "./CompendiumArticle/Information/InformationText";
import NestedNav from "./CompendiumArticle/NestedNav";
import NestedNavItem from "./CompendiumArticle/NestedNavItem";
import CompendiumImageMap from "./CompendiumImageMap-v2";
import ScreenSizeWarning from "./CompendiumScreenSizeWarning/ScreenSizeWarning";

//------------------------------------//
//                IMAGES              //
//------------------------------------//

import AANexhaustManifold1 from "../../assets/articles/exhaust_manifold/AAN-exhaust-manifold-1.png";
import AANexhaustManifold2 from "../../assets/articles/exhaust_manifold/AAN-exhaust-manifold-2.png";
import RS2exhaustManifold1 from "../../assets/articles/exhaust_manifold/RS2-exhaust-manifold-1.png";
import RS2exhaustManifold2 from "../../assets/articles/exhaust_manifold/RS2-exhaust-manifold-2.png";

import thumbnail_bumper from "../../assets/articles/body_differences/thumbnail_bumper.png";
import thumbnail_fender_molding from "../../assets/articles/body_differences/thumbnail_fender+molding.png";
import thumbnail_headlight from "../../assets/articles/body_differences/thumbnail_headlight.png";
import thumbnail_taillight from "../../assets/articles/body_differences/thumbnail_taillight.png";

import UrS4EuroFrontBumper from "../../assets/articles/body_differences/UrS4frontbumper_euro.jpg";
import UrS4USFrontBumper from "../../assets/articles/body_differences/UrS4frontbumper_US.jpg";
import UrS6EuroFrontBumper from "../../assets/articles/body_differences/UrS6frontbumper_euro.jpg";
import UrS6USFrontBumper from "../../assets/articles/body_differences/UrS6frontbumper_US.jpg";

import Euro_UrS4FrontBumperPartsImage from "../../assets/articles/body_differences/part numbers/EuroUrS4frontbumper.png";
import Euro_UrS6FrontBumperPartsImage from "../../assets/articles/body_differences/part numbers/EuroUrS6FrontBumper.png";
import NA_UrS4FrontBumperPartsImage from "../../assets/articles/body_differences/part numbers/NA_UrS4FrontBumper.png";
import exhaustManifoldPartsImage from "../../assets/articles/exhaust_manifold/exhaust-manifold-parts-0/emparts.png";

import rearShockSpringPartsImage from "../../assets/articles/suspension/rearspringshock.png";
import rearSubframePartsImage from "../../assets/articles/suspension/rearsubframe.png";

import frontShockSpringPartsImage from "../../assets/articles/suspension/frontshockspring.png";

import HnR29971 from "../../assets/articles/suspension/hnrsprings/HnR29771.png";
import HnR29800 from "../../assets/articles/suspension/hnrsprings/HnR29800.png";
import HnR29921 from "../../assets/articles/suspension/hnrsprings/HnR29921.jpg";

import UrS4sedan_92S4spring from "../../assets/articles/suspension/cars_examples_suspension/1992S4Spring_UrS4Sedan.jpg";
import UrS4avant_1BE from "../../assets/articles/suspension/cars_examples_suspension/1BEsuspension_UrS4avant.jpg";
import A6wagon_29771 from "../../assets/articles/suspension/cars_examples_suspension/29771_UrA6avant.png";
import UrS6avant_29921 from "../../assets/articles/suspension/cars_examples_suspension/29921_UrS6avant.jpg";
import UrS6sedan_29800 from "../../assets/articles/suspension/cars_examples_suspension/HnR29800_UrS6sedan.jpg";

import S4_100_bodymolding from "../../assets/articles/body_differences/100-S4_bodymolding.jpg";
import A6_S6_bodymolding from "../../assets/articles/body_differences/A6-S6_bodymolding.jpg";

import UrS4_US_taillights from "../../assets/articles/body_differences/US-UrS4_taillights.jpg";
import UrS6_US_taillights from "../../assets/articles/body_differences/US-UrS6_taillights.png";

import UrS4headlights from "../../assets/articles/body_differences/headlights/S4_headlights.png";
import UrS4headlights_US from "../../assets/articles/body_differences/headlights/S4_headlights_US.jpg";
import UrS6headlights from "../../assets/articles/body_differences/headlights/S6_headlights.jpg";
import UrS6headlights_US from "../../assets/articles/body_differences/headlights/S6_headlights_US.jpg";

import K247000 from "../../assets/articles/turbocharger/K247000.png";
import modified7400housing from "../../assets/articles/turbocharger/modified7400housing.jpeg";
import nicAllen7400Dyno from "../../assets/articles/turbocharger/nic-allen-7400-dyno.png";
import RS2turbo from "../../assets/articles/turbocharger/RS2turbo.png";

import MAPSensor from "../../assets/articles/tuning/3BarBoschMAP.jpeg";
import MTM1Plus from "../../assets/articles/tuning/MTM1Plus.jpg";
import wetterauer1 from "../../assets/articles/tuning/wetteraeur stage 1 - neacail.jpg";
import wetterauer2 from "../../assets/articles/tuning/wetterauer stage 1 (2) - neacail.jpg";
import TAPstage1or2 from "../../assets/articles/tuning/TAP stage 1 or 2 - quattron8-jc.jpeg";

import turboAdapter1 from "../../assets/articles/turbocharger/benznotmercedes adapter.jpg";
import turboAdapter2 from "../../assets/articles/turbocharger/geoff danielson vband adapter.jpg";
import tubularManifold1 from "../../assets/articles/turbocharger/engineerCNC on drive2.ru tubular manifold.jpg";
import tubularManifold2 from "../../assets/articles/turbocharger/quattro4life tubular manifold.jpg";

//------------------------------------//
//             IMAGE MAPS             //
//------------------------------------//

import * as Euro_UrS4FrontBumperPartsImageMap from "../../assets/Euro_UrS4FrontBumperImageMap.json";
import * as Euro_UrS6FrontBumperPartsImageMap from "../../assets/Euro_UrS6FrontBumperImageMap.json";
import * as exhaustManifoldPartsImageMap from "../../assets/exhaustManifoldImageMap.json";
import * as NA_UrS4FrontBumperPartsImageMap from "../../assets/NA_UrS4FrontBumperImageMap.json";
import * as rearShockSpringPartsImageMap1BA from "../../assets/rearShockSpringPartsImageMap1BA.json";
import * as rearShockSpringImageMap1BE from "../../assets/rearShockSpringPartsImageMap1BE.json";
import * as rearSubframePartsImageMap1BA from "../../assets/rearSubframePartsImageMap1BA.json";
import * as rearSubframePartsImageMap1BE from "../../assets/rearSubframePartsImageMap1BE.json";
import * as frontShockSpringPartsImageMap1BE from "../../assets/frontShockSpringPartsImageMap1BE.json";

import { useQueryState } from "nuqs";
import { SearchContext } from "@/app/contexts/SearchProvider";
import InformationHeading from "./CompendiumArticle/Information/InformationHeading";
import ECUPinout from "./CompendiumArticle/ECUPinout/ECUPinout";
import Script from "next/script";
import ClimateControlCh1Modal from "./CompendiumArticle/ClimateControl/ClimateControlCh1Modal";

export default function CompendiumContent() {
  const [bigWindow, setBigWindow] = useState<boolean>(true);
  const [clickSetting, setClickSetting] = useState<boolean>(false);
  const [pictureModalData, setPictureModalData] = useState({});
  const [windowWidth, setWindowWidth] = useState<number>();
  const [windowHeight, setWindowHeight] = useState<number>();
  const [activeModal, setActiveModal] = useState<string>("");

  const [openArticles, setOpenedArticles] = useQueryState("oa");
  const [searchValue, setSearchValue] = useQueryState("search");

  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  //------------------------------------//
  //              HANDLERS              //
  //------------------------------------//

  function handleClickArticleName(articleHref: string) {
    const targetDiv = document.querySelector(`#${articleHref}`);
    targetDiv?.scrollIntoView({ behavior: "smooth" });
  }

  function handleClickCheckbox() {
    setClickSetting(!clickSetting);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  function handlePictureClick(item: any) {
    setPictureModalData(item);
    setActiveModal("preview");
  }

  function handleSettingsClick() {
    setActiveModal("settings");
  }

  function handleCompendiumAboutClick() {
    setActiveModal("compendium-about");
  }

  function closeModal() {
    setActiveModal("");
  }

  //------------------------------------//
  //                HOOKS               //
  //------------------------------------//

  function checkBigWindow() {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
    if (windowHeight && windowWidth)
      setBigWindow(windowHeight > 500 && windowWidth > 580);
  }

  useEffect(() => {
    if (searchValue) setSearchTerm(searchValue);
  }, []);

  useEffect(() => {
    if (searchTerm !== searchValue) setSearchValue(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    checkBigWindow();
    window.addEventListener("resize", () => {
      checkBigWindow();
    });
    return () => {
      window.removeEventListener("resize", () => {
        checkBigWindow();
      });
    };
  }, [windowWidth, windowHeight]);

  //------------------------------------//
  //              ENDPOINT              //
  //------------------------------------//

  return (
    <>
      <ScreenSizeWarning />
      <div className={styles["page"]}>
        <CompendiumHeader
          searchInput={searchTerm}
          handleChange={handleChange}
        />
        <CompendiumBody>
          <CompendiumArticlesHeading />
          {/* Body Differences */}
          <CompendiumArticle
            href="bodydiffs"
            title="Body Differences"
            models={["100", "A6", "UrS4", "UrS6"]}
          >
            <br></br>
            <NestedNav showThumbnails="true">
              <NestedNavItem
                id="bumpers"
                title="bumpers"
                thumbnail={thumbnail_bumper.src}
              >
                <InformationText>
                  Between the 91-94 S4 (UrS4) and 95-97 S6 (UrS6), there are a
                  few different kinds of bumpers. All bumpers from S cars are
                  flared to meet the fenders. The UrS4 has black plastic trim on
                  it to match the door trim, where the UrS6 does not and the
                  whole bumper (with the exception of the lower valence) is
                  paint matched to the body. Pictured below are the differences
                  between the euro/US UrS4 and UrS6 front bumpers.
                </InformationText>
                <FigureGrid>
                  <FigureGridImage
                    handlePictureClick={handlePictureClick}
                    caption="UrS4 euro front bumper"
                    numFig="1a"
                    imageSrc={UrS4EuroFrontBumper.src}
                  />
                  <FigureGridImage
                    handlePictureClick={handlePictureClick}
                    caption="UrS4 US front bumper"
                    numFig="1b"
                    imageSrc={UrS4USFrontBumper.src}
                  />
                  <FigureGridImage
                    handlePictureClick={handlePictureClick}
                    caption="UrS6 euro front bumper"
                    numFig="1c"
                    imageSrc={UrS6EuroFrontBumper.src}
                  />
                  <FigureGridImage
                    handlePictureClick={handlePictureClick}
                    caption="UrS6 US front bumper"
                    numFig="1d"
                    imageSrc={UrS6USFrontBumper.src}
                  />
                </FigureGrid>
                <InformationText>
                  The european bumpers also sit closer to the body than the US
                  bumpers, and lack the additional trim piece between the
                  hood/headlights/fender and the bumper itself.
                </InformationText>
                <NestedNav showThumbnails="false">
                  <NestedNavItem
                    id="NA UrS4 front bumper parts"
                    title="NA UrS4 front bumper parts"
                  >
                    <CompendiumImageMap
                      mapName="NA_UrS4FrontBumperPartsImage"
                      imageSrc={NA_UrS4FrontBumperPartsImage.src}
                      // @ts-ignore
                      imageMap={NA_UrS4FrontBumperPartsImageMap.default}
                      clickSetting={clickSetting}
                      handleClickCheckbox={handleClickCheckbox}
                    ></CompendiumImageMap>
                  </NestedNavItem>
                  <NestedNavItem
                    id="NA UrS6 front bumper parts"
                    title="NA UrS6 front bumper parts"
                  >
                    <CompendiumImageMap
                      mapName="NA_UrS4FrontBumperPartsImage"
                      imageSrc={NA_UrS4FrontBumperPartsImage.src}
                      // @ts-ignore
                      imageMap={NA_UrS4FrontBumperPartsImageMap.default}
                      clickSetting={clickSetting}
                      handleClickCheckbox={handleClickCheckbox}
                    ></CompendiumImageMap>
                  </NestedNavItem>
                  <NestedNavItem
                    id="Euro UrS4 front bumper parts"
                    title="Euro UrS4 front bumper parts"
                  >
                    <CompendiumImageMap
                      mapName="Euro_UrS4FrontBumperPartsImage"
                      imageSrc={Euro_UrS4FrontBumperPartsImage.src}
                      // @ts-ignore
                      imageMap={Euro_UrS4FrontBumperPartsImageMap.default}
                      clickSetting={clickSetting}
                      handleClickCheckbox={handleClickCheckbox}
                    ></CompendiumImageMap>
                  </NestedNavItem>
                  <NestedNavItem
                    id="Euro UrS6 front bumper parts"
                    title="Euro UrS6 front bumper parts"
                  >
                    <CompendiumImageMap
                      mapName="Euro_UrS6FrontBumperPartsImage"
                      imageSrc={Euro_UrS6FrontBumperPartsImage.src}
                      // @ts-ignore
                      imageMap={Euro_UrS6FrontBumperPartsImageMap.default}
                      clickSetting={clickSetting}
                      handleClickCheckbox={handleClickCheckbox}
                    ></CompendiumImageMap>
                  </NestedNavItem>
                </NestedNav>
                <InformationText>
                  Pictured below are the A6/100 euro and US front bumpers.
                </InformationText>
                {/* insert figuregrid with A6 and 100 front bumpers */}
                <InformationText>
                  The grilles are slightly different and as there is no fender
                  flare on the 100 or A6, the edges of the bumper do not flare
                  out.
                </InformationText>
              </NestedNavItem>
              <NestedNavItem
                id="fenders + body cladding"
                title="fenders + body cladding"
                thumbnail={thumbnail_fender_molding.src}
              >
                <InformationText>
                  The 1991-1994 Audi 100/S4 had black plastic molding around the
                  body, and the 95-97 A6/S6 had painted (matched to the color of
                  the car) molding in its place. The images below show the
                  difference:
                </InformationText>
                <FigureGrid>
                  <FigureGridImage
                    imageSrc={S4_100_bodymolding.src}
                    numFig="1a"
                    caption="100/S4 body molding"
                    handlePictureClick={handlePictureClick}
                  ></FigureGridImage>
                  <FigureGridImage
                    imageSrc={A6_S6_bodymolding.src}
                    numFig="1b"
                    caption="A6/S6 body molding"
                    handlePictureClick={handlePictureClick}
                  ></FigureGridImage>
                </FigureGrid>
                <InformationText>
                  The molding wraps around to the front and rear bumpers as
                  well. 100/A6/S4/S6 doors are the same and the trim is
                  interchangeable, and while the front and rear bumpers will
                  bolt on to any C4, the molding is not present on the A6 and
                  S6.
                </InformationText>
              </NestedNavItem>
              <NestedNavItem
                id="headlights"
                title="headlights"
                thumbnail={thumbnail_headlight.src}
              >
                <InformationText>
                  The 100 and UrS4 share headlights, which are different from
                  the headlights found on the A6 and S6 (which also share the
                  same headlights).
                </InformationText>
                <FigureGrid>
                  <FigureGridImage
                    handlePictureClick={handlePictureClick}
                    caption="UrS4 headlights (Euro)"
                    numFig="1a"
                    imageSrc={UrS4headlights.src}
                  ></FigureGridImage>
                  <FigureGridImage
                    handlePictureClick={handlePictureClick}
                    caption="UrS6 headlights (Euro)"
                    numFig="1b"
                    imageSrc={UrS6headlights.src}
                  ></FigureGridImage>
                </FigureGrid>
                <InformationText>
                  Much like the hood and fender between the two models, the
                  headlights on the S4 are a bit boxier and have sharper angles
                  than the ones on the S6. The main headlights are matched to
                  the contour of the hood, and the corners are matched to the
                  fenders. S4 headlights may bolt up just fine to an S6 (and
                  vice versa), but they are not interchangeable. The corners
                  will not bolt up at all unless the car has the appropriate
                  fenders.
                </InformationText>
                <InformationText>
                  The cars pictured above are both euro spec cars, and therefore
                  have clear corner lights - US cars had amber corners, as
                  pictured below.
                </InformationText>
                <FigureGrid>
                  <FigureGridImage
                    handlePictureClick={handlePictureClick}
                    imageSrc={UrS4headlights_US.src}
                    numFig="2a"
                    caption="UrS4 headlights (US)"
                  ></FigureGridImage>
                  <FigureGridImage
                    handlePictureClick={handlePictureClick}
                    imageSrc={UrS6headlights_US.src}
                    numFig="2b"
                    caption="UrS6 headlights (US)"
                  ></FigureGridImage>
                </FigureGrid>
                <InformationText>
                  The US corners are a bit easier to distinguish one from
                  another.
                </InformationText>
              </NestedNavItem>
              <NestedNavItem
                title="taillights"
                id="taillights"
                thumbnail={thumbnail_taillight.src}
              >
                <InformationText>
                  In the US, the 100/S4 and A6/S6 taillights were all the same.
                  The sedan and avant center taillights are interchangeable as
                  well, but the corners are NOT. They are specific to avant and
                  sedan.
                </InformationText>
                <FigureGrid>
                  <FigureGridImage
                    imageSrc={UrS4_US_taillights.src}
                    handlePictureClick={handlePictureClick}
                    numFig="3a"
                    caption="UrS4 US rear taillights (photo by David Bush)"
                  ></FigureGridImage>
                  <FigureGridImage
                    imageSrc={UrS6_US_taillights.src}
                    handlePictureClick={handlePictureClick}
                    numFig="3a"
                    caption="UrS6 US rear taillights"
                  ></FigureGridImage>
                </FigureGrid>
                <InformationText>
                  ROW spec taillights were handled differently. There were
                  different taillights for the 100, UrS4, A6 and UrS6:
                </InformationText>
              </NestedNavItem>
            </NestedNav>
          </CompendiumArticle>
          {/* Climate Control Diagnostic */}
          <CompendiumArticle
            href="ccd"
            title="Climate Control Diagnostic"
            models={["100", "A6", "UrS4", "UrS6"]}
          >
            <InformationText>
              C4 Audis have a diagnostic menu that is accessible through the
              climate control unit. To access the menu, you must press and hold
              the air recirculation and top vent buttons simultaneously. If done
              correctly, the left hand screen will display a number between 01
              and 61 (on cars with V8 engines, this number is higher) followed
              by a "C". To cycle through the codes, press the + and - buttons
              below the left screen (the ones you would use to control the cabin
              air temperature), and to view the values of a code, press the
              recirculation button again.
            </InformationText>

            {bigWindow ? (
              <>
                <InformationText>
                  Below is an interactive climate control unit with a tutorial
                  on how to access the menu.
                </InformationText>
                <br></br>
                <ClimateControl setActiveModal={setActiveModal} />
                <br></br>
              </>
            ) : null}

            <InformationText>
              {bigWindow
                ? `If you'd simply like to search the codelist, below is a table that
                        contains all of the values. Channels 1, 52 and 53 all have special
                        information that can be accessed by clicking on the code.`
                : `Below is a table of all the climate control codes. Channels 1, 52 and 53 all have special
                        information that can be accessed by clicking on the code. `}
            </InformationText>

            <ClimateControlTable
              setActiveModal={setActiveModal}
            ></ClimateControlTable>
          </CompendiumArticle>
          {/* Coilovers */}
          <CompendiumArticle
            href="coilovers"
            title="Coilovers"
            models={["100", "A6", "UrS4", "UrS6"]}
          >
            <InformationText>
              C4 UrS coilovers, though available, are very limited in options.
              Coilovers are available from 2Bennett, and KW*, but KW does not
              ship to North America and 2Bennett's price tag is a bit hefty
              (when I purchased a set from 2B in 2019, it cost me just around
              $3,800 USD shipped to my doorstep). The most customizable and cost
              effective option is to build your own setup.
              <br /> <br />
              <span style={{ fontStyle: "italic" }}>
                {" "}
                *as of 2024,{" "}
                <InformationLink
                  inline
                  customText="TA Technix"
                  link="https://www.tatechnix.de/tatechnix/gx/?cat=c156505_4A-C4-4a-c4-156505.html"
                />{" "}
                and{" "}
                <InformationLink
                  inline
                  customText="MTS Technik"
                  link="https://mtstechnik.com/en/menu/with-camber-plates-37054.html"
                />{" "}
                also make coilovers for these cars. They are more cost effective
                than the 2B variant and will ship to the US unlike KW. People
                have achieved positive results with the MTS kit, including{" "}
                <InformationLink
                  title="Joel Francisco"
                  inline
                  customText="Joel Francisco"
                  link="https://instagram.com/rs6_jolio"
                />
                ,{" "}
                <InformationLink
                  customText="Valentino Di Rico"
                  inline
                  link="https://instagram.com/spaghetti_n_quattros"
                />
                , and Jay Alford, but the TA Technix kit is akin to a cheap BC
                Racing coilover.
              </span>
            </InformationText>
            <InformationHeading>Rear Coilover DIY</InformationHeading>
            <InformationText>
              The easier coilover conversion to do (by quite a large margin) is
              the rear suspension. In most cases, if your car already has an
              aftermarket Bilstein or Koni shock, a budget rear coilover is
              almost a must if you're a UrS avant owner putting loads of stuff
              in the hatch.
            </InformationText>
            <InformationText>
              Starting with the shocks, you have the option of either a Bilstein
              or Koni.
            </InformationText>
            <InformationCited>
              2 x Koni 80 2630 sport -{" "}
              <InformationLink
                link="https://www.fcpeuro.com/products/audi-shock-absorber-koni-sport-802630sport"
                inline
                customText="fcpeuro.com"
              />
            </InformationCited>
            <InformationCited>
              2 x Bilstein B8 24-020664 -{" "}
              <InformationLink
                link="https://www.fcpeuro.com/products/audi-shock-absorber-100-quattro-a6-quattro-s6-5000-quattro-v8-quattro-24-020664"
                inline
                customText="fcpeuro.com"
              />
            </InformationCited>
            <InformationText>
              They are roughly the same price, so you may choose whichever you
              please. However, if you go the Koni route, note that you will
              likely need{" "}
              <InformationLink
                link="https://www.amazon.com/gp/product/B002E7HLY0/"
                customText="a spring perch like this"
                inline
              />
              , as the stock seat on the shock is not removable to my knowledge
              and cannot be used by a coilover spring. Since the Bilsteins have
              a removable perch and utilize a circlip that you can reuse for the
              sleeve to sit on, an additional perch is not necessary, but is
              recommended in case the circlip decides to fail. I have not
              experienced this on my avant with 500lb springs through New York
              winters, but if you're going for a more aggressive setup, the
              extra failsafe couldn't hurt.
            </InformationText>
            <InformationText>
              Next are the slip-ons for the shock body. You have the option of
              buying these items separately, as I did from A1-Racing:
            </InformationText>
            <InformationCited>
              2 x bottom spring perch (A1-12460) -{" "}
              <InformationLink
                inline
                link="https://www.a1racing.com/A1_Racing_Products_12460_2_1/2_Spring_Coil_Over_Adjusting_Nut.aspx"
                customText="A1 Racing"
              />
            </InformationCited>
            <InformationCited>
              2 x non slotted spring top perch -{" "}
              <InformationLink
                inline
                link="https://www.a1racing.com/A1_Racing_Products_12470_2_1/2_Spring_NonSlotted_Coil_Over_Top.aspx"
                customText="A1 Racing"
              />
            </InformationCited>
            <InformationCited>
              2 x threaded sleeve (BUY ONLY IF YOU HAVE BILSTEIN) -{" "}
              <InformationLink
                inline
                link="https://www.a1racing.com/A1_Racing_Products_12451_5_Coil_Over_Sleeve.aspx"
                customText="A1 Racing"
              />
            </InformationCited>
            <InformationCited>
              2 x threaded sleeve (BUY ONLY IF YOU HAVE KONI) -{" "}
              <InformationLink
                inline
                link="https://www.a1racing.com/A1_Racing_Products_12450_5_Coil_Over_Sleeve.aspx"
                customText="A1 Racing"
              />
            </InformationCited>
            <InformationText>
              You could also try out either one of these kits instead of buying
              the parts separately - I have no experience with them, but I'm
              certain either of them would work the same:
            </InformationText>
            <InformationCited>
              2 x Bilstein coilover sleeve kit -{" "}
              <InformationLink
                inline
                link="https://carolinaracingsupply.com/product/00/303-193117/BILSTEIN-COIL-OVER-KIT-with-7-SLEEVE"
                customText="carolinaracingsupply.com  "
              />
            </InformationCited>
            <InformationCited>
              2 x Bilstein coilover sleeve kit -{" "}
              <InformationLink
                inline
                link="https://www.speedwaymotors.com/Coilover-Kits-2-Inch-Body-7-Inch-Coilover-Sleeve,31667.html?sku=91046238-BIL"
              />
            </InformationCited>
            <InformationText>
              Now for the springs. We're looking specifically for 2.5" ID
              springs that are around 7" in length. I used the ones linked
              below, but you can play with spring rates and lengths at your own
              preference. I also opted to use helper springs, which I don't
              actually believe help too much - many have gone without them and
              achieved great results.
            </InformationText>

            <InformationCited>
              2 x Eibach 500LB spring -{" "}
              <InformationLink
                inline
                link="https://pitstopusa.com/products/eibach-7-coil-over-spring-2-1-2-i-d-500-lb"
              />
            </InformationCited>

            <InformationCited>
              2 x Hyperco takeup spring (OPTIONAL) -{" "}
              <InformationLink
                inline
                link="https://pitstopusa.com/products/hypercoils-4-take-up-spring-2-1-2-i-d-25-lb"
              />
            </InformationCited>
            <InformationCited>
              2 x Eibach spring spacer (OPTIONAL - ONLY FOR USE WITH HELPER
              SPRINGS OR A 2 SPRING SETUP) -{" "}
              <InformationLink
                inline
                link="https://pitstopusa.com/products/eibach-2-1-2-i-d-spring-spacer"
              />
            </InformationCited>
            <InformationText>
              Instead of buying the straight spring above, you could also buy a
              set of barrel springs below (recommended by Phil Jolicoeur)
            </InformationText>
            <InformationCited>
              2 x Eibach 500LB barrel spring -{" "}
              <InformationLink
                inline
                link="https://eibach.com/product/0700.2530.0500"
              />
            </InformationCited>
            <InformationText>
              A step by step assembly can be found at{" "}
              <InformationLink
                inline
                link="https://theprojectpad.com/viewtopic.php?f=28&t=3068"
              />
              , courtesy of Phil Jolicoeur.
              <br />
              Photo instructions will be available here soon as well.
            </InformationText>
          </CompendiumArticle>
          {/* ECU */}
          <CompendiumArticle
            href="ecu"
            title="Engine Control Unit [ECU]"
            models={["UrS4", "UrS6"]}
          >
            <InformationText>
              The Bosch Motronic 2.3.2 ECU is the engine management system used
              in the 1992-94 S4 and 1995-97 S6. The ECU part number always began
              with 4A0 907 55(x), where the suffix (x) changes dependent on the
              following:
            </InformationText>
            <InformationCited>
              A: early UrS4 with pseudo distributor and 8k boost chip
              <br />
              AA: UrS4 non-immobilizer, Europe and America
              <br />
              B: UrS4 same as 551AA, but auto
              <br />
              C: UrS6 incorporates all software updates from RS2, different
              codebase, more diagnostics
              <br />
              D: UrS6 same as 551C but auto (see photos at the end of this post)
              <br />
              E: UrS6 has a small tweak to fuel on cold start
              <br />
              F: UrS6 same as 551E but auto.
              <br />
            </InformationCited>
            <InformationText>
              In the factory manual and schematics, the ECU is referred to as
              J220.
            </InformationText>
            <InformationText>
              The ECU is located in the passenger footwell, and can be accessed
              by using the following steps:{" "}
              <span className={styles["information__cited"]}>
                [UNDER CONSTRUCTION]
              </span>
              {/* <ol className={styles["information__steps"]}></ol> */}
            </InformationText>
            <InformationText>
              There are four spade fuses above the ECU. Their designations,
              amperage and purposes are as follows (top to bottom here is left
              to right in your car):
            </InformationText>
            <InformationCited>
              <span style={{ backgroundColor: "black", color: "white" }}>
                S75:
              </span>
              12A/10A in UrS4/UrS6 respectively, Powers the N75 and the N80.
            </InformationCited>
            <InformationCited>
              <span style={{ backgroundColor: "beige", color: "black" }}>
                S72 / S116:
              </span>
              15A, Power to injectors and MAF.
            </InformationCited>
            <InformationCited>
              <span style={{ backgroundColor: "red", color: "white" }}>
                S26 / S102:
              </span>
              5A, Constant power to ECU.
            </InformationCited>
            <InformationCited>
              <span style={{ backgroundColor: "yellow", color: "black" }}>
                S64 / S115:
              </span>
              15A, Switched power to ECU and ignition coils.
            </InformationCited>
            <br />
            <InformationText>
              In the UrS4, all but the S26 will be thermofuses if they haven't
              been replaced. If they haven't, switch them to spades - no
              modification is necessary.
            </InformationText>
            <InformationText>
              Below is a rough pinout of the UrS4/UrS6 Motronic 2.3.2 ECU,
              viewing it with the "Motronic" logo facing upwards. The pins go
              1-55 from right to left, bottom to top (starting with Pin 1 in the
              bottom right). Hover / Touch a pin to get its number & purpose, or
              reference the table below it.
            </InformationText>
            <ECUPinout />
            <InformationLink
              num="00"
              title="Technical Data"
              link="https://forums.quattroworld.com/s4s6/msgs/21009.phtml"
            />
            <InformationLink
              num="05"
              title="Tuning / PRJmod"
              link="https://m232.org"
            ></InformationLink>
            <InformationLink
              num="07"
              title="M232 Tuning Suite"
              link="https://github.com/prj/m232"
            ></InformationLink>
          </CompendiumArticle>
          {/* Exhaust Manifold */}
          <CompendiumArticle
            href="exhaustmanifold"
            title="Exhaust Manifold"
            models={["UrS4", "UrS6"]}
          >
            <InformationText>
              The AAN, ABY and 3B engine's stock exhaust manifold
              <span className={styles["part_number"]}>[034 129 587J]</span>{" "}
              looked like this:
            </InformationText>

            <FigureList>
              <FigureListItem
                handlePictureClick={handlePictureClick}
                figureNum="fig. 1a"
                imageSrc={AANexhaustManifold2.src}
                caption="AAN exhaust manifold"
              ></FigureListItem>
              <FigureListItem
                handlePictureClick={handlePictureClick}
                figureNum="fig. 1b"
                imageSrc={AANexhaustManifold1.src}
                caption="As seen in the AAN service manual"
              ></FigureListItem>
            </FigureList>

            <InformationText>
              These do the job fine on stock vehicles, but once any sort of
              modification is made to the tune or turbo, the exhaust valves on
              cylinder 1 and cylinder 5 will start to see excessive heat and get
              burned up.
              <br />
              <br />
              The RS2 exhaust manifold
              <span className={styles["part_number"]}>[034 253 031A]</span>{" "}
              solves the heat distribution issue of the AAN manifold. It looks
              like this:
            </InformationText>

            <FigureList>
              <FigureListItem
                handlePictureClick={handlePictureClick}
                figureNum="fig. 2a"
                imageSrc={RS2exhaustManifold1.src}
                caption="RS2 exhaust manifold"
              ></FigureListItem>
              <FigureListItem
                handlePictureClick={handlePictureClick}
                figureNum="fig 2b"
                imageSrc={RS2exhaustManifold2.src}
                caption="Short studs are needed for certain holes"
              ></FigureListItem>
            </FigureList>

            <InformationText>
              As seen in fig. 2b, some of the studs need to be shortened (or
              shorter studs have to be installed) when installing an RS2 exhaust
              manifold. There are also replicas of the RS2 EM for sale on eBay,
              which some have had luck with - some cleaning of the casting is
              required, but they work well enough.
            </InformationText>
            <InformationText>
              Apart from the OEM options, there are a few other routes you can
              go:
              <InformationLink
                inline
                link="https://shop.efi-motorsport.com/products/rs2_evo_exhaust_manifold"
                title="The wagner manifold"
              ></InformationLink>
              , which outflows the OEM manifolds and is a bit sturdier in its
              construction;
              <InformationLink
                inline
                link="https://www.ebay.com/itm/234581339922"
                title="The eBay tubular manifold"
              ></InformationLink>
              , which is a lot cheaper but not as reliable and often needs
              rewelding, or a custom option. I have linked a few of these below.
            </InformationText>
            <InformationLink
              title="SS321L tubular manifold"
              link="https://www.speedingparts.com/p/engine-tuning/exhaust-parts/exhaust-manifold/exhaust-manifold-stainless-steel/exhaust-manifold-audi-5cyl-stainless-steel-321l.html"
            ></InformationLink>
            <InformationLink
              title="mild steel tubular manifold"
              link="https://www.speedingparts.com/p/engine-tuning/exhaust-parts/exhaust-manifold/exhaust-manifold-mild-steel/exhaust-manifold-audi-5-cyl-s2-s4-s6-mild-steel.html"
            ></InformationLink>
            <InformationLink
              title="SS304 tubular manifold"
              link="https://shop.efi-motorsport.com/products/tubular_stainless_equal_length_20v_turbo_exhaust_manifold"
            ></InformationLink>
            <br />
            <CompendiumImageMap
              mapName="exhaust-manifold-parts-map"
              imageSrc={exhaustManifoldPartsImage.src}
              // @ts-ignore
              imageMap={exhaustManifoldPartsImageMap.default}
              clickSetting={clickSetting}
              handleClickCheckbox={handleClickCheckbox}
            />

            <br />

            <div className={styles["part__numbers_list"]}>
              <p className={styles["part__numbers_list-heading"]}>
                part numbers not listed in diagram
              </p>
              <InformationLink
                title="exhaust manifold stud"
                customText="N 901 889 02 (M8x35)"
                link="https://google.com/search?q=N90188902"
              ></InformationLink>
              <InformationCited>
                exhaust manifold stud (shortened) - (M8x29)
              </InformationCited>
            </div>

            <br />
            <InformationLink
              num="00"
              title="Technical Data"
              link="https://forums.quattroworld.com/s4s6/msgs/196904.phtml"
            ></InformationLink>
            <InformationLink
              num="01"
              title="Flow Numbers"
              link="https://forums.quattroworld.com/s4s6/msgs/80650.phtml"
            ></InformationLink>
          </CompendiumArticle>
          {/* Suspension */}
          <CompendiumArticle
            href="suspension"
            title="Suspension"
            models={["100", "A6", "UrS4", "UrS6"]}
          >
            {/* https://forums.quattroworld.com/s4s6/msgs/38532.phtml */}
            {/* https://forums.quattroworld.com/s4s6/msgs/40891.phtml */}
            {/* https://12v.org/urs/suspension.pdf */}
            <InformationText>
              The UrS4, UrS6 and A6/100 all come with the same suspension
              layout, the differences are just in the shocks, springs and rear
              sway bar. Two suspension options were available from the factory:
              1BA the "non sport" suspension, or 1BE, the "sport" suspension.
              The 1BE has stiffer shocks and springs, as well as having a rear
              sway bar (and subframe with mounting provisions), where the 1BA
              has softer springs/shocks and no rear sway bar.
            </InformationText>

            <InformationText>
              For the North American market, the 1992 UrS4 and 1995/1995.5 UrS6
              avants had 1BE suspension by default, and therefore all came with
              rear sway bars. The 93/94 UrS4 and 95/95.5 S6 did not come with
              rear sway bars by default, but the avant subframes can bolt onto
              the sedans (necessary to have the swaybar retrofitted)
            </InformationText>

            <NestedNav showThumbnails="false">
              <NestedNavItem title="1BA parts list" id="1BAsus">
                <NestedNav showThumbnails="false">
                  <NestedNavItem title="rear subframe" id="1BArearsubframe">
                    <CompendiumImageMap
                      mapName="1BArearsubframe"
                      imageSrc={rearSubframePartsImage.src}
                      // @ts-ignore
                      imageMap={rearSubframePartsImageMap1BA.default}
                      clickSetting={clickSetting}
                      handleClickCheckbox={handleClickCheckbox}
                    ></CompendiumImageMap>
                  </NestedNavItem>
                  <NestedNavItem title="spring / shock" id="1BAspringshock">
                    <CompendiumImageMap
                      mapName="1BArearshockandspring"
                      imageSrc={rearShockSpringPartsImage.src}
                      // @ts-ignore
                      imageMap={rearShockSpringPartsImageMap1BA.default}
                      clickSetting={clickSetting}
                      handleClickCheckbox={handleClickCheckbox}
                    ></CompendiumImageMap>
                  </NestedNavItem>
                </NestedNav>
              </NestedNavItem>
              <NestedNavItem title="1BE parts list" id="">
                <NestedNav showThumbnails="false">
                  <NestedNavItem title="rear subframe">
                    <CompendiumImageMap
                      mapName="1BErearsubframe"
                      imageSrc={rearSubframePartsImage.src}
                      // @ts-ignore
                      imageMap={rearSubframePartsImageMap1BE.default}
                      clickSetting={clickSetting}
                      handleClickCheckbox={handleClickCheckbox}
                    ></CompendiumImageMap>
                    <InformationText>
                      part numbers not listed in diagram:
                    </InformationText>
                    <InformationLink
                      title="Rear sway bar"
                      customText="4A0 511 409 B"
                      link=""
                    />
                  </NestedNavItem>
                  <NestedNavItem title="rear shock / spring" id="1BErearss">
                    <CompendiumImageMap
                      mapName="1BErearshockandspring"
                      imageSrc={rearShockSpringPartsImage.src}
                      // @ts-ignore
                      imageMap={rearShockSpringImageMap1BE.default}
                      clickSetting={clickSetting}
                      handleClickCheckbox={handleClickCheckbox}
                    />
                    {/* 1BE spring / shock image map */}
                  </NestedNavItem>
                  <NestedNavItem title="front shock / spring" id="1BEfrontss">
                    <CompendiumImageMap
                      mapName="1BErearshockandspring"
                      imageSrc={frontShockSpringPartsImage.src}
                      // @ts-ignore
                      imageMap={frontShockSpringPartsImageMap1BE.default}
                      clickSetting={clickSetting}
                      handleClickCheckbox={handleClickCheckbox}
                    />
                    {/* 1BE spring / shock image map */}
                  </NestedNavItem>
                </NestedNav>
              </NestedNavItem>
            </NestedNav>
            <InformationText>
              However, most UrS owners do not use stock components when
              rebuilding their suspension - there are a variety of aftermarket
              shocks and springs that are worthy upgrades to the stock
              components.
            </InformationText>
            <InformationText>
              For springs, H&R makes a few offerings for the C4 cars - 29921
              (the green spring, a progressive rate spring), the 29800 (the
              black spring, advertised as being for the Audi 200), and the 29771
              (the blue spring, a 'race' spring that pretty much nobody likes -
              doesn't lower the car more than the 29800 does, and causes the car
              to ride like a dump truck).
            </InformationText>
            <FigureList>
              <FigureListItem
                handlePictureClick={handlePictureClick}
                imageSrc={HnR29921.src}
                figureNum="fig. 1a"
                caption='H&R 29921 ("greens")'
              ></FigureListItem>
              <FigureListItem
                handlePictureClick={handlePictureClick}
                imageSrc={HnR29971.src}
                figureNum="fig. 1b"
                caption='H&R 29971 ("blues")'
              ></FigureListItem>
              <FigureListItem
                handlePictureClick={handlePictureClick}
                imageSrc={HnR29800.src}
                figureNum="fig. 1c"
                caption='H&R 29800 ("blacks")'
              ></FigureListItem>
            </FigureList>
            <InformationText>
              The 29921 and 29771 both have an advertised drop of 1.3" front &
              rear and the 29800 advertises 1.5" front and 1.4" rear. In my
              experience, the 29800s are the best for the avants, since the rear
              will always appear a bit lower than the front with even drops (as
              can be seen by the 29921 avant in fig. 2a below). The fronts on
              29800 are also linear rate springs as opposed to progressive, and
              funnily enough, seem to ride a bit better than the progressive
              rates.
            </InformationText>
            <FigureList>
              <FigureListItem
                handlePictureClick={handlePictureClick}
                imageSrc={UrS6avant_29921.src}
                caption="UrS6 avant with 29921 (greens)"
                figureNum="fig. 2a"
              ></FigureListItem>
              <FigureListItem
                handlePictureClick={handlePictureClick}
                imageSrc={A6wagon_29771.src}
                caption="C4 A6 wagon with 29771 (blues)"
                figureNum="fig. 2b"
              ></FigureListItem>
              <FigureListItem
                handlePictureClick={handlePictureClick}
                imageSrc={UrS6sedan_29800.src}
                caption="UrS6 sedan with 29800 (blacks)"
                figureNum="fig. 2c"
              ></FigureListItem>
              <FigureListItem
                handlePictureClick={handlePictureClick}
                imageSrc={UrS4sedan_92S4spring.src}
                caption="UrS4 sedan with the 92 sport springs"
                figureNum="fig. 2d"
              ></FigureListItem>
              <FigureListItem
                handlePictureClick={handlePictureClick}
                imageSrc={UrS4avant_1BE.src}
                caption="UrS4 avant with 1BE stock springs"
                figureNum="fig. 2e"
              ></FigureListItem>
            </FigureList>
          </CompendiumArticle>
          {/* Turbochargers */}
          <CompendiumArticle
            href="turbos"
            title="Turbochargers"
            models={["UrS4", "UrS6"]}
          >
            <NestedNav showThumbnails="false">
              <NestedNavItem id="stockturbos" title="K24-7000 & K24-7200">
                <InformationText>
                  From the factory, all UrS4 and UrS6s came with a Borg Warner
                  K24-7000 turbocharger. The Audi internal part number on the
                  7000 is{" "}
                  <span className={styles["information__cited"]}>
                    034 145 702,
                  </span>
                  but the turbocharger serial number plate will show{" "}
                  <span className={styles["information__cited"]}>
                    034 145 703B.
                  </span>
                </InformationText>
                <InformationText>
                  A very common upgrade for the UrS4/6 was the RS2 turbo,
                  otherwise known as the K24-7200. It bolts up directly to the
                  stock components without any modification necessary, and
                  compared to the stock turbo, does spool later, but holds
                  stronger through the rev range. Up to 315hp/280whp can safely
                  be achieved on an RS2 turbo using pump (91/93 AKI) gas.
                </InformationText>
                <FigureList>
                  <FigureListItem
                    caption="RS2 turbo"
                    handlePictureClick={handlePictureClick}
                    figureNum="1a"
                    imageSrc={RS2turbo.src}
                  ></FigureListItem>
                  <FigureListItem
                    caption="K24-7000"
                    handlePictureClick={handlePictureClick}
                    figureNum="1b"
                    imageSrc={K247000.src}
                  ></FigureListItem>
                </FigureList>
                <InformationText>
                  More information on the factory turbochargers is available
                  here:{" "}
                  <InformationLink
                    inline
                    link="https://www.audiworld.com/forums/audi-original-s-cars-25/oe-k24-7000-rs2-k24-7200-turbo-info-input-welcomed-2836186/"
                  />{" "}
                  (courtesy of Scott Justusson and UrS4boy)
                </InformationText>
                <InformationText>
                  There are upgraded versions of the K24-7000 and 7200 that are
                  available for sale from various vendors, though most are not
                  well documented as they tend to be somewhat uncommon options
                  when upgrading the turbocharger.
                </InformationText>
                <InformationLink
                  link="https://www.lspeed-racing.de/product_info.php?info=p1925_k24-k7000-step-320-ueberholung-mit-upgrade.html"
                  num="01"
                  title="K24-7000 upgrade"
                ></InformationLink>
                <InformationLink
                  link="https://tteglobal.com/audi/rs2/2.2t/47/tte420-audi-rs2-upgrade-turbocharger"
                  title="TTE420 (upgraded 7200)"
                  num="03"
                ></InformationLink>
                <InformationLink
                  link="https://www.tzr-motorsport.de/epages/61911476.sf/de_DE/?ObjectPath=/Shops/61911476/Products/%22VAG-TTE420%20RS2%5B2%5D%22"
                  num="04"
                  title="TTE420 (upgraded 7200)"
                ></InformationLink>
              </NestedNavItem>
              <NestedNavItem id="K247400" title={`K24-7400 "Volvo Turbo"`}>
                <InformationText>
                  Another very common upgrade for this platform was to use the
                  K24-7400 from the Volvo S60R/V70R (which also came with a five
                  cylinder engine). To use this turbocharger, the 7400 CHRA and
                  compressor cover has to be paired with the 7000 hot side. This
                  requires a bit of machining to enlarge the inner diameter of
                  the hot side to accept the larger turbine wheel of the 7400,
                  and may also require a custom oil feed line (as the stock oil
                  feed will hit the DV boss on the compressor side - see below
                  for a photo of a modified compressor housing).
                </InformationText>
                <InformationText>
                  These turbochargers are pretty great to daily drive on - they
                  spool as fast as the stock turbo, but with the right software
                  and fuel, can output up to 150hp more than stock. Generally,
                  the power numbers on pump gas (91/93 AKI) land around
                  300-330whp with the correct supprting modifications and
                  software. On E85, up to 466whp has been seen on this turbo
                  (this was essentially the limit).
                </InformationText>
                <FigureList>
                  <FigureListItem
                    caption="modified 7400 compressor housing (courtesy of Nick R.)"
                    imageSrc={modified7400housing.src}
                    figureNum="fig. 1a"
                    handlePictureClick={handlePictureClick}
                  ></FigureListItem>
                  <FigureListItem
                    caption="466whp/406wtq dyno graph on E85 (courtesy of Nic Allen)"
                    imageSrc={nicAllen7400Dyno.src}
                    figureNum="fig. 1b"
                    handlePictureClick={handlePictureClick}
                  ></FigureListItem>
                </FigureList>
                {/* display nic allen's car with dyno graph here */}
              </NestedNavItem>
              <NestedNavItem id="GarrettGT" title="Garrett GT">
                <InformationText>
                  In 2010, 034Motorsport was selling a turbo kit for the inline
                  5 20vt platform based on the Garrett GT turbochargers that
                  were available at the time. There turbochargers had K flange
                  hotsides, and therefore could easily be bolted up to the stock
                  exhaust manifold and downpipe with no modification (although
                  many advised using the RS2 exhaust manifold due to heat
                  distribution issues caused by the AAN manifold). As of
                  [8-12-24], the kit is still{" "}
                  <InformationLink
                    link="https://www.034motorsport.com/turbo-kit-audi-i5-20v-garrett-gt.html"
                    inline
                    customText="available for sale on their website."
                  ></InformationLink>{" "}
                </InformationText>
                <InformationText>
                  For about 6 years, I used the GT3071r kit on my daily driver,
                  but used custom software with a standalone ECU (NOT the chips
                  that 034 were selling, as people reported having issues - some
                  even throwing rods out of blocks).{" "}
                  <span
                    style={{ textDecoration: "underline" }}
                    onClick={() => {
                      handleClickArticleName("tuning");
                    }}
                  >
                    See the "Tuning" subsection
                  </span>{" "}
                  for more information on how to handle tuning with these
                  vehicles.
                </InformationText>
              </NestedNavItem>
              <NestedNavItem id="alt-turbo" title="Custom Solutions">
                <InformationText>
                  If you want to go a more adventurous route (one that doesn't
                  involve simple bolt on parts), you have a few possible routes
                  to go. Since the aftermarket exhaust manifolds that land the
                  turbo in the stock location are limited to T3 and the stock K
                  flange, you can either make or have an adapter made for T3/K
                  to Vband, or buy a new exhaust manifold entirely (see options
                  in the{" "}
                  <span
                    style={{ textDecoration: "underline" }}
                    onClick={() => {
                      handleClickArticleName("exhaustmanifold");
                    }}
                  >
                    Exhaust Manifold section.
                  </span>
                  )
                </InformationText>
                <InformationText>
                  Here are a few examples of flange adapters:
                </InformationText>
                <FigureList>
                  <FigureListItem
                    handlePictureClick={handlePictureClick}
                    imageSrc={turboAdapter1.src}
                    caption="T3 to V band adapter, courtesy of @benznotmercedes"
                    figureNum={"1a"}
                  />
                  <FigureListItem
                    handlePictureClick={handlePictureClick}
                    imageSrc={turboAdapter2.src}
                    caption="K flange to V band adapter, courtesy of Geoff Danielson"
                    figureNum={"1b"}
                  />
                </FigureList>
                <InformationText>
                  Note that this will push the turbo further away from the
                  exhaust manifold and you will probably have to adjust the
                  downpipe and airbox setup for use. Instead, you can opt to go
                  tubular:
                </InformationText>
                <FigureList>
                  <FigureListItem
                    handlePictureClick={handlePictureClick}
                    imageSrc={tubularManifold1.src}
                    caption="Tubular manifold on an AAN, courtesy of EngineerCNC on drive2.ru"
                    figureNum={"2a"}
                  />
                  <FigureListItem
                    handlePictureClick={handlePictureClick}
                    imageSrc={tubularManifold2.src}
                    caption="Tubular manifold on an AAN, courtesy of quattro4life on YouTube"
                    figureNum={"2b"}
                  />
                </FigureList>
                <InformationText>
                  In addition to needing a custom downpipe to account for
                  relocation of the turbo and wastegate, this also requires use
                  of a Vband wastegate, like a TiAL MVR or similar.
                </InformationText>
                <InformationText>
                  Additionally, due to being moved further towards the stock
                  location of the fuel filter, many recommend rerouting the fuel
                  lines towards the intake side of the motor and mounting the
                  filter near the brake master cylinder, or underneath the car
                  to prevent the filter from getting hot.
                </InformationText>
              </NestedNavItem>
            </NestedNav>
          </CompendiumArticle>
          {/* Tuning */}
          <CompendiumArticle
            href="tuning"
            title="Tuning"
            models={["UrS4", "UrS6"]}
          >
            <InformationText>
              From the factory, UrS4s and UrS6s with the AAN 5 cylinder engine
              were equipped with a Bosch Motronic 2.3.2 ECU (More information on
              these ECUs can be found in the{" "}
              <span
                style={{ textDecoration: "underline" }}
                onClick={() => {
                  handleClickArticleName("ecu");
                }}
              >
                ECU section
              </span>
              ). Given that these ECUs parse motor and boost data from a pair of
              EEPROMs, These are quite difficult to tune, as the tooling
              required to be able to do so is not cheap or readily available.
            </InformationText>
            <InformationText>
              Once upon a time, a plethora of off-the-shelf options were
              available for these cars, but your best bet these days is to put a
              post out on one of the forums (Yacht Club, quattroworld, Discord,
              S2Forum) and hope that someone is selling a set of EEPROMs or an
              ECU for the hardware you want to run. Below is a list of pictures
              of chips and their required hardware:
            </InformationText>
            <InformationText>
              MTM 1+ was a very common modification on these cars. They required
              a 300KPA (3 bar) MAP sensor to be installed into the ECU in the
              place of the stock 250KPA (2.5 bar) sensor.
            </InformationText>
            <FigureList>
              <FigureListItem
                caption={"MTM 1+ Chipset"}
                imageSrc={MTM1Plus.src}
                handlePictureClick={handlePictureClick}
                figureNum={"1a"}
              />
              <FigureListItem
                caption={
                  "3 bar MAP sensor (located on the bottom side of the ECU)"
                }
                imageSrc={MAPSensor.src}
                handlePictureClick={handlePictureClick}
                figureNum={"1b"}
              />
            </FigureList>
            <InformationText>
              This is a Wetterauer Stage 1 (pictures courtesy of neacail on QW),
              not much is known about this chip but it appears to be in use here
              with the stock 2.5 bar MAP sensor.
            </InformationText>
            <FigureList>
              <FigureListItem
                caption={
                  "Wetterauer Stage 1 Boost Chip (courtesy of neacail on QW)"
                }
                imageSrc={wetterauer1.src}
                handlePictureClick={handlePictureClick}
                figureNum={"2a"}
              />
              <FigureListItem
                caption={
                  "Wetterauer Stage 1 Motor Chip (courtesy of neacail on QW)"
                }
                imageSrc={wetterauer2.src}
                handlePictureClick={handlePictureClick}
                figureNum={"2b"}
              />
            </FigureList>
            <InformationText>
              TAP (Total Audi Performance) also made quite a few chips for
              UrS4/UrS6. Stage 1 and Stage 2 (engine chip 391, boost chip 483)
              allowed use of the stock MAP, Stage 3 required a 3 bar MAP and
              Stage 4 required a 3.2 bar MAP.
            </InformationText>
            <FigureList>
              <FigureListItem
                caption={"TAP Stage 1 / 2 (courtesy of quattron8-JC on QW"}
                imageSrc={TAPstage1or2.src}
                handlePictureClick={handlePictureClick}
                figureNum={"3a"}
              />
            </FigureList>
            <InformationText>
              IA (Intended Acceleration) chips, made by Ned Ritchie, are another
              option. Currently I do not have photos of any of the IA chips, but{" "}
              <InformationLink
                customText="Ned's site"
                inline
                link="https://intendedacceleration.com/pricing.html"
              />{" "}
              is still up and has information on each chipset.
            </InformationText>

            <InformationHeading>
              Tuning on Bosch Motronic 2.3.2 (STOCK ECU)
            </InformationHeading>
            <InformationText>
              If you are looking to tune your car on the stock setup, you need
              the following:
            </InformationText>
            <InformationCited>
              - 2 x EEPROM emulators; PRJ (creator of prjmod software &
              m232.org) recommends the Moates Ostrich, but that's discontinued
              and very difficult to find
            </InformationCited>
            <InformationCited>
              - A windows laptop with TunerPro installed on it
            </InformationCited>
            <InformationCited>
              - The tuning configuration / mapping for TunerPro (.rdx file){" "}
            </InformationCited>
            <InformationCited>
              - (OPTIONAL) A wideband gauge to monitor AFR
            </InformationCited>
            <InformationText>
              Hardware modifications to the ECU are also necessary for this to
              work, the instructions can be found on{" "}
              <InformationLink
                customText="this page of PRJ's wiki"
                link="https://m232.org/index.php/Requirements_and_modifications_for_running_prjmod"
                inline
              />
              .
            </InformationText>
            <InformationText>
              More information is needed on this section, this is as far as I
              know right now. If you know more than I do and want to help
              contribute, email me at{" "}
              <InformationLink
                customText="ani@20vt.help"
                inline
                link="mailto:ani@20vt.help"
              />{" "}
              or check out{" "}
              <InformationLink
                inline
                customText="PRJ's wiki on M2.3.2."
                link="https://m232.org/index.php/Main_Page"
              />
            </InformationText>
            <InformationHeading>
              Standalone ECUs (Plug & Play)
            </InformationHeading>
            <InformationText>
              If you are comfortable ditching the stock ECU in favor of
              something more modern and customizable, there are a few routes to
              go, some with hardware restrictions. Below are the most popular
              PNP (Plug & Play) options that are available for UrS 20vt owners.
              These kits will often come with an adapter harness for (or are
              designed to accept) the stock 55 pin connector that the Motronic
              ECU utilizes. The most you will have to do is pin a few extra
              wires for knock sensing or LSU 4.2/4.9
            </InformationText>
            <InformationText>
              <span style={{ fontWeight: "800" }}>VEMS</span> is the plug & play
              option of choice by many UrS owners, as it has been around for the
              longest, has a decent amount of support and a good UI as well as
              add ons, like an app and a display to quickly monitor values at a
              glance.
            </InformationText>
            <InformationText>
              <span style={{ fontWeight: "800" }}>ECUMaster</span> also makes a
              couple of ECUs that have P&P harnesses available (EMU Classic and
              EMU Black), and are not as widely used. The setup is a bit more
              difficult than VEMS, and without a 60-2 rear main seal replacing
              the stock crank trigger, seems to be a good bit harder to tune
              than VEMS or MaxxECU.
            </InformationText>
            <InformationText>
              <span style={{ fontWeight: "800" }}>MaxxECU</span> is the most
              costly option of the three, but has the best support and is the
              most modern option by far. I recommend going with a MaxxECU Race
              unit, as it has more I/O and the ability to use knock control,
              unlike the Street version.
            </InformationText>
          </CompendiumArticle>
        </CompendiumBody>

        <CompendiumFooter
          handleSettingsClick={handleSettingsClick}
          handleCompendiumAboutClick={handleCompendiumAboutClick}
        />

        <CompendiumAboutModal
          closeModal={closeModal}
          activeModal={activeModal}
        />

        <ClimateControlCh1Modal
          closeModal={closeModal}
          activeModal={activeModal}
        />

        <CompendiumPictureModal
          closeModal={closeModal}
          pictureModalData={pictureModalData}
          activeModal={activeModal}
        />

        <CompendiumSettingsModal
          closeModal={closeModal}
          clickSetting={clickSetting}
          handleClickCheckbox={handleClickCheckbox}
          activeModal={activeModal}
        />
        <Script src="/ImageMapResizer.min.js" />
      </div>
    </>
  );
}
