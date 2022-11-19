import { Entry } from "../../model";
import { calculateImps } from "./CalculateImpsScore";
import { calculateScore } from "./CalculateScore";

export function calculateBoard(entry: Entry,): Entry {
    const pointsBy = entry.by === 'N-S' ? entry.points : 40 - entry.points

    const score = calculateScore(entry.boardNumber, entry.contractLevel, entry.contractType, entry.tricksMade, entry.by, false, entry.isDoubled, entry.isRedoubled);
    const imps = calculateImps(score, pointsBy, entry.boardNumber, entry.by)
    if (entry.by === 'N-S') {
        entry.imps = imps;
        entry.score = score;
    } else {
        entry.imps = 0 - imps;
        entry.score = 0 - score;
    }

    return entry;
}