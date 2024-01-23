const highlightSyntax = (text) => {
    const isUpperCase = text === text.toUpperCase();

    // Regular expression to match single or double quoted text
    const quoteRegex = /(["'])(?:(?=(\\?))\2.)*?\1/g;

    // Regular expression to match numbers (integers and floating-point)
    const numberRegex = /\b\d+(\.\d+)?\b/g;

    // Highlight text within quotes
    const highlightedQuotes = text.replace(quoteRegex, `<span class="quote">$&</span>`);

    // Highlight numbers
    const highlightedNumbers = highlightedQuotes.replace(numberRegex, `<span class="number">$&</span>`);

    const words = highlightedNumbers.split(' ');

    const highlightedWords = words.map((word, index) => {
      const cleanWord = word.replace(/<[^>]+>/g, ''); // Remove HTML tags for keyword comparison
      const isKeyword = sqlKeywords.includes(cleanWord.toLowerCase());
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