import axios from "axios";
import { load as cheerioLoad } from "cheerio";
import { TedTalk } from "../TedTalk";

class TedParser {
  static readonly BASE_URL: string = "https://www.ted.com";
  static readonly LANG_URL: string =
    "https://www.ted.com/participate/translate/our-languages";
  html: string;
  numberPages = -1;

  constructor(html: string) {
    this.html = html;
  }

  getTotalPages = (): number => {
    const $ = cheerioLoad(this.html);
    const pagination = $(".pagination__item.pagination__link").last();

    try {
      this.numberPages = parseInt(pagination.text());
      return this.numberPages;
    } catch (err: any) {
      return -1;
    }
  };

  getTalksData = () => {
    const $ = cheerioLoad(this.html);
    const talksHTML = $(".talk-link");
    const talks: TedTalk[] = [];

    talksHTML.each((i, element) => {
      const author = $(element).find(".talk-link__speaker").text().trim();
      const thumbnailUrl =
        $(element).find("img.thumb__image").attr("src") || "";
      const title = $(element)
        .find(".media__message a")
        .text()
        .replace(/\s+/g, " ")
        .trim();
      const posted_date = $(element).find(".meta .meta__val").text().trim();
      const duration = $(element).find(".thumb__duration").text().trim();
      const urlPartial = $(element).find("a").attr("href") || "";
      const url = `${TedParser.BASE_URL}${urlPartial}`;

      const new_talk: TedTalk = {
        author: author,
        duration: duration,
        posted_date: posted_date,
        thumbnailUrl: thumbnailUrl,
        title: title,
        url: url,
      };
      talks.push(new_talk);
    });
    return talks;
  };

  getTalkData = async (tedTalk: TedTalk) => {
    let completeTedTalk;
    try {
      const data = await axios.get(tedTalk.url);
      const $ = cheerioLoad(data.data);
      const description = $('[data-testid="talk-description"]')
        .first()
        .text()
        .replace(/\s+/g, " ")
        .trim();
      completeTedTalk = tedTalk;
      completeTedTalk.description = description;
    } catch (err: any) {
      return {};
    }
    return completeTedTalk;
  };
}

export { TedParser };
