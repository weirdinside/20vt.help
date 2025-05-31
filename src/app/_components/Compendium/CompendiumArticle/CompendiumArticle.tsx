import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./CompendiumArticle.module.css";

import Information from "./Information/Information";
import TitleBox from "./TitleBox/TitleBox";
import { SearchContext } from "@/app/contexts/SearchProvider";

function CompendiumArticle({
  children,
  href="#",
  title = "Untitled",
  models = ["N/A"],
}: {
  children: React.ReactNode | React.ReactNode[];
  href: string;
  title: string;
  models: string[];
}) {
  const [activeClass, setActiveClass] = useState("");
  const [articleActive, setArticleState] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  
  const articleContentRef = useRef(null);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

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

  const clearAllTimeouts = () => {
    timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
    timeoutRefs.current = [];
  };

  function handleTitleClick() {
    clearAllTimeouts();
    
    if (articleActive === false) {
      setActiveClass("active");
      setArticleState(true);
      setAnimationClass("enter");
      
      const timeout1 = setTimeout(() => {
        setAnimationClass("enter-active");
      }, 10);
      
      const timeout2 = setTimeout(() => {
        setAnimationClass("enter-done");
      }, 600);
      
      timeoutRefs.current = [timeout1, timeout2];
    } else {
      setActiveClass("");
      setAnimationClass("exit");
      
      const timeout1 = setTimeout(() => {
        setAnimationClass("exit-active");
      }, 10);
      
      const timeout2 = setTimeout(() => {
        setArticleState(false);
        setAnimationClass("");
      }, 600);
      
      timeoutRefs.current = [timeout1, timeout2];
    }
  }

  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, []);

  const isActive = articleActive || animationClass.includes("exit");

  return (
    <li
      id={href}
      style={
        activeArticles?.includes(title) || !searchTerm
          ? { display: "block" }
          : { display: "none" }
      }
      className={`${styles["index__list_item"]} ${
        activeArticles && searchTerm && styles["searchactive"]
      }`}
    >
      <TitleBox
        handleTitleClick={handleTitleClick}
        activeClass={activeClass}
        models={models}
        title={title}
      />
      
      {isActive && (
        <div 
          className={`${styles['index__list_information']} ${
            animationClass ? styles[`index__list_information-${animationClass}`] : ''
          }`} 
          ref={articleContentRef}
        >
          {children}
        </div>
      )}
    </li>
  );
}

export default CompendiumArticle;