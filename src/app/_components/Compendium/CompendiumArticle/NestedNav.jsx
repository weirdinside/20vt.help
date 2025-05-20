import React, { cloneElement } from "react";
import { useState, useId } from "react";
import styles from "../CompendiumContent.module.css"

//------------------------------------//
//           COMPONENT ENTRY          //
//------------------------------------//

function NestedNav({ children, showThumbnails="true" }) {

  //------------------------------------//
  //         STATES / VARIABLES         //
  //------------------------------------//

  // the below reassigns the children of this component to
  // a mutable array. initally there are no ID values, but
  // this assigns an ID to every child without user input

  const newChildren = children.map(child => {return cloneElement(child, { id: useId() })});

  // if showThumbnails is false, get rid of the thumb div

  const [activeArticle, setActiveArticle] = useState(""); // sets the article to be rendered
  const [nestClasses, setNestClasses] = useState(`${styles["figure__nest"]}`); // sets CSS to hide/show the main nav grid
  const [collapsedClasses, setCollapsedClasses] = useState(
    `${styles["collapsed__nest-container"]}`,
  ); // sets CSS to hide/show the collapsed nav items

  //------------------------------------//
  //             HANDLERS               //
  //------------------------------------//

  // onClick handler that sets the visible info, shows the collapsed nav and hides the main nav grid
  function handleClickSubheading(id) {
    setCollapsedClasses(
      `${styles["collapsed__nest-container"]} ${styles["active"]}`,
    );
    setNestClasses(`${styles["figure__nest"]} ${styles["hidden"]}`);
    setActiveArticle(id);
  }

  // onClick handler that gets rid of any visible info and reverts the grid back to its default state
  function handleClickBack() {
    setCollapsedClasses(`${styles["collapsed__nest-container"]}`);
    setNestClasses(`${styles["figure__nest"]}`);
    setActiveArticle("");
  }

  //------------------------------------//
  //             RENDERERS              //
  //------------------------------------//

  // renders items in the main navigation grid that correspond to the children of this component
  function renderExpandedViewItem(title, id, thumbnail) {
    let imageItem = <></>
    if(showThumbnails === "true"){
      imageItem = <div style={{ backgroundSize: "cover", backgroundImage: `url(${thumbnail})`}} className={styles["figure__nest-item_image"]}></div>
    }

    return (
      <div
        id={id}
        key={id}
        onClick={() => {
          handleClickSubheading(id)
        }}
        className={styles["figure__nest-item"]}
      >
        {imageItem}
        <p className={styles["figure__nest-item_title"]}>{title}</p>
      </div>
    );
  }

  // renders items in the collapsible nav grid that correspond to the children of this component
  function renderCollapsedViewItem(title, id) {
    // this handles the active class view - it highlights the collapsed nav item that is selected
    let activeStyles = {};
    if (activeArticle === id) {
      activeStyles = { backgroundColor: "#cf2a2a", color: "white" };
    } else {
      activeStyles = {};
    }

    // main JSX return
    return (
      <p
        id={id}
        onClick={() => {
          handleClickSubheading(id);
        }}
        key={id}
        style={activeStyles}
        className={styles["collapsed__nest-item"]}
      >
        {title}
      </p>
    );
  }

  //------------------------------------//
  //               ENDPOINT             //
  //------------------------------------//

  return (
    <div className={styles["figure__nest-container"]}>
      {/* collapsed nest navigation */}
      <div className={collapsedClasses}>
        <p onClick={handleClickBack} className={styles["collapsed__nest-back"]}>
          {"<"} back
        </p>
        <div className={styles["collapsed__nest"]}>
          {newChildren.map((child) => {
            return renderCollapsedViewItem(child.props.title, child.props.id);
          })}
        </div>
      </div>

      {/* main navigation with pictures/expanded view */}
      <div className={nestClasses}>
        {newChildren.map((child) => {
          return renderExpandedViewItem(child.props.title, child.props.id, child.props.thumbnail);
        })}
      </div>

      <div className={styles["nest__item_information"]}>
        {newChildren.map((child) => { // cycle through the list of children of the FigureNest
          if (child.props.id === activeArticle) { // if the article is active,
            return child.props.children; // display the children of that topic
          } else {
            return; // show nothing if nothing is selected
          }
        })}
      </div>
    </div>
  );
}

export default NestedNav;
