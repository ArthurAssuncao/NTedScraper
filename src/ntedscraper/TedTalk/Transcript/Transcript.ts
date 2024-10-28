type Paragraph = {
  beginTime: number;
  endTime: number;
  duration: number;
  text: string;
};

type Transcript = {
  paragraphs: Paragraph[];
};

export { Transcript };
