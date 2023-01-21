const toCapitalize = (word: string): string => {
  const capitalized = word.charAt(0).toUpperCase() + word.slice(1);
  return capitalized;
};

const toCapitalizeWordsSentence = (sentence: string): string => {
  const words = sentence.split(" ");
  const wordsCapitalized = words.map((word) => {
    return toCapitalize(word);
  });
  const sentenceCapitalized = wordsCapitalized.join(" ");
  return sentenceCapitalized;
};

export { toCapitalize, toCapitalizeWordsSentence };
