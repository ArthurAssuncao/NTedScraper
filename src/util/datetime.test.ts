import {
  MonthYear,
  minutesSecondsToSeconds,
  monthStrYearToMonthYear,
} from "./datetime";

describe("Datetime util", () => {
  test("should return seconds when minutes:seconds format is valid", () => {
    const minutesSeconds = "12:05";
    const minutesSecondsCorrect = 725;
    const seconds = minutesSecondsToSeconds(minutesSeconds);

    expect(seconds).toBe(minutesSecondsCorrect);
  });

  test("should return error when seconds is invalid", () => {
    const minutesSeconds = "12:70";
    const func = () => {
      minutesSecondsToSeconds(minutesSeconds);
    };

    expect(func).toThrowError();
  });

  test("should return object monthYear (month and year as number) when is called with valid values", () => {
    const monthYearStr = "Jan 2020";
    const monthYearCorrect: MonthYear = {
      month: 1,
      year: 2020,
    };
    const monthYear = monthStrYearToMonthYear(monthYearStr);

    expect(monthYear).toStrictEqual(monthYearCorrect);
  });

  test("should return error when month is invalid", () => {
    const monthYearInvalidStr = "Abr 2020";
    const func = () => {
      monthStrYearToMonthYear(monthYearInvalidStr);
    };

    expect(func).toThrowError();
  });
});
