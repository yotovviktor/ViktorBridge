import { calculateScore, getBonus, getDownScore, getOverTricksBonus, getPureScore, getScoreModifier, getVulnerability } from '../Bridge/CalculateScore';
import { Vulnerability } from '../model';

describe("Get Vulnerability", () => {
  describe("when trying to get vulnerability", () => {
    it("should get it right when borad Number < 16", () => {
      const actual = getVulnerability(5);
      const expected: Vulnerability = 'E-W'
      expect(actual).toEqual(expected);
    });

    it("should get it right when board number > 16", () => {
      const actual = getVulnerability(16);
      const expected: Vulnerability = 'None'
      expect(actual).toEqual(expected);
    });
  });
});

describe("Get pure score", () => {
  describe("when trying to get pure score", () => {
    it("should get it right with minor", () => {
      const actual = getPureScore(2, 'Clubs');
      const expected = 40
      expect(actual).toEqual(expected);
    });

    it("should get it right with major", () => {
      const actual = getPureScore(2, 'Hearts');
      const expected = 60
      expect(actual).toEqual(expected);
    });

    it("should get it right with no trump", () => {
      const actual = getPureScore(2, 'NoTrump');
      const expected = 70
      expect(actual).toEqual(expected);
    });
  });
});

describe("Get pure down score", () => {
  describe("when not vulnerable", () => {
    it("should get it right not double and not redoubled", () => {
      const actual = getDownScore(false, false, false, 5);
      const expected = 250
      expect(actual).toEqual(expected);
    });
    it("should get it right doubled down 1", () => {
      const actual = getDownScore(false, true, false, 1);
      const expected = 100
      expect(actual).toEqual(expected);
    });
    it("should get it right doubled down 2", () => {
      const actual = getDownScore(false, true, false, 2);
      const expected = 300
      expect(actual).toEqual(expected);
    });
    it("should get it right doubled down 3", () => {
      const actual = getDownScore(false, true, false, 3);
      const expected = 500
      expect(actual).toEqual(expected);
    });
    it("should get it right doubled down 5", () => {
      const actual = getDownScore(false, true, false, 5);
      const expected = 1100
      expect(actual).toEqual(expected);
    });
    it("should get it right redoubled down 1", () => {
      const actual = getDownScore(false, false, true, 1);
      const expected = 200
      expect(actual).toEqual(expected);
    });
    it("should get it right redoubled down 2", () => {
      const actual = getDownScore(false, false, true, 2);
      const expected = 600
      expect(actual).toEqual(expected);
    });
    it("should get it right redoubled down 3", () => {
      const actual = getDownScore(false, false, true, 3);
      const expected = 1000
      expect(actual).toEqual(expected);
    });
    it("should get it right redoubled down 5", () => {
      const actual = getDownScore(false, false, true, 5);
      const expected = 2200
      expect(actual).toEqual(expected);
    });
  });

  describe("when vulnerable", () => {
    it("should get it right not double and not redoubled", () => {
      const actual = getDownScore(true, false, false, 5);
      const expected = 500
      expect(actual).toEqual(expected);
    });
    it("should get it right doubled down 1", () => {
      const actual = getDownScore(true, true, false, 1);
      const expected = 200
      expect(actual).toEqual(expected);
    });
    it("should get it right doubled down 2", () => {
      const actual = getDownScore(true, true, false, 2);
      const expected = 500
      expect(actual).toEqual(expected);
    });
    it("should get it right doubled down 3", () => {
      const actual = getDownScore(true, true, false, 3);
      const expected = 800
      expect(actual).toEqual(expected);
    });
    it("should get it right doubled down 5", () => {
      const actual = getDownScore(true, true, false, 5);
      const expected = 1400
      expect(actual).toEqual(expected);
    });
    it("should get it right redoubled down 1", () => {
      const actual = getDownScore(true, false, true, 1);
      const expected = 400
      expect(actual).toEqual(expected);
    });
    it("should get it right redoubled down 2", () => {
      const actual = getDownScore(true, false, true, 2);
      const expected = 1000
      expect(actual).toEqual(expected);
    });
    it("should get it right redoubled down 3", () => {
      const actual = getDownScore(true, false, true, 3);
      const expected = 1600
      expect(actual).toEqual(expected);
    });
    it("should get it right redoubled down 5", () => {
      const actual = getDownScore(true, false, true, 5);
      const expected = 2800
      expect(actual).toEqual(expected);
    });
  });
});

describe("Get score modifier", () => {
  describe("when trying to get score modifier", () => {
    it("should get it right when no doubel no redouble", () => {
      const actual = getScoreModifier(false, false, 60);
      const expected = 0;
      expect(actual).toEqual(expected);
    });

    it("should get it right when doubled", () => {
      const actual = getScoreModifier(true, false, 60);
      const expected = 60;
      expect(actual).toEqual(expected);
    });

    it("should get it right when redoubled", () => {
      const actual = getScoreModifier(false, true, 60);
      const expected = 180;
      expect(actual).toEqual(expected);
    });
  });
});

