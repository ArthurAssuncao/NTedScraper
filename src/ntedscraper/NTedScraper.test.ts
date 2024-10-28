import axios from "axios";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { NTedScraper } from "./NTedScraper";

describe("NTedScraper", () => {
  const loadHtmlfile = () => {
    let html_data;
    const file_path = path.resolve(__dirname, "./mocks/ted_home.html");
    html_data = fs.readFileSync(file_path, { encoding: "utf8", flag: "r" });

    return html_data;
  };

  const htmlFile = loadHtmlfile();

  test("should return empty string when axios.get failed", async () => {
    const scraper = new NTedScraper();
    axios.get = jest.fn().mockRejectedValue("");
    const url = NTedScraper.BASE_URL;
    const result = await scraper.getHtmlPage(url);
    expect(result).toEqual("");
    expect(axios.get).toBeCalledWith(url);
  });

  test("should return html page", async () => {
    const scraper = new NTedScraper();
    axios.get = jest.fn().mockResolvedValue({ data: htmlFile });
    const url = "https://www.ted.com/talks";
    const result = await scraper.getHtmlPage(url);

    const htmlFileMD5 = crypto.createHash("md5").update(htmlFile).digest("hex");
    const resultMD5 = crypto.createHash("md5").update(result).digest("hex");

    expect(resultMD5).toEqual(htmlFileMD5);
    expect(axios.get).toBeCalledWith(url);
  });

  test("should return array with page links", () => {
    const scraper = new NTedScraper();
    scraper.html = htmlFile;

    const result = scraper.generatePageLinks();

    expect(result).not.toEqual([]);
  });

  test("should return array with page links with correct size", () => {
    const scraper = new NTedScraper();
    scraper.html = htmlFile;

    const result = scraper.generatePageLinks();

    expect(result.length).toEqual(scraper.numberPages);
  });
});
