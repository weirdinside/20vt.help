import React from "react";
import { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";

//-------------------------------//
//---------IMPORT STYLES---------//
//-------------------------------//

import styles from "./ClimateControl.module.css";
import { cc_codes, cc_ch1_codes } from "../../../../utils/constants";

//-------------------------------//
//---------IMPORT IMAGES---------//
//-------------------------------//

import defaultBackground from "../../../../assets/articles/climate_control_diagnostic/climate-control-images/default.png";

import recirc_depressed from "../../../../assets/articles/climate_control_diagnostic/climate-control-images/recirc_depressed.png";
import topvent_depressed from "../../../../assets/articles/climate_control_diagnostic/climate-control-images/topvent_depressed.png";
import centervent_depressed from "../../../../assets/articles/climate_control_diagnostic/climate-control-images/centervent_depressed.png";
import bottomvent_depressed from "../../../../assets/articles/climate_control_diagnostic/climate-control-images/bottomvent_depressed.png";
import topvent_recirc_depressed from "../../../../assets/articles/climate_control_diagnostic/climate-control-images/topvent_recirc_depressed.png";
import defrost_depressed from "../../../../assets/articles/climate_control_diagnostic/climate-control-images/defrost_depressed.png";
import ac_depressed from "../../../../assets/articles/climate_control_diagnostic/climate-control-images/ac_depressed.png";
import auto_depressed from "../../../../assets/articles/climate_control_diagnostic/climate-control-images/auto_depressed.png";

import LMinus_depressed from "../../../../assets/articles/climate_control_diagnostic/climate-control-images/LMinus_depressed.png";
import LPlus_depressed from "../../../../assets/articles/climate_control_diagnostic/climate-control-images/LPlus_depressed.png";
import RMinus_depressed from "../../../../assets/articles/climate_control_diagnostic/climate-control-images/RMinus_depressed.png";
import RPlus_depressed from "../../../../assets/articles/climate_control_diagnostic/climate-control-images/RPlus_depressed.png";

import topvent from "../../../../assets/articles/climate_control_diagnostic/climate-control-images/right_screen/topvent.png";
import centervent from "../../../../assets/articles/climate_control_diagnostic/climate-control-images/right_screen/centervent.png";
import downvent from "../../../../assets/articles/climate_control_diagnostic/climate-control-images/right_screen/downvent.png";
import fan_icon from "../../../../assets/articles/climate_control_diagnostic/climate-control-images/right_screen/fan_icon.png";
import fanbar from "../../../../assets/articles/climate_control_diagnostic/climate-control-images/right_screen/fanbar.png";
import recirc from "../../../../assets/articles/climate_control_diagnostic/climate-control-images/right_screen/recirc.png";

// CHANNELS 1, 52 AND 53 HAVE CUSTOM INFORMATION THAT MUST BE SHOWN IN TANDEM

//-------------------------------//
//---------MAIN FUNCTION---------//
//-------------------------------//

function ClimateControl({ setActiveModal }) {
  //-------------------------------//
  //-------STATES & VARIABLES------//
  //-------------------------------//

  let temperatureArray = [];
  for (let i = 63; i < 86; i++) {
    temperatureArray.push(String(i));
  }
  temperatureArray.unshift("LO");
  temperatureArray.push("HI");

  const [backlit, setBacklit] = useState(false); // sets whether or not the screen is backlit

  const [airCon, setAirCon] = useState(false); // this sets the AC icon on the left screen
  const [defrost, setDefrost] = useState(false); // this sets the defrost setting on the left screen
  const [autoAir, setAutoAir] = useState(false); // this sets the "AUTO" text on the left screen

  const [activeVents, setActiveVents] = useState({
    top: false,
    center: false,
    bottom: false,
  }); // this is an array of the active vents, valid values are "top", "center" and "bottom"

  // make it so that you can click through the recirc when you're on the codes menu, and add a back button at the top
  // clarify to the user that it is possible to revert to the temperature menu with those stickies (recirc and up), but
  // to just hit the "auto" button now to get back to the temperature menu

  const [tutorialStage, setTutorialStage] = useState(1); // sets which point in the tutorial you're on, if "0" then tutorial is inactive

  const [fanSpeed, setFanSpeed] = useState(1); // this is a number between 0 and 12, sets the fan speed. if the number is 0, the screens turn off

  const [storedTemp, setStoredTemp] = useState(0); // stores the temperature when switching cc states to code, so when the swap back happens, the display picks up

  const [activeImage, setActiveImage] = useState(defaultBackground); // sets the image you see for button states
  const [recircDepressed, setRecircDepressed] = useState(false); // sets whether or not air recirculation is pushed, used for determining the function of the top vent button
  const [mainText, setMainText] = useState(temperatureArray[0]); // sets the main text on the left screen
  const [inMenu, setMenuState] = useState(false);

  // styles for transitions

  const duration = 300;

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
  };

  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };

  // some refs to use for my shicken
  const nodeRef = useRef(null);
  const nodeRef2 = useRef(null);
  const arrowRef = useRef(null);
  const arrowRef2 = useRef(null);

  //-------------------------------//
  //-----------HANDLERS------------//
  //-------------------------------//

  // sets the temperature of the climate control if the menu has not been accessed
  function controlTemperature(operation) {
    if (inMenu === false) {
      if (operation === "+") {
        if (
          temperatureArray.indexOf(mainText) ===
          temperatureArray.length - 1
        ) {
          return;
        }
        setMainText(temperatureArray[temperatureArray.indexOf(mainText) + 1]);
      }
      if (operation === "-") {
        if (temperatureArray.indexOf(mainText) === 0) {
          return;
        }
        setMainText(temperatureArray[temperatureArray.indexOf(mainText) - 1]);
      }
    }
  }

  function controlCodes(operation) {
    if (inMenu === true) {
      if (operation === "+") {
        if (
          cc_codes.findIndex((codeItem) => {
            return codeItem.code === mainText;
          }) ===
          cc_codes.length - 1
        ) {
          return setMainText(cc_codes[0].code);
        }
        setMainText(
          cc_codes[
            cc_codes.findIndex((codeItem) => {
              return codeItem.code === mainText;
            }) + 1
          ].code
        );
      }
      if (operation === "-") {
        if (
          cc_codes.findIndex((codeItem) => {
            return codeItem.code === mainText;
          }) === 0
        ) {
          return setMainText(cc_codes[cc_codes.length - 1].code);
        }
        setMainText(
          cc_codes[
            cc_codes.findIndex((codeItem) => {
              return codeItem.code === mainText;
            }) - 1
          ].code
        );
      }
    }
  }

  function controlFanSpeed(operation) {
    if (operation === "+") {
      if (fanSpeed < 12) {
        return setFanSpeed(fanSpeed + 1);
      }
      return;
    }
    if (operation === "-") {
      if (fanSpeed >= 0) {
        return setFanSpeed(fanSpeed - 1);
      }
      return;
    }
  }

  function toggleVents(ventName) {
    if (ventName in activeVents) {
      if (activeVents[String(ventName)] === true) {
        return setActiveVents({ ...activeVents, [ventName]: false });
      }
      if (activeVents[String(ventName)] === false) {
        return setActiveVents({ ...activeVents, [ventName]: true });
      }
    }
  }

  function findCaptionForCode() {
    return cc_codes[
      cc_codes.findIndex((codeItem) => {
        return codeItem.code === mainText;
      })
    ].caption;
  }

  function findDescriptionForCode() {
    return cc_codes[
      cc_codes.findIndex((codeItem) => {
        return codeItem.code === mainText;
      })
    ].description;
  }

  //-------------------------------//
  //-----------RENDERERS-----------//
  //-------------------------------//

  function showTempOrCode() {
    if (inMenu) {
      return <div className={styles["climatecontrol__codes-text"]}>c</div>;
    } else {
      return (
        <div className={styles["climatecontrol__fahrenheit-text"]}>°F </div>
      );
    }
  }

  function showVents() {
    return (
      <>
        {activeVents.top && (
          <div
            style={{ backgroundImage: `url(${topvent.src})` }}
            id="topvent"
            className={styles["climatecontrol__right-screen_element"]}
          ></div>
        )}
        {activeVents.center && (
          <div
            style={{ backgroundImage: `url(${centervent.src})` }}
            id="centervent"
            className={styles["climatecontrol__right-screen_element"]}
          ></div>
        )}
        {activeVents.bottom && (
          <div
            style={{ backgroundImage: `url(${downvent.src})` }}
            id="bottomvent"
            className={styles["climatecontrol__right-screen_element"]}
          ></div>
        )}
      </>
    );
  }

  function showFanSpeed() {
    let ticks = [];
    for (let i = 0; i < fanSpeed; i++) {
      ticks.push(
        <div key={i} className={styles["right-screen_fanspeed_tick"]}></div>
      );
    }
    return ticks;
  }

  const searchBar = useRef();
  const ch1ItemList = useRef();

  function showCh1Table() {
    let rows = [];

    for (let i = 0; i < cc_ch1_codes.length; i++) {
      rows.push(
        <tr
          className={styles["tr"]}
          key={cc_ch1_codes[i].code + cc_ch1_codes[i].caption}
        >
          <td className={styles["ch1__table-code"]}>{cc_ch1_codes[i].code}</td>
          <td className={styles["ch1__table-caption"]}>
            {cc_ch1_codes[i].caption}
          </td>
        </tr>
      );
    }

    return (
      <>
        <table className={styles["ch1__table"]}>
          <thead>
            <tr className={styles["tr"]}>
              <th width="82px">code</th>
              <th>description</th>
            </tr>
            <tr>
              <td>
                <input
                  ref={searchBar}
                  onChange={() => {
                    searchFunc();
                  }}
                  placeholder="type to search"
                  type="text"
                  className={styles["ch1__search"]}
                ></input>
              </td>
            </tr>
          </thead>
        </table>
        <div className={styles["ch1__lower-table"]}>
          <table>
            <tbody ref={ch1ItemList} className={styles["ch1__table-body"]}>
              {rows}
            </tbody>
          </table>
        </div>
      </>
    );
  }

  function searchFunc() {
    let input = searchBar.current;
    let filter = input.value.toUpperCase();
    let ul = ch1ItemList.current;
    let li = Array.from(ul.getElementsByTagName("tr"));
    li.forEach((item) => {
      let location = item.textContent.toUpperCase().indexOf(filter);
      if (location > -1) {
        item.style.visibility = "visible";
        item.style.display = "table-row";
        item.style.overflow = "";
        item.style.maxHeight = "";
        // item.style.lineHeight = "140%";
      } else {
        item.style.visibility = "hidden";
        item.style.display = "none";
        item.style.overflow = "hidden";
        item.style.maxHeight = "0px";
        // item.style.lineHeight = "0px";
      }
    });
  }

  //-------------------------------//
  //------------ENDPOINT-----------//
  //-------------------------------//

  return (
    <div className={styles["climatecontrol"]}>
      {/* interactive display */}
      <div className={styles["climatecontrol__container"]}>
        {/* main overlay. if the user is new and
          the element has not been interacted with,
          show the tutorial stuff */}
        <CSSTransition
          in={tutorialStage === 1 || tutorialStage === 2}
          nodeRef={nodeRef}
          timeout={duration}
          classNames={{
            enter: `${styles["tutorial__state-enter"]}`,
            enterActive: `${styles["tutorial__state-enter-active"]}`,
            exit: `${styles["tutorial__state-exit"]}`,
            exitActive: `${styles["tutorial__state-exit-active"]}`,
          }}
          unmountOnExit
        >
          <div ref={nodeRef} className={styles["tutorial__state1"]}>
            <div className={styles["tutorial__state1-preventclick"]}></div>
            <h2 className={styles["tutorial__heading"]}>TUTORIAL</h2>
            <p className={styles["tutorial__body"]}>
              Sometimes, you may have to access your trouble codes without
              having access to a VAG-COM or 2x2 cable. In these cases, you can
              view a large list of codes directly from your climate control
              unit.
            </p>
            <p className={styles["tutorial__body"]}>
              Begin by simultaneously pressing and holding the recirculation
              button and top vent button (no need to hold in this demo - simply
              click on both in sequence).
            </p>
            <CSSTransition
              in={tutorialStage === 1}
              nodeRef={arrowRef}
              timeout={duration}
              classNames={{
                enter: `${styles["tutorial__state-enter"]}`,
                enterActive: `${styles["tutorial__state-enter-active"]}`,
                exit: `${styles["tutorial__state-exit"]}`,
                exitActive: `${styles["tutorial__state-exit-active"]}`,
              }}
              unmountOnExit
            >
              <p ref={arrowRef} className={styles["tutorial__arrow-recirc"]}>
                &#9654;
              </p>
            </CSSTransition>
            <CSSTransition
              in={tutorialStage === 2}
              nodeRef={arrowRef2}
              timeout={duration}
              classNames={{
                enter: `${styles["tutorial__state-enter"]}`,
                enterActive: `${styles["tutorial__state-enter-active"]}`,
                exit: `${styles["tutorial__state-exit"]}`,
                exitActive: `${styles["tutorial__state-exit-active"]}`,
              }}
              unmountOnExit
            >
              <p ref={arrowRef2} className={styles["tutorial__arrow-topvent"]}>
                &#9654;
              </p>
            </CSSTransition>
          </div>
        </CSSTransition>

        <CSSTransition
          in={tutorialStage === 3}
          nodeRef={nodeRef2}
          timeout={duration}
          classNames={{
            enter: `${styles["tutorial__state-enter"]}`,
            enterActive: `${styles["tutorial__state-enter-active"]}`,
            exit: `${styles["tutorial__state-exit"]}`,
            exitActive: `${styles["tutorial__state-exit-active"]}`,
          }}
          unmountOnExit
        >
          <div className={styles["tutorial__state3"]}>
            <div
              ref={nodeRef2}
              className={styles["tutorial__state3-coverleft"]}
            ></div>
            <div
              ref={nodeRef2}
              className={styles["tutorial__state3-coverright"]}
            >
              <h2
                style={{ textAlign: "left", marginRight: "5%" }}
                className={styles["tutorial__heading"]}
              >
                TUTORIAL
              </h2>
              <p
                style={{ marginRight: "5%" }}
                className={styles["tutorial__body"]}
              >
                Great! You're now in the menu that shows you the problem codes.
                In the A6/100 and UrS4/6, there are a total of 61 channels.
              </p>
              <p
                style={{ marginRight: "5%" }}
                className={styles["tutorial__body"]}
              >
                You can use the + and - buttons on the left side of the face to
                change the code you'd like to view.
              </p>

              <button
                onClick={() => {
                  setTutorialStage(4);
                }}
                className={`${styles["tutorial__state3-next"]} ${styles["btn"]}`}
              >
                cool, what's next?
              </button>
            </div>
          </div>
        </CSSTransition>

        <CSSTransition
          in={tutorialStage === 4}
          nodeRef={nodeRef}
          timeout={duration}
          classNames={{
            enter: `${styles["tutorial__state-enter"]}`,
            enterActive: `${styles["tutorial__state-enter-active"]}`,
            exit: `${styles["tutorial__state-exit"]}`,
            exitActive: `${styles["tutorial__state-exit-active"]}`,
          }}
          unmountOnExit
        >
          <div ref={nodeRef} className={styles["tutorial__state4"]}>
            <div className={styles["tutorial__state4-cover"]}>
              <h2 className={styles["tutorial__heading"]}>TUTORIAL</h2>
              <p className={styles["tutorial__body"]}>
                To view the status of the code you selected, you must press the
                recirculation button.
              </p>
              <p className={styles["tutorial__body"]}>
                However, in this demo, you don't have to push the recirculation
                button when in the codes menu - the description of what you can
                find in each channel will be shown below.
              </p>
              <button
                onClick={() => {
                  setTutorialStage(5);
                }}
                style={{ right: "2%" }}
                className={`${styles["tutorial__state3-next"]} ${styles["btn"]}`}
              >
                sweet, sounds good! anything else?
              </button>
            </div>
          </div>
        </CSSTransition>

        <CSSTransition
          in={tutorialStage === 5}
          nodeRef={nodeRef2}
          timeout={duration}
          classNames={{
            enter: `${styles["tutorial__state-enter"]}`,
            enterActive: `${styles["tutorial__state-enter-active"]}`,
            exit: `${styles["tutorial__state-exit"]}`,
            exitActive: `${styles["tutorial__state-exit-active"]}`,
          }}
          unmountOnExit
        >
          <div ref={nodeRef2} className={styles["tutorial__state5"]}>
            <h2 className={styles["tutorial__heading"]}>TUTORIAL</h2>
            <p
              style={{ marginRight: "5%" }}
              className={styles["tutorial__body"]}
            >
              If you'd like to exit the diagnostic menu, you can hit the "AUTO"
              air button.
            </p>
            <p
              style={{ marginRight: "5%" }}
              className={styles["tutorial__body"]}
            >
              {" "}
              In your car, you can also hit the recirculation and top vent
              buttons like you did to get into the diagnostic menu, but due to
              the fact that you can't click two places at once on a computer,
              the "AUTO" button is your only way out.
            </p>
            <p
              style={{ marginRight: "5%" }}
              className={styles["tutorial__body"]}
            >
              {" "}
              That's it! I hope this comes in handy if you ever need it (and
              sincerely hope you never do){" "}
            </p>
            <p className={styles["tutorial__arrow-auto"]}>&#9664;</p>
            <button
              onClick={() => {
                setTutorialStage(0);
                setMenuState(false);
                setMainText(temperatureArray[0]);
              }}
              style={{ right: "7%", bottom: "5%" }}
              className={`${styles["tutorial__state3-next"]} ${styles["btn"]}`}
            >
              exit tutorial
            </button>
          </div>
        </CSSTransition>

        {/* recirculation button */}
        <div
          onMouseDown={() => {
            if (!inMenu) {
              setActiveImage(recirc_depressed.src);
              setRecircDepressed(true);
            }
            if (inMenu) {
              setActiveImage(recirc_depressed.src);
            }
          }}
          onMouseUp={() => {
            if (tutorialStage === 1) {
              setTutorialStage(2);
            }
            if (!inMenu && recircDepressed) {
              return;
            }
            if (inMenu) {
              setActiveImage(defaultBackground.src);
            }
          }}
          className={`${styles["recirc_button"]} ${styles["button"]}`}
        ></div>

        {/* top vent button */}
        <div
          onMouseDown={() => {
            if (recircDepressed) {
              setActiveImage(topvent_recirc_depressed.src);
            }
            if (!recircDepressed) {
              setActiveImage(topvent_depressed.src);
            }
            toggleVents("top");
          }}
          onMouseUp={() => {
            if (tutorialStage === 2) {
              setTutorialStage(3);
            }
            setActiveImage(defaultBackground.src);
            if (recircDepressed) {
              if (activeVents.top) {
                toggleVents("top");
              }
              setMenuState(true);
              setStoredTemp(mainText);
              setMainText(cc_codes[0].code);
              setActiveImage(defaultBackground.src);
              setRecircDepressed(false);
              if (inMenu === true) {
                setMainText(storedTemp);
                setMenuState(false);
                setActiveImage(defaultBackground.src);
                setRecircDepressed(false);
              }
            }
          }}
          className={`${styles["topvent_button"]} ${styles["button"]}`}
        ></div>

        {/* center vent */}
        <div
          onMouseDown={() => {
            toggleVents("center");
            setActiveImage(centervent_depressed.src);
          }}
          onMouseUp={() => {
            setAutoAir(false);
            setRecircDepressed(false);
            setActiveImage(defaultBackground.src);
          }}
          className={`${styles["centervent_button"]} ${styles["button"]}`}
        ></div>

        {/* bottom vent */}
        <div
          onMouseDown={() => {
            toggleVents("bottom");
            setActiveImage(bottomvent_depressed.src);
          }}
          onMouseUp={() => {
            setAutoAir(false);
            setRecircDepressed(false);
            setActiveImage(defaultBackground.src);
          }}
          className={`${styles["bottomvent_button"]} ${styles["button"]}`}
        ></div>

        {/* auto button */}
        <div
          onMouseDown={() => {
            setActiveImage(auto_depressed.src);
          }}
          onMouseUp={() => {
            if (tutorialStage === 5) {
              setTutorialStage(0);
            }
            setAutoAir(true);
            setFanSpeed(12);
            setActiveVents({ top: true, center: true, bottom: true });
            setActiveImage(defaultBackground.src);
            if (inMenu === true) {
              setMainText(storedTemp);
              setMenuState(false);
              setActiveImage(defaultBackground.src);
              setRecircDepressed(false);
            }
          }}
          className={`${styles["auto_button"]} ${styles["button"]}`}
        ></div>

        {/* defrost button */}
        <div
          onMouseDown={() => {
            setActiveImage(defrost_depressed.src);
            // setMenuState(false);
            // setMainText(storedTemp);
          }}
          onMouseUp={() => {
            setActiveImage(defaultBackground.src);
          }}
          className={`${styles["defrost_button"]} ${styles["button"]}`}
        ></div>

        {/* ac button */}
        <div
          onMouseDown={() => {
            setActiveImage(ac_depressed.src);
            // setMenuState(false);
            // setMainText(storedTemp);
          }}
          onMouseUp={() => {
            setActiveImage(defaultBackground.src);
          }}
          className={`${styles["ac_button"]} ${styles["button"]}`}
        ></div>

        {/* LMinus button */}

        <div
          // if we're inCode here, this should take you back to the inMenu and display the code you're on
          onMouseUp={() => {
            setActiveImage(defaultBackground.src);
          }}
          onMouseDown={() => {
            setRecircDepressed(false);
            setActiveImage(LMinus_depressed.src);
            controlCodes("-");
            controlTemperature("-");
          }}
          className={`${styles["LMinus_button"]} ${styles["button"]}`}
        ></div>

        {/* LPlus button */}
        <div
          // if we're inCode here, this should take you back to the inMenu and display the code you're on
          onMouseUp={() => {
            setActiveImage(defaultBackground.src);
          }}
          onMouseDown={() => {
            setRecircDepressed(false);
            setActiveImage(LPlus_depressed.src);
            controlTemperature("+");
            controlCodes("+");
          }}
          className={`${styles["LPlus_button"]} ${styles["button"]}`}
        ></div>

        {/* RMinus button */}
        <div
          onMouseUp={() => {
            setActiveImage(defaultBackground.src);
          }}
          onMouseDown={() => {
            setRecircDepressed(false);
            controlFanSpeed("-");
            setActiveImage(RMinus_depressed.src);
            setAutoAir(false);
          }}
          className={`${styles["RMinus_button"]} ${styles["button"]}`}
        ></div>

        {/* RPlus button */}
        <div
          onMouseUp={() => {
            setActiveImage(defaultBackground.src);
          }}
          onMouseDown={() => {
            setRecircDepressed(false);
            controlFanSpeed("+");
            setActiveImage(RPlus_depressed.src);
            setAutoAir(false);
          }}
          className={`${styles["RPlus_button"]} ${styles["button"]}`}
        ></div>

        <div className={styles["climatecontrol__main-screen"]}>
          {autoAir && !inMenu ? (
            <p className={styles["climatecontrol__auto-text"]}>AUTO</p>
          ) : null}

          {showTempOrCode()}
          <p className={styles["climatecontrol__main-screen-text"]}>
            {mainText}
          </p>
        </div>
        <div className={styles["climatecontrol__aux-screen"]}>
          <p className={styles["climatecontrol__aux-screen-text"]}></p>
        </div>

        {/* visual elements */}

        <div className={styles["climatecontrol__right-screen"]}>
          <div className={styles["right-screen_fanspeed"]}>
            {showFanSpeed()}
          </div>
          {!autoAir ? (
            <p className={styles["right-screen_manual"]}>man</p>
          ) : null}
          {showVents()}

          {recircDepressed ? (
            <div
              style={{ backgroundImage: `url(${recirc.src})` }}
              id="recirc"
              className={styles["climatecontrol__right-screen_element"]}
            ></div>
          ) : null}

          <div
            style={{ backgroundImage: `url(${fan_icon.src})` }}
            id="fan_icon"
            className={styles["climatecontrol__right-screen_element"]}
          ></div>
          <div
            style={{ backgroundImage: `url(${fanbar.src})` }}
            id="fanbar"
            className={styles["climatecontrol__right-screen_element"]}
          ></div>
        </div>

        <img
          src={activeImage.src}
          alt="clicked image"
          className={styles["climatecontrol__image-top"]}
        />
        <img
          src={defaultBackground.src}
          alt="default"
          className={styles["climatecontrol__image-bottom"]}
        />
      </div>

      {/* information container */}

      <div className={styles["information__container"]}>
        <button
          onClick={() => {
            if (tutorialStage > 0) {
              setTutorialStage(0);
            } else {
              setActiveImage(defaultBackground.src);
              setTutorialStage(1);
            }
            setMenuState(false);
            setMainText(temperatureArray[0]);
          }}
          className={`${styles["tutorial__toggle"]} ${styles["btn"]} ${
            tutorialStage > 0 ? styles["active"] : null
          }`}
        >
          {tutorialStage > 0 ? "click to exit tutorial" : "click for tutorial"}
        </button>
        <h1 className={styles["information__title"]}>
          {!inMenu ? "Diagnostic Information" : `Diagnostic Code: ${mainText}`}
        </h1>
        <p
          style={{ fontStyle: "italic", fontWeight: "700" }}
          className={styles["information__body"]}
        >
          {!inMenu
            ? "Please enter the diagnostic menu and scroll to a code to display information about it."
            : findCaptionForCode()}
        </p>
        <p className={styles["information__body"]}>
          {inMenu ? findDescriptionForCode() : null}
        </p>
        {mainText === "01" ? showCh1Table() : null}
      </div>
    </div>
  );
}

export default ClimateControl;
