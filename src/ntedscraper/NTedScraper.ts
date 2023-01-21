import axios from "axios";
import { TedParser } from "./ted_parser";
// const cheerio = require("cheerio");

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

  getHtmlPage = async (page_url: string): Promise<string> => {
    const url = "https://www.ted.com/talks";
    let data;

    try {
      data = await axios.get(url);
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
      (_, x) => `${NTedScraper.BASE_URL}?page=${x}`
    );

    return list;
  };
}

export { NTedScraper };
