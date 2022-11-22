import { By, Entry, StatisticsData } from "../../model";

export function getStatisticsData(entries: Entry[], by: By): StatisticsData {
  const result = {} as StatisticsData;
  result.pointsNSAvv = getPointsData(entries, "N-S");
  result.pointsEWAvv = getPointsData(entries, "E-W");
  result.contractsByCount = getContractsBy(entries,by);
  result.gamesOver25Count = getBoardWhereGamesWithSprcificPointsAreMade(entries, 25, 40, by)?.length;
  result.gamesOver25Imps = getWonImpsFromBoards(entries, by, 25, 40, getBoardWhereGamesWithSprcificPointsAreMade);
  result.gamesBelow24Count = getBoardWhereGamesWithSprcificPointsAreMade(entries, 1, 24, by)?.length;
  result.gamesBewol24Imps = getWonImpsFromBoards(entries, by, 1, 24, getBoardWhereGamesWithSprcificPointsAreMade);
  result.slamsCount = getBoardsWhereSlamIsMadeWithSpecificPoints(entries, 1, 40, by)?.length;
  result.slamsImps = getWonImpsFromBoards(entries, by, 1, 40, getBoardsWhereSlamIsMadeWithSpecificPoints);
  result.gamesBelow25DownCount = getBoardWhereGamesWithSprcificPointsAreDown(entries, 1, 24, by)?.length
  result.gamesBelow25DownImps = getWonImpsFromBoards(entries, by, 1, 24, getBoardWhereGamesWithSprcificPointsAreDown);
  result.gamesOver25DownCount = getBoardWhereGamesWithSprcificPointsAreDown(entries, 25, 40, by)?.length
  result.gamesOver25DownImps = getWonImpsFromBoards(entries, by, 25, 40, getBoardWhereGamesWithSprcificPointsAreDown);
  result.slamsDownCount = getBoardsWhereSlamIsDownWithSpecificPoints(entries, 1, 40, by)?.length;
  result.slamsDownImps = getWonImpsFromBoards(entries, by, 1, 40, getBoardsWhereSlamIsDownWithSpecificPoints);

  return result;
}

const getPointsData = (entries: Entry[], by: By) => {
  const nSPointsAvv =
    entries
      .map((e) => e.points)
      .reduce<number>((accumulator, current) => {
        return accumulator + current;
      }, 0) / entries.length;

  return by === "N-S" ? nSPointsAvv : 40 - nSPointsAvv;
};

const getBoardsWithSpecificPoints = (
  entries: Entry[],
  lower: number,
  upper: number,
  by: By
) =>
  entries.filter((e) => {
    if (by === "N-S") {
      if (e.points >= lower && e.points <= upper && e.by === by) {
        return e;
      }
    } else {
      if (40 - e.points >= lower && 40 - e.points <= upper && e.by === by) {
        return e;
      }
    }
  });

const getBoardsWhereSlamIsMadeWithSpecificPoints = (
  entries: Entry[],
  lower: number,
  upper: number,
  by: By
) =>
  getBoardsWithSpecificPoints(entries, lower, upper, by).filter((e) => {
    if (e.contractLevel === 6 && e.tricksMade >= 12) {
      return e;
    }

    if (e.contractLevel === 7 && e.tricksMade === 13) {
      return e;
    }
  });

const getBoardsWhereSlamIsDownWithSpecificPoints = (
  entries: Entry[],
  lower: number,
  upper: number,
  by: By
) =>
  getBoardsWithSpecificPoints(entries, lower, upper, by).filter((e) => {
    if (e.contractLevel === 6 && e.tricksMade < 12) {
      return e;
    }

    if (e.contractLevel === 7 && e.tricksMade < 13) {
      return e;
    }
  });

const getBoardWhereGamesWithSprcificPointsAreMade = (
  entries: Entry[],
  lower: number,
  upper: number,
  by: By
) =>
  getBoardsWithSpecificPoints(entries, lower, upper, by).filter((e) => {
    if (
      (e.contractType === "Hearts" || e.contractType === "Spades") &&
      e.contractLevel >= 4 &&
      e.contractLevel <= 5 &&
      e.tricksMade >= 10
    ) {
      return e;
    }
    if (
      (e.contractType === "Clubs" || e.contractType === "Diamonds") &&
      e.contractLevel === 5 &&
      e.tricksMade >= 11
    ) {
      return e;
    }
    if (
      e.contractType === "NoTrump" &&
      e.contractLevel >= 3 &&
      e.contractLevel <= 5 &&
      e.tricksMade >= 9
    ) {
      return e;
    }
  });

const getBoardWhereGamesWithSprcificPointsAreDown = (
  entries: Entry[],
  lower: number,
  upper: number,
  by: By
) =>
  getBoardsWithSpecificPoints(entries, lower, upper, by).filter((e) => {
    if (
      (e.contractType === "Hearts" || e.contractType === "Spades") &&
      e.contractLevel >= 4 &&
      e.contractLevel <= 5 &&
      e.tricksMade < 10
    ) {
      return e;
    }
    if (
      (e.contractType === "Clubs" || e.contractType === "Diamonds") &&
      e.contractLevel === 5 &&
      e.tricksMade < 11
    ) {
      return e;
    }
    if (
      e.contractType === "NoTrump" &&
      e.contractLevel >= 3 &&
      e.contractLevel <= 5 &&
      e.tricksMade < 9
    ) {
      return e;
    }
  });

const getWonImpsFromBoards = (
  entries: Entry[],
  by: By,
  lower: number,
  upper: number,
  func: (entries: Entry[], lower: number, upper: number, by: By) => Entry[]
) => {
  const specificEntries = func(entries, lower, upper, by);
  const imps = specificEntries
    .map((e) => e.imps)
    .reduce<number>((accumulator, current) => {
      return accumulator + current;
    }, 0);

  if (by === "N-S") {
    return imps;
  } else {
    return 0 - imps;
  }
};
const getContractsBy = (entries: Entry[], by: By) => {
  return entries.filter((e) => e.by === by)?.length;
};
