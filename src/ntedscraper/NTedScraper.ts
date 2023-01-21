import axios from "axios";
import { TedParser } from "./TedParser";

class NTedScraper {
  static readonly BASE_URL: string = "https://www.ted.com/talks";
  static readonly LANG_URL: string =
    "https://www.ted.com/participate/translate/our-languages";
  lang: string;
  html: string;
  numberPages: number;

  constructor(lang = "en") {
    this.lang = lang;
    this.html = "";
    this.numberPages = -1;
  }

  getHtmlPage = async (pageUrl: string): Promise<string> => {
    const url = "https://www.ted.com/talks";
    let data;

    try {
      data = await axios.get(pageUrl);
    } catch (err: any) {
      return "";
    }

    return data.data;
  };

  generatePageLinks = (): string[] => {
    const parser = new TedParser(this.html);

    this.numberPages = parser.getTotalPages();

    const list = Array.from(
      Array(this.numberPages),
      (_, number) => `${NTedScraper.BASE_URL}?page=${number}`
    );

    return list;
  };
}

export { NTedScraper };
