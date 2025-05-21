import React, { useContext, useEffect, useState } from "react";
import styles from "./CompendiumArticle.module.css";

import Information from "./Information/Information";
import TitleBox from "./TitleBox/TitleBox";
import { SearchContext } from "@/app/contexts/SearchProvider";

// goal - serialize these components

function CompendiumArticle({
  children,
  title = "Untitled",
  models = ["N/A"],
}: {
  children: React.ReactNode | React.ReactNode[];
  title: string;
  models: string[];
}) {
  //   const activeClass = styles["active"];
  const [activeClass, setActiveClass] = useState("");
  const [articleActive, setArticleState] = useState(false);
  // const articleRef = useRef();

  const { addTextContent, activeArticles, searchTerm } =
    useContext(SearchContext);

  function extractText(children: React.ReactNode): string {
    if (typeof children === "string") {
      return children.toLowerCase();
    }
    if (Array.isArray(children)) {
      return children.map(extractText).join(" ").toLowerCase();
    }
    if (
      typeof children === "object" &&
      children !== null &&
      "props" in children
    ) {
      return extractText(children.props.children).toLowerCase();
    }
    return "";
  }

  useEffect(() => {
    const extractedText = extractText(children);
    addTextContent({ name: title, textContent: extractedText });
  }, [children]);

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
    <li
      style={
        activeArticles?.includes(title) || !searchTerm
          ? { display: "block" }
          : {
              display: "none",
            }
      }
      className={styles["index__list_item"]}
    >
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
      />

      <Information activeClass={activeClass}>{children}</Information>
    </li>
  );
}

export default CompendiumArticle;
