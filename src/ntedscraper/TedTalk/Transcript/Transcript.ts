interface Paragraph {
  beginTime: number;
  endTime: number;
  duration: number;
  text: string;
}

interface Transcript {
  paragraphs: Paragraph[];
}

export { Transcript };
