import axios from "axios";
import fs from "fs";
import lodashIsEqual from "lodash/isEqual";
import path from "path";
import { TedTalk } from "../TedTalk";
import { TedParser } from "./TedParser";

describe("TedParser", () => {
  const NUMBER_PAGES_TODAY = 160;

  const loadHtmlfile = () => {
    const file_path = path.resolve(__dirname, "../mocks/ted_home.html");
    const html_data = fs.readFileSync(file_path, {
      encoding: "utf8",
      flag: "r",
    });

    return html_data;
  };

  const htmlFile = loadHtmlfile();

  const parser = new TedParser(htmlFile);

  test("should return number of pages", () => {
    const result = parser.getTotalPages();

    // there is 162 pages today
    expect(result).toBeGreaterThanOrEqual(NUMBER_PAGES_TODAY);
  });

  test("should return minimal talks data from page", () => {
    const NUMBER_TALKS_HOME_PAGE = 36;

    const loadTalksFile = () => {
      const file_path = path.resolve(__dirname, "../mocks/talks_home.json");
      const talks_data = fs.readFileSync(file_path, {
        encoding: "utf8",
        flag: "r",
      });
      const talks_json = JSON.parse(talks_data);

      return talks_json;
    };

    const result = parser.getTalksData();
    const talksFile = loadTalksFile();

    expect(result.length).toBe(NUMBER_TALKS_HOME_PAGE);

    // const data = JSON.stringify(result, null, 2);
    // fs.writeFileSync("data.json", data);

    expect(lodashIsEqual(talksFile, result)).toBeTruthy();
  });

  test("should return empty string when axios.get failed", async () => {
    const tedTalk: TedTalk = {
      author: "George Monbiot",
      duration: 938,
      postedDate: {
        month: 1,
        year: 2023,
      },
      thumbnailUrl:
        "https:/pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/40301ae6-e2d8-4283-a6aa-2a01fbba36cb/GeorgeMonbiot_2022T-embed.jpg?quality=89&w=320",
      title: "Can we feed ourselves without devouring the planet?",
      url: "https:/www.ted.com/talks/george_monbiot_can_we_feed_ourselves_without_devouring_the_planet",
    };

    axios.get = jest.fn().mockRejectedValue({});

    const result = await parser.getTalkData(tedTalk);

    expect(result).toStrictEqual({});
  });

  test("should return complete talk data from talk page", async () => {
    const loadTalkFile = () => {
      const file_path = path.resolve(__dirname, "../mocks/talk_page.html");
      const talk_data = fs.readFileSync(file_path, {
        encoding: "utf8",
        flag: "r",
      });
      return talk_data;
    };

    const tedTalk: TedTalk = {
      author: "George Monbiot",
      duration: 938,
      postedDate: {
        month: 1,
        year: 2023,
      },
      thumbnailUrl:
        "https:/pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/40301ae6-e2d8-4283-a6aa-2a01fbba36cb/GeorgeMonbiot_2022T-embed.jpg?quality=89&w=320",
      title: "Can we feed ourselves without devouring the planet?",
      url: "https:/www.ted.com/talks/george_monbiot_can_we_feed_ourselves_without_devouring_the_planet",
    };

    const completeTedTalk: TedTalk = {
      author: "George Monbiot",
      duration: 938,
      postedDate: {
        month: 1,
        year: 2023,
      },
      thumbnailUrl:
        "https:/pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/40301ae6-e2d8-4283-a6aa-2a01fbba36cb/GeorgeMonbiot_2022T-embed.jpg?quality=89&w=320",
      title: "Can we feed ourselves without devouring the planet?",
      url: "https:/www.ted.com/talks/george_monbiot_can_we_feed_ourselves_without_devouring_the_planet",
      description: `Farming is the worst thing humanity has ever done to the planet, says journalist George Monbiot. What's more: the global food system could be heading toward collapse. Detailing the technological solutions we need to radically reshape food production -- from lab-grown, protein-rich foods to crops that don't require plowing -- Monbiot shares a future-focused vision of how humanity could feed itself without destroying the planet.`,
      views: 334849,
      conference: "TED Countdown London Session 2022",
      topics: [
        "Climate Change",
        "Science",
        "Innovation",
        "Food",
        "Future",
        "Agriculture",
        "Farming",
        "Countdown",
      ].sort(),
      authorUrl: "https://www.ted.com/speakers/george_monbiot",
      authorAvatarUrl:
        "https://ted-conferences-speaker-photos-production.s3.amazonaws.com/8c5rmifhblxenv39ytqb3ewr2gpn",
      language: "en",
      id: 99754,
      publishedAt: new Date("2023-01-18T15:49:39Z"),
      talkType: "TED Stage Talk",
    };

    const talkFile = loadTalkFile();

    axios.get = jest.fn().mockResolvedValue({ data: talkFile });

    const result = await parser.getTalkData(tedTalk);

    expect(result.topics?.length).toBe(8);

    expect(result).toStrictEqual(completeTedTalk);
  });
});
