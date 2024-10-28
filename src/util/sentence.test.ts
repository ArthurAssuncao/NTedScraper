import { toCapitalize, toCapitalizeWordsSentence } from "./sentence";

describe("Sentence util", () => {
  test("should capitalize word", () => {
    const word = "test";
    const wordCapitalizedCorrect = "Test";
    const wordCapitalized = toCapitalize(word);

    expect(wordCapitalized).toBe(wordCapitalizedCorrect);
  });

  test("should capitalize all words in sentence", () => {
    const sentence = "test test";
    const sentenceCapitalizedCorrect = "Test Test";
    const sentenceCapitalized = toCapitalizeWordsSentence(sentence);

    expect(sentenceCapitalized).toBe(sentenceCapitalizedCorrect);
  });

  test("should capitalize all words in long sentence", () => {
    const sentence =
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. phasellus tincidunt elit sapien, vel placerat nisi blandit in. in malesuada dolor sed justo imperdiet, ut malesuada sapien tincidunt. nunc luctus augue id ligula malesuada luctus";
    const sentenceCapitalizedCorrect =
      "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Phasellus Tincidunt Elit Sapien, Vel Placerat Nisi Blandit In. In Malesuada Dolor Sed Justo Imperdiet, Ut Malesuada Sapien Tincidunt. Nunc Luctus Augue Id Ligula Malesuada Luctus";
    const sentenceCapitalized = toCapitalizeWordsSentence(sentence);

    expect(sentenceCapitalized).toBe(sentenceCapitalizedCorrect);
  });
});
