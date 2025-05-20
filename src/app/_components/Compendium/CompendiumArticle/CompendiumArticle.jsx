import { React, useRef, useEffect, useState } from "react";
import styles from "./CompendiumArticle.module.css";

import TitleBox from "./TitleBox/TitleBox";
import Information from "./Information/Information";

// goal - serialize these components

function CompendiumArticle({ children, title="Untitled", models=["N/A"] }) {
  //   const activeClass = styles["active"];
  const [activeClass, setActiveClass] = useState("");
  const [articleActive, setArticleState] = useState(false);
  // const articleRef = useRef();

  function handleTitleClick() {
    if (articleActive === false) {
      setActiveClass("active");
      setArticleState(true);
    }
    if (articleActive === true) {
      setActiveClass("");
      setArticleState(false);
    }
  }

  return (
    <li className={styles["index__list_item"]}>
      {/* TitleBox is a component that comes at the top of every article 
      and acts as the trigger for the viewability for the rest of the component.
      It takes two props, which are named below:

      models: an array of strings of which models the article pertains to, generally
      UrS4, UrS6, A6, 100, 5000, 200. formatted as such: models={['UrS4', 'UrS6']}
      
      title: string of title of the article */}
      <TitleBox
        handleTitleClick={handleTitleClick}
        activeClass={activeClass}
        models={models}
        title={title}
      ></TitleBox>

      <Information activeClass={activeClass}>{children}</Information>
    </li>
  );
}

export default CompendiumArticle;
