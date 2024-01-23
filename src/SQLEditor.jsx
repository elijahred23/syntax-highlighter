import React, { useState, useRef, useEffect } from 'react';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import sql from 'react-syntax-highlighter/dist/esm/languages/hljs/sql';
import { idea } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';

SyntaxHighlighter.registerLanguage('sql', sql);

const EditableSyntaxHighlighter = () => {
  const [code, setCode] = useState(`select * from pov.master`);
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef(null);

  // Focus on the textarea when it's time to edit
  useEffect(() => {
    if (isEditing) {
      textareaRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <>
      <div
        className="relative flex bg-[#282a36]"
        tabIndex={0}
        onClick={() => {
          setIsEditing(true);
        }}
        onBlur={(event) => {
          // Checking if the newly focused element is not the textarea
          if (textareaRef.current && !textareaRef.current.contains(event.relatedTarget)) {
            setIsEditing(false);
          }
        }}
      >
        {isEditing ? (
          <textarea
            className="absolute inset-0 resize-none bg-transparent p-2 font-mono caret-white outline-none z-10"
            ref={textareaRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{ color: 'white' }} // Explicitly setting text color
            onFocus={() => setIsEditing(true)}
            onBlur={() => setIsEditing(false)}
          />
        ) : null}
        {!isEditing ? (
          <SyntaxHighlighter
            language="sql"
            style={idea}
            customStyle={{
              flex: '1',
              background: 'transparent',
              minHeight: '100px',
            }}
          >
            {code}
          </SyntaxHighlighter>
        ) : null}
      </div>
    </>
  );
};

export default EditableSyntaxHighlighter;
