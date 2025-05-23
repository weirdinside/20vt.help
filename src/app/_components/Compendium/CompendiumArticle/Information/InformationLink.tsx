import React from "react";
import styles from "../../CompendiumContent.module.css";

function InformationLink({
  num,
  title,
  link,
  inline = false,
  customText = "",
}: {
  num?: string;
  title?: string;
  link: string;
  inline?: boolean;
  customText?: string;
}) {
  function reduceLink() {
    function getPosition({
      string,
      subString,
      index,
    }: {
      string: string;
      subString: string;
      index: number;
    }) {
      return string.split(subString, index).join(subString).length;
    }
    if (link.startsWith("https://www.") || link.startsWith("http://www.")) {
      return link.slice(
        link.indexOf(".") + 1,
        getPosition({ string: link, subString: "/", index: 3 })
      );
    } else if (link.startsWith("http://") || link.startsWith("https://")) {
      return link.slice(
        getPosition({ string: link, subString: "/", index: 2 }) + 1,
        getPosition({ string: link, subString: "/", index: 3 })
      );
    } else {
      return link.slice(
        0,
        getPosition({ string: link, subString: "/", index: 1 })
      );
    }
  }
  if (customText && !inline) {
    return (
      <p className={styles["information__cited"]}>
        {num} {title} -{" "}
        <a
          className={styles["information__cited_link"]}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {customText}
        </a>
      </p>
    );
  }

  if (!inline) {
    return (
      <p className={styles["information__cited"]}>
        {num} {title} -{" "}
        <a
          className={styles["information__cited_link"]}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {reduceLink()}
        </a>
      </p>
    );
  }
  if (inline) {
    return (
      <span
        style={{ textDecoration: "underline" }}
        className={styles["information__cited_link"]}
        rel="noreferrer noopener"
      >
        {" "}
        <a target="_blank" href={link}>
          {customText ? customText : reduceLink()}
        </a>
      </span>
    );
  }
}

export default InformationLink;
