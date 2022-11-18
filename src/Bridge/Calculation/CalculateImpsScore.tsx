import { By, ScoreToImps } from "../../model";
import { getVulnerability, isVulnerable } from "./CalculateScore";

export function calculateImps(score: number, points: number, boardNumber: number, by: By) {
    const isVulnerabl = isVulnerable(getVulnerability(boardNumber - 1), by);
    const obligation = getObligation(points, isVulnerabl)
    if (score === obligation) {
        return 0;
    } else if (score > obligation) {
        return getImps(score - obligation);
    } else {
        return 0 - getImps(obligation - score)
    }
}

export function getObligation(points: number, isVulnerable: boolean): number {
    let p = points >= 20 ? points : 40 - points
    let result = 0;
    switch (p) {
        case 20: result = 0; break;
        case 21: result = 50; break;
        case 22: result = 70; break;
        case 23: result = 110; break;
        case 24: result = !isVulnerable ? 200 : 290; break;
        case 25: result = !isVulnerable ? 300 : 440; break;
        case 26: result = !isVulnerable ? 350 : 520; break;
        case 27: result = !isVulnerable ? 400 : 600; break;
        case 28: result = !isVulnerable ? 430 : 630; break;
        case 29: result = !isVulnerable ? 460 : 660; break;
        case 30: result = !isVulnerable ? 490 : 690; break;
        case 31: result = !isVulnerable ? 600 : 900; break;
        case 32: result = !isVulnerable ? 700 : 1050; break;
        case 33: result = !isVulnerable ? 900 : 1350; break;
        case 34: result = !isVulnerable ? 1000 : 1500; break;
        case 35: result = !isVulnerable ? 1100 : 1650; break;
        case 36: result = !isVulnerable ? 1200 : 1800; break;
        case 37: result = !isVulnerable ? 1300 : 1950; break;
        case 38: result = !isVulnerable ? 1400 : 2100; break;
        default: result = !isVulnerable ? 1400 : 2100; break;
    }
    if (points >= 20) {
        return result;
    } else {
        return 0 - result;
    }
}

export function getImps(dif: number) {
    const array = getImpsArray();
    const index = array.findIndex(el => el.lower <= dif && el.upper >= dif);
    return array[index].imps;
}

export function getImpsArray(): ScoreToImps[] {
    const result = [] as ScoreToImps[];
    result.push({ lower: 0, upper: 19, imps: 0 })
    result.push({ lower: 20, upper: 40, imps: 1 });
    result.push({ lower: 50, upper: 80, imps: 2 });
    result.push({ lower: 90, upper: 120, imps: 3 });
    result.push({ lower: 130, upper: 160, imps: 4 });
    result.push({ lower: 170, upper: 210, imps: 5 });
    result.push({ lower: 220, upper: 260, imps: 6 });
    result.push({ lower: 270, upper: 310, imps: 8 });
    result.push({ lower: 320, upper: 360, imps: 8 });
    result.push({ lower: 370, upper: 420, imps: 9 });
    result.push({ lower: 430, upper: 490, imps: 10 });
    result.push({ lower: 500, upper: 590, imps: 11 });
    result.push({ lower: 600, upper: 740, imps: 12 });
    result.push({ lower: 750, upper: 890, imps: 13 });
    result.push({ lower: 900, upper: 1090, imps: 14 });
    result.push({ lower: 1100, upper: 1290, imps: 15 });
    result.push({ lower: 1300, upper: 1490, imps: 16 });
    result.push({ lower: 1500, upper: 1740, imps: 17 });
    result.push({ lower: 1750, upper: 1990, imps: 18 });
    result.push({ lower: 2000, upper: 2240, imps: 19 });
    result.push({ lower: 2250, upper: 2490, imps: 20 });
    result.push({ lower: 2500, upper: 2990, imps: 21 });
    result.push({ lower: 3000, upper: 3490, imps: 22 });
    result.push({ lower: 3500, upper: 3990, imps: 23 });
    result.push({ lower: 4000, upper: 1000000, imps: 24 });
    return result
}