import { By, ContractType, Vulnerability } from "../../model";

export function getVulnerability(boardNumber: number): Vulnerability {
    const remainder = boardNumber % 16;
    switch (remainder) {
        case 0: return 'None';
        case 1: return 'N-S';
        case 2: return 'E-W';
        case 3: return 'Both';
        case 4: return 'N-S';
        case 5: return 'E-W';
        case 6: return 'Both';
        case 7: return 'None';
        case 8: return 'E-W';
        case 9: return 'Both';
        case 10: return 'None';
        case 11: return 'N-S';
        case 12: return 'Both';
        case 13: return 'None';
        case 14: return 'N-S';
        case 15: return 'E-W';
        default: return 'None';
    }
}

export function isVulnerable(vulnerability: Vulnerability, current: By): boolean {
    if (current.toString() === vulnerability.toString() || vulnerability === 'Both') {
        return true;
    } else {
        return false;
    }
}

export function getPureScore(level: number, type: ContractType): number {
    if (type === 'Hearts' || type === 'Spades') {
        return level * 30;
    } else if (type === 'NoTrump') {
        return 40 + (level - 1) * 30;
    } else {
        return level * 20;
    }
}

function getIsMade(tricksMade: number, level: number): boolean {
    return tricksMade - 6 >= level;
}

function getTricksDown(tricksMade: number, level: number) {
    return 6 + level - tricksMade;
}

export function getDownScore(isVulnerable: boolean, isDoubled: boolean, isRedoubled: boolean, tricksDown: number) {
    if (!isDoubled && !isRedoubled) {
        return tricksDown * 50 * (isVulnerable ? 2 : 1)
    } else if (isVulnerable) {
        const doubledPenalty = tricksDown * 300 - 100;
        return doubledPenalty * (isRedoubled ? 2 : 1)
    } else {
        const doubledPenalty = 100 + (tricksDown >= 2 ? 200 : 0) + (tricksDown >= 3 ? 200 : 0) + (tricksDown >= 4 ? (tricksDown - 3) * 300 : 0);
        return doubledPenalty * (isRedoubled ? 2 : 1);
    }
}

export function getScoreModifier(isDoubled: boolean, isRedoubled: boolean, pureScore: number): number {
    if (!isDoubled && !isRedoubled) {
        return 0;
    } else if (isDoubled) {
        return pureScore;
    } else {
        return pureScore * 3;
    }
}

export function getBonus(score: number, level: number, type: ContractType, isVulnerable: boolean): number {
    if (score >= 100 && level < 6) {
        return isVulnerable ? 500 : 300;
    } else if (isSmallSlam(level, type)) {
        return isVulnerable ? 750 + 500 : 500 + 300;
    } else if (isGrandSlam(level, type)) {
        return isVulnerable ? 1500 + 500 : 1000 + 300
    } else {
        return 50;
    }
}

function isSmallSlam(level: number, type: ContractType): boolean {
    return level === 6
}

function isGrandSlam(level: number, type: ContractType): boolean {
    return level === 7;
}

export function getOverTricksBonus(overTricks: number, type: ContractType, isVulnerable: boolean, isDoubled: boolean, isRedoubled: boolean): number {
    if (!isDoubled && !isRedoubled) {
        if (type === 'Hearts' || type === 'Spades' || type === 'NoTrump') {
            return overTricks * 30;
        } else {
            return overTricks * 20;
        }
    } else {
        return overTricks * 100 * (isVulnerable ? 2 : 1) * (isRedoubled ? 2 : 1);
    }
}

export function calculateScore(boardNumber: number, level: number, type: ContractType, tricksMade: number, by: By, haveI: boolean, isDoubled: boolean, isRedoubled: boolean): number {
    const isVulnerabl = isVulnerable(getVulnerability(boardNumber - 1), by);
    if (getIsMade(tricksMade, level)) {
        let score = getPureScore(level, type)
        score = score + getScoreModifier(isDoubled, isRedoubled, score);
        score = score + getBonus(score, level, type, isVulnerabl);
        score = score + getOverTricksBonus((tricksMade - 6 - level), type, isVulnerabl, isDoubled, isRedoubled);
        score = score + (isDoubled ? 50 : 0) + (isRedoubled ? 100 : 0)
        if (haveI) {
            return score;
        } else {
            return 0 - score;
        }
    } else {
        const downScore = getDownScore(isVulnerabl, isDoubled, isRedoubled, getTricksDown(tricksMade, level));
        if (haveI) {
            debugger;
            return 0 - downScore;
        } else {
            return downScore;
        }
    }
}
