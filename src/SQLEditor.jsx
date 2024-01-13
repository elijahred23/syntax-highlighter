import React, { useState, useEffect } from 'react';
import {sqlKeywords} from './ReservedWords.js';
import './SyntaxHighlighter.css'; 
const SyntaxHighlighter = () => {
    const [htmlContent, setHtmlContent] = useState('');
    const [sqlCode, setSQLCode] = useState('');

    const handleInput = (e) => {
        const rawText = e.currentTarget.textContent;
        setSQLCode(rawText);
        setHtmlContent(highlightSyntax(rawText));
    };
    const highlightSyntax = (text) => {
      const isUpperCase = text === text.toUpperCase();
  
      // Regular expression to match single or double quoted text
      const quoteRegex = /(["'])(?:(?=(\\?))\2.)*?\1/g;
  
      // Highlight text within quotes
      const highlightedQuotes = text.replace(quoteRegex, `<span class="quote">$&</span>`);
  
      const words = highlightedQuotes.split(' ');
  
      const highlightedWords = words.map((word, index) => {
          const isKeyword = sqlKeywords.includes(word.replace(/<[^>]+>/g, '').toLowerCase());
          const trimmedWord = word.trim();
          const isLastWord = index === words.length - 1;
  
          if (isLastWord && word.endsWith(' ')) {
              const highlighted = isKeyword
                  ? `<span class="keyword">${isUpperCase ? trimmedWord.toUpperCase() : trimmedWord}</span> `
                  : trimmedWord;
              return highlighted;
          } else {
              const highlighted = isKeyword
                  ? `<span class="keyword">${isUpperCase ? word.toUpperCase() : word}</span>`
                  : word;
              return highlighted;
          }
      });
  
      return highlightedWords.join(' ');
  };
  
      
      

    useEffect(() => {
        // This is necessary to place the cursor at the end of the text after each update
        const el = document.getElementById("editableDiv");
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(el);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
        el.focus();
    }, [htmlContent]);

    return (
        <>
            <div
                id="editableDiv"
                contentEditable
                onInput={handleInput}
                dangerouslySetInnerHTML={{ __html: htmlContent }}
                className="editable-div"
                style={{fontFamily:"monospace", fontSize: "2em"}}
            />
        </>
    );
};

export default SyntaxHighlighter;
