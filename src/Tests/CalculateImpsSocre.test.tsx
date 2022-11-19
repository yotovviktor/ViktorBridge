import { calculateImps, getImps, getObligation } from '../Bridge/Calculation/CalculateImpsScore';

describe("Get Obligation", () => {
    describe("when trying to get obligation", () => {
        it("should get it right when 16 pts NV", () => {
            const actual = getObligation(16, false);
            const expected = -200
            expect(actual).toEqual(expected);
        });

        it("should get it right when 20 pts NV", () => {
            const actual = getObligation(20, false);
            const expected = 0
            expect(actual).toEqual(expected);
        });

        it("should get it right when 21 pts NV", () => {
            const actual = getObligation(21, false);
            const expected = 50
            expect(actual).toEqual(expected);
        });

        it("should get it right when 25 pts NV", () => {
            const actual = getObligation(25, false);
            const expected = 300
            expect(actual).toEqual(expected);
        });

        it("should get it right when 25 pts V", () => {
            const actual = getObligation(25, true);
            const expected = 440
            expect(actual).toEqual(expected);
        });

        it("should get it right when 30 pts V", () => {
            const actual = getObligation(30, true);
            const expected = 690
            expect(actual).toEqual(expected);
        });
    });
});

describe("Get Imps", () => {
    describe("when trying to get imps", () => {
        it("should get it right with dif 100", () => {
            const actual = getImps(100);
            const expected = 3
            expect(actual).toEqual(expected);
        });

        it("should get it right with dif 250", () => {
            const actual = getImps(250);
            const expected = 6
            expect(actual).toEqual(expected);
        });

        it("should get it right with dif 500", () => {
            const actual = getImps(500);
            const expected = 11
            expect(actual).toEqual(expected);
        });
    });
});

describe("CalculateImps", () => {
    describe("when trying to calculate imps when made", () => {
        it("should get it right when 4H = V with 24 pts", () => {
            const actual = calculateImps(620, 24, 2, 'N-S');
            const expected = 8
            expect(actual).toEqual(expected);
        });

        it("should get it right when 4H = NV with 24 pts", () => {
            const actual = calculateImps(420, 24, 1, 'N-S');
            const expected = 6
            expect(actual).toEqual(expected);
        });
    });

    describe("when trying to calculate imps when down", () => {
        it("should get it right when 4H -1 V with 24 pts", () => {
            const actual = calculateImps(-100, 24, 2, 'N-S');
            const expected = -9
            expect(actual).toEqual(expected);
        });

        it("should get it right when +200  with 16 pts", () => {
            const actual = calculateImps(-200, 24, 3, 'E-W');
            const expected = -10
            expect(actual).toEqual(expected);
        });

        it("should get it right when +200  with 15 pts", () => {
            const actual = calculateImps(-200, 25, 3, 'E-W');
            const expected = -12
            expect(actual).toEqual(expected);
        });
        it("should get it right when +100 with 26 pts", () => {
            const actual = calculateImps(-100, 14, 2, 'E-W');
            const expected = 9
            expect(actual).toEqual(expected);
        });
        it("should get it right when E-W have 24 pts and score V game", () => {
            const actual = calculateImps(600, 24, 3, 'E-W');
            const expected = 8;
            expect(actual).toEqual(expected);
        });
        it("should get it right when E-W have 24 pts and get 500", () => {
            const actual = calculateImps(-500, 16, 3, 'N-S');
            const expected = -5;
            expect(actual).toEqual(expected);
        });
        it("should get it right when E-W have 24 pts and get 100", () => {
            const actual = calculateImps(-500, 24, 3, 'E-W');
            const expected = -13;
            expect(actual).toEqual(expected);
        });
    });
});