describe("Get bonus", () => {
  describe("when trying to get bonus", () => {
    it("should get it right when no game", () => {
      const actual = getBonus(40, 2, 'Clubs', false);
      const expected = 50;
      expect(actual).toEqual(expected);
    });

    it("should get it right when game is reached", () => {
      const actual = getBonus(100, 4, 'Hearts', false);
      const expected = 300;
      expect(actual).toEqual(expected);
    });

    it("should get it right when vulnerable game is reached", () => {
      const actual = getBonus(100, 4, 'Hearts', true);
      const expected = 500;
      expect(actual).toEqual(expected);
    });

    it("should get it right when small slam", () => {
      const actual = getBonus(100, 6, 'Hearts', false);
      const expected = 800;
      expect(actual).toEqual(expected);
    });

    it("should get it right when vulnerable small slam", () => {
      const actual = getBonus(100, 6, 'Hearts', true);
      const expected = 1250;
      expect(actual).toEqual(expected);
    });

    it("should get it right when grand slam", () => {
      const actual = getBonus(100, 7, 'Hearts', false);
      const expected = 1300;
      expect(actual).toEqual(expected);
    });

    it("should get it right when vulnerable grand slam", () => {
      const actual = getBonus(100, 7, 'Hearts', true);
      const expected = 2000;
      expect(actual).toEqual(expected);
    });
  });
});

describe("Get Over tricks bonus", () => {
  describe("when trying to get overtricks bonus", () => {
    it("should get it right when not doubled", () => {
      const actual = getOverTricksBonus(2, 'Hearts', false, false, false);
      const expected = 60
      expect(actual).toEqual(expected);
    });

    it("should get it right when doubled", () => {
      const actual = getOverTricksBonus(2, 'Hearts', false, true, false);
      const expected = 200
      expect(actual).toEqual(expected);
    });

    it("should get it right when doubled and vulnerable", () => {
      const actual = getOverTricksBonus(2, 'Hearts', true, true, false);
      const expected = 400
      expect(actual).toEqual(expected);
    });

    it("should get it right when redoubled", () => {
      const actual = getOverTricksBonus(2, 'Hearts', false, false, true);
      const expected = 400
      expect(actual).toEqual(expected);
    });

    it("should get it right when redoubled and vulnerable", () => {
      const actual = getOverTricksBonus(2, 'Hearts', true, false, true);
      const expected = 800
      expect(actual).toEqual(expected);
    });
  });
});

