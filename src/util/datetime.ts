type MonthYear = {
  month: number;
  year: number;
};

const minutesSecondsToSeconds = (minutesSeconds: string): number => {
  const [minutesStr, secondsStr] = minutesSeconds.split(":");
  if (parseInt(secondsStr) > 60) {
    throw new Error("seconds is invalid. seconds is more than 60");
  }
  const seconds = parseInt(minutesStr) * 60 + parseInt(secondsStr);
  return seconds;
};

const monthStrYearToMonthYear = (postedDateStr: string): MonthYear => {
  const MONTHS: { [key: string]: number } = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
  };
  const [monthStr, yearStr] = postedDateStr.split(" ");

  if (!(monthStr in MONTHS)) {
    throw new Error("month is invalid");
  }

  const month: number = MONTHS[monthStr];

  const year = parseInt(yearStr);
  return {
    month: month,
    year: year,
  };
};

export { MonthYear, minutesSecondsToSeconds, monthStrYearToMonthYear };
