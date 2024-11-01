'use client'

import React from "react";
import "./SLogo.css";

function SLogo(inElement) {
  function logoLocation(inElement) {
    if (inElement === "footer") {
      return "logo__big-rhombus in_footer";
    } else {
      return "logo__big-rhombus";
    }
  }

  return (
    <div className="header__logo">
      <div className={logoLocation(inElement)} id="big-rhombus"></div>
      <div className="logo__small-rhombus-1" id="small-rhombus-1"></div>
      <div className="logo__small-rhombus-2" id="small-rhombus-2"></div>
    </div>
  );
}

export default SLogo;