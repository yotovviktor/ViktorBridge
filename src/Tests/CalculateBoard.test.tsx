import { calculateBoard } from "../Bridge/Calculation/CalculateBoard";
import { getVulnerability } from "../Bridge/Calculation/CalculateScore";
import { Entry, Vulnerability } from "../model";

const entryByNS = {
    boardNumber: 2,
    by: 'N-S',
    contractLevel: 4,
    contractType: 'Spades',
    isDoubled: false,
    isRedoubled: false,
    points: 24,
    tricksMade: 10,
} as Entry

const entryByEW = {
    boardNumber: 3,
    by: 'E-W',
    contractLevel: 4,
    contractType: 'Spades',
    isDoubled: false,
    isRedoubled: false,
    points: 16,
    tricksMade: 10,
} as Entry

describe("Calculate", () => {
    describe("when trying to get Score for N-S", () => {
        it("should get it right NS made V Game", () => {
            const actual = calculateBoard(entryByNS);
            const expected = { ...entryByNS, score: 620, imps: 8 }
            expect(actual).toEqual(expected);
        });

        it("should get it right NS go down V Game", () => {
            const actual = calculateBoard({ ...entryByNS, tricksMade: 9 });
            const expected = { ...entryByNS, score: - 100, imps: -9, tricksMade: 9 }
            expect(actual).toEqual(expected);
        });

        it("should get it right NS go down V Game but ew has 24", () => {
            const entry = { ...entryByNS, tricksMade: 8, isDoubled: true, points: 15, boardNumber: 3 }
            const actual = calculateBoard(entry);
            const expected = { ...entry, score: - 300, imps: 4 }
            expect(actual).toEqual(expected);
        });
    });
    describe("when trying to get Score for E-W", () => {
        it("should get it right NS made V Game", () => {
            const actual = calculateBoard(entryByEW);
            const expected = { ...entryByEW, score: -620, imps: -8 }
            expect(actual).toEqual(expected);
        });

        it("should get it right NS go down V Game", () => {
            const actual = calculateBoard({ ...entryByEW, tricksMade: 9 });
            const expected = { ...entryByEW, score: + 100, imps: +9, tricksMade: 9 }
            expect(actual).toEqual(expected);
        });

        it("should get it right NS go down V Game but ew has 24", () => {
            const entry = { ...entryByEW, tricksMade: 8, isDoubled: true, points: 25, boardNumber: 2 }
            const actual = calculateBoard(entry);
            const expected = { ...entry, score: + 300, imps: -4 }
            expect(actual).toEqual(expected);
        });
    });
});