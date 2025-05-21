"use client";

import React, { createContext, useEffect, useRef, useState } from "react";
import { Trie } from "../utils/Trie";

type article = {
  name: string;
  textContent: string;
};

type SearchProviderProps = {
  textRegistry: article[];
  activeArticles: string[];
  searchTerm: string;
  setSearchTerm: (arg0: string) => void;
  addTextContent: (arg0: article) => void;
};

const defaultContext: SearchProviderProps = {
  textRegistry: [],
  activeArticles: [],
  searchTerm: "",
  setSearchTerm: () => {},
  addTextContent: () => {},
};

export const SearchContext = createContext(defaultContext);

export function SearchProvider({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  const [textRegistry, setTextRegistry] = useState<article[]>([]);
  const [activeArticles, setActiveArticles] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const trie = useRef(new Trie());

  function addTextContent({ name, textContent }: article) {
    setTextRegistry((prev) => {
      if (prev.some((article) => article.name === name)) return prev;
      trie.current.insert(textContent, name);
      return [...prev, { name, textContent }];
    });
  }

  useEffect(
    function checkSearchMatch() {
      const cleaned = searchTerm.replace(/[{\[+=\/]/g, "").toLowerCase();
      console.log (cleaned)
      const results = trie.current.search(cleaned);
      console.log(results)
      setActiveArticles(results);
    },
    [searchTerm]
  );

  return (
    <SearchContext.Provider
      value={{
        textRegistry,
        activeArticles,
        searchTerm,
        setSearchTerm,
        addTextContent,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
