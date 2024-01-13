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
        // Replace this with your actual syntax highlighting logic
      
        const isUpperCase = text === text.toUpperCase(); // Check if the input text is in uppercase
      
        const words = text.split(' ');
      
        const highlightedWords = words.map((word, index) => {
          const isKeyword = sqlKeywords.includes(word.toLowerCase());
          const trimmedWord = word.trim(); // Trim any leading/trailing spaces
          const isLastWord = index === words.length - 1; // Check if it's the last word
      
          // Check if it's the last word and has a space at the end
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
