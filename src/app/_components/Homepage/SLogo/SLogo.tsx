'use client'

import React from "react";
import "./SLogo.css";

function SLogo({color, inElement}: {color: string, inElement?: string}) {
  function logoLocation() {
    if (inElement === "footer") {
      return "logo__big-rhombus in_footer";
    } else {
      return "logo__big-rhombus";
    }
  }

  return (
    <div className="header__logo">
      <div style={{backgroundColor: `${color}`}} className={logoLocation()} id="big-rhombus"></div>
      <div style={{backgroundColor: `${color}`}} className="logo__small-rhombus-1" id="small-rhombus-1"></div>
      <div style={{backgroundColor: `${color}`}} className="logo__small-rhombus-2" id="small-rhombus-2"></div>
    </div>
  );
}

export default SLogo;