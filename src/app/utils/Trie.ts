class TrieNode {
  children: Map<string, TrieNode>; // each following node
  articleNames: Set<string>; // keeps track of the articles to display based on which node we are on

  constructor() {
    this.children = new Map();
    this.articleNames = new Set();
  }
}

export class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(textContent: string, articleName: string) {
    const words = textContent.toLowerCase().split(" "); // arrays the words in the textContent since the input is a string
    if (!words) return; // early exit
    for (const word of words) {
      // for each word in the words array
      let node = this.root;
      for (const char of word) {
        // for each character in the word,
        if (!node.children.has(char)) {
          // if the character doesn't have a child node from the current one,
          node.children.set(char, new TrieNode()); // create a new node with the character and add it as a child
        }
        node = node.children.get(char)!; // set the node as the next node
        node.articleNames.add(articleName); // add the articleName to the list for this specific query
      }
    }
  }

  search(query: string): string[] {
    const searchTerms = query.toLowerCase().split(" ");
    if (!searchTerms) return [];

    let resultSet: Set<string> | null = null;

    for (const word of searchTerms) {
      let node = this.root;

      for (const char of word) {
        if (!node.children.has(char)) return [];
        node = node.children.get(char)!;
      }

      const articlesForTerm: Set<string> = node.articleNames;
      if (resultSet === null) {
        resultSet = new Set(articlesForTerm);
      } else {
        resultSet = new Set(
          [...resultSet].filter((x: string) => articlesForTerm.has(x))
        );
        if (resultSet.size === 0) return [];
      }
    }

    if (resultSet === null) {
      return [];
    } else {
      return Array.from(resultSet);
    }
  }
}