describe("Calculate score", () => {
  describe("when trying to get not doubled", () => {
    it("should get it right when 2 clubs =", () => {
      const actual = calculateScore(1, 2, 'Clubs', 8, 'N-S', true, false, false);
      const expected = 90
      expect(actual).toEqual(expected);
    });

    it("should get it right when 2 clubs + 2", () => {
      const actual = calculateScore(1, 2, 'Clubs', 10, 'N-S', true, false, false);
      const expected = 130
      expect(actual).toEqual(expected);
    });

    it("should get it right when 4 Hearts =", () => {
      const actual = calculateScore(1, 4, 'Hearts', 10, 'N-S', true, false, false);
      const expected = 420
      expect(actual).toEqual(expected);
    });

    it("should get it right when 4 Hearts + 3", () => {
      const actual = calculateScore(1, 4, 'Hearts', 13, 'N-S', true, false, false);
      const expected = 510
      expect(actual).toEqual(expected);
    });

    it("should get it right when 4 Hearts + 3 vlunerable", () => {
      const actual = calculateScore(2, 4, 'Hearts', 13, 'N-S', true, false, false);
      const expected = 710
      expect(actual).toEqual(expected);
    });

    it("should get it right when 6 Hearts + 1", () => {
      const actual = calculateScore(1, 6, 'Hearts', 13, 'N-S', true, false, false);
      const expected = 1010
      expect(actual).toEqual(expected);
    });

    it("should get it right when 7 Hearts = vulnerable", () => {
      const actual = calculateScore(2, 7, 'Hearts', 13, 'N-S', true, false, false);
      const expected = 2210
      expect(actual).toEqual(expected);
    });
  });

  describe("when trying to get doubled", () => {
    it("should get it right when 2 clubs =", () => {
      const actual = calculateScore(1, 2, 'Clubs', 8, 'N-S', true, true, false);
      const expected = 180
      expect(actual).toEqual(expected);
    });

    it("should get it right when 2 clubs +3", () => {
      const actual = calculateScore(1, 2, 'Clubs', 11, 'N-S', true, true, false);
      const expected = 480
      expect(actual).toEqual(expected);
    });
    it("should get it right when 2 hearts =", () => {
      const actual = calculateScore(1, 2, 'Hearts', 8, 'N-S', true, true, false);
      const expected = 470
      expect(actual).toEqual(expected);
    });

    it("should get it right when 2 hearts + 3", () => {
      const actual = calculateScore(1, 2, 'Hearts', 11, 'N-S', true, true, false);
      const expected = 770
      expect(actual).toEqual(expected);
    });

    it("should get it right when vlunerable 3 hearts + 3", () => {
      const actual = calculateScore(2, 3, 'Hearts', 12, 'N-S', true, true, false);
      const expected = 1330
      expect(actual).toEqual(expected);
    });

    it("should get it right when vlunerable 4 hearts", () => {
      const actual = calculateScore(2, 4, 'Hearts', 10, 'N-S', true, true, false);
      const expected = 790
      expect(actual).toEqual(expected);
    });

    it("should get it right when vlunerable 3 No trump + 1", () => {
      const actual = calculateScore(2, 3, 'NoTrump', 10, 'N-S', true, true, false);
      const expected = 950
      expect(actual).toEqual(expected);
    });

    it("should get it right when vlunerable 6 No trump", () => {
      const actual = calculateScore(2, 6, 'NoTrump', 12, 'N-S', true, true, false);
      const expected = 1680
      expect(actual).toEqual(expected);
    });

    it("should get it right when vlunerable 7 No trump", () => {
      const actual = calculateScore(2, 7, 'NoTrump', 13, 'N-S', true, true, false);
      const expected = 2490
      expect(actual).toEqual(expected);
    });
  });

  describe("when trying to get redoubled", () => {
    it("should get it right when 2 clubs =", () => {
      const actual = calculateScore(1, 2, 'Clubs', 8, 'N-S', true, false, true);
      const expected = 560
      expect(actual).toEqual(expected);
    });

    it("should get it right when 1 Hearts + 6", () => {
      const actual = calculateScore(2, 1, 'Hearts', 13, 'N-S', true, false, true);
      const expected = 3120
      expect(actual).toEqual(expected);
    });

    it("should get it right when 2 clubs +3", () => {
      const actual = calculateScore(1, 2, 'Clubs', 11, 'N-S', true, false, true);
      const expected = 1160
      expect(actual).toEqual(expected);
    });
    it("should get it right when 2 hearts =", () => {
      const actual = calculateScore(1, 2, 'Hearts', 8, 'N-S', true, false, true);
      const expected = 640
      expect(actual).toEqual(expected);
    });

    it("should get it right when 2 hearts + 3", () => {
      const actual = calculateScore(1, 2, 'Hearts', 11, 'N-S', true, false, true);
      const expected = 1240
      expect(actual).toEqual(expected);
    });

    it("should get it right when vlunerable 3 hearts + 3", () => {
      const actual = calculateScore(2, 3, 'Hearts', 12, 'N-S', true, false, true);
      const expected = 2160
      expect(actual).toEqual(expected);
    });

    it("should get it right when vlunerable 4 hearts", () => {
      const actual = calculateScore(2, 4, 'Hearts', 10, 'N-S', true, false, true);
      const expected = 1080
      expect(actual).toEqual(expected);
    });

    it("should get it right when vlunerable 3 No trump + 1", () => {
      const actual = calculateScore(2, 3, 'NoTrump', 10, 'N-S', true, false, true);
      const expected = 1400
      expect(actual).toEqual(expected);
    });

    it("should get it right when vlunerable 6 No trump", () => {
      const actual = calculateScore(2, 6, 'NoTrump', 12, 'N-S', true, false, true);
      const expected = 2110
      expect(actual).toEqual(expected);
    });

    it("should get it right when vlunerable 7 No trump", () => {
      const actual = calculateScore(2, 7, 'NoTrump', 13, 'N-S', true, false, true);
      const expected = 2980
      expect(actual).toEqual(expected);
    });
  });

  describe("when trying to get score when down", () => {
    it("should get it right when 2 clubs -3 NV", () => {
      const actual = calculateScore(1, 2, 'Clubs', 5, 'N-S', true, false, false);
      const expected = -150
      expect(actual).toEqual(expected);
    });
    it("should get it right when 2 x clubs -3 NV", () => {
      const actual = calculateScore(1, 2, 'Clubs', 5, 'N-S', true, true, false);
      const expected = -500
      expect(actual).toEqual(expected);
    });

    it("should get it right when 2 x clubs -5 NV", () => {
      const actual = calculateScore(1, 2, 'Clubs', 3, 'N-S', true, true, false);
      const expected = -1100
      expect(actual).toEqual(expected);
    });

    it("should get it right when 2 x clubs -1 v", () => {
      const actual = calculateScore(2, 2, 'Clubs', 7, 'N-S', true, true, false);
      const expected = -200
      expect(actual).toEqual(expected);
    });

    it("should get it right when 2 x clubs -2 v", () => {
      const actual = calculateScore(2, 2, 'Clubs', 6, 'N-S', true, true, false);
      const expected = -500
      expect(actual).toEqual(expected);
    });

    it("should get it right when 2 x clubs -3 v", () => {
      const actual = calculateScore(2, 2, 'Clubs', 5, 'N-S', true, true, false);
      const expected = -800
      expect(actual).toEqual(expected);
    });

    it("should get it right when 2 xx clubs -2 v", () => {
      const actual = calculateScore(2, 2, 'Clubs', 6, 'N-S', true, false, true);
      const expected = -1000
      expect(actual).toEqual(expected);
    });

  });
});