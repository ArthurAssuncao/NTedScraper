import axios from "axios";
import { load as cheerioLoad } from "cheerio";
import {
  minutesSecondsToSeconds,
  monthStrYearToMonthYear,
  toCapitalizeWordsSentence,
} from "../../util";
import { TedTalk } from "../TedTalk";
import { TedNextTypes } from "./TedNextTypes";

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
      const postedDateStr = $(element).find(".meta .meta__val").text().trim();
      const postedDate = monthStrYearToMonthYear(postedDateStr);
      const durationMinSec = $(element).find(".thumb__duration").text().trim();
      const duration = minutesSecondsToSeconds(durationMinSec);
      const urlPartial = $(element).find("a").attr("href") || "";
      const url = `${TedParser.BASE_URL}${urlPartial}`;

      const new_talk: TedTalk = {
        author: author,
        duration: duration,
        postedDate: postedDate,
        thumbnailUrl: thumbnailUrl,
        title: title,
        url: url,
      };
      talks.push(new_talk);
    });
    return talks;
  };

  getViewsConference = (
    talkMeta: string
  ): { views: number; conference: string } => {
    const viewsStr = talkMeta.split(" views | ")[0].replace(",", "").trim();
    const views = parseFloat(viewsStr);
    const conference = talkMeta.split(" • ")[1].replace(/\s+/g, " ").trim();
    return {
      views: views,
      conference: conference,
    };
  };

  getTalkData = async (tedTalk: TedTalk): Promise<TedTalk> => {
    let completeTedTalk;
    try {
      const data = await axios.get(tedTalk.url);
      const $ = cheerioLoad(data.data);
      const description = $('[data-testid="talk-description"]')
        .first()
        .text()
        .replace(/\s+/g, " ")
        .trim();
      const talkMeta = $('[data-testid="talk-meta"]').first().text();
      const viewsConference = this.getViewsConference(talkMeta);
      const views = viewsConference.views;
      const conference = viewsConference.conference;
      const topicsHTML = $('[href^="/topics/"]');
      const topics: string[] = topicsHTML
        .map((_, topic) => {
          return toCapitalizeWordsSentence($(topic).text());
        })
        .toArray()
        .sort();
      const authorPartialUrl = $('[href^="/speakers/"]').first().attr("href");
      const authorUrl = `${TedParser.BASE_URL}${authorPartialUrl}`;

      const completeData: TedNextTypes = JSON.parse(
        $('script[id="__NEXT_DATA__"]').first().text()
      );

      const videoData = completeData?.props?.pageProps?.videoData;

      const authorData = videoData?.speakers?.nodes;
      const authorAvatarUrl =
        authorData && authorData?.length > 0 ? authorData[0].photoUrl : "";

      const language = videoData?.internalLanguageCode || "en";
      const tedId = parseInt(videoData?.id || "-1");
      const publishedAt = new Date(videoData?.publishedAt || "");
      const talkType = videoData?.type?.name || "Ted undefined type";

      completeTedTalk = tedTalk;
      completeTedTalk.description = description;
      completeTedTalk.views = views;
      completeTedTalk.conference = conference;
      completeTedTalk.topics = topics;
      completeTedTalk.authorUrl = authorUrl;
      completeTedTalk.authorAvatarUrl = authorAvatarUrl;
      completeTedTalk.language = language;
      completeTedTalk.id = tedId;
      completeTedTalk.publishedAt = publishedAt;
      completeTedTalk.talkType = talkType;
    } catch (err: any) {
      return {} as TedTalk;
    }
    return completeTedTalk;
  };
}

export { TedParser };
