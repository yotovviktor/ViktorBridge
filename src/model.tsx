export type By = 'N-S' | 'E-W' | '';
export type ContractType = 'Clubs' | 'Diamonds' | 'Hearts' | 'Spades' | 'NoTrump' | '';
export type Vulnerability = 'N-S' | 'E-W' | 'Both' | 'None';

export interface ScoreTableProps {
    entries: Entry[];
    onDelete: (entryId: number) => void;
    onEdit: (entryId: number) => void;
}

export interface ScoreTableRowProps {
    entry : Entry;
    onDeleteClick : (entryId : number) => void;
    calculateScoreTotalUpTo : (entryId : number) => number;
    calculateImpsTotalUpTo : (entryId : number) => number;
}

export interface Entry {
    id: number;
    boardNumber: number;
    by: By;
    contractLevel: number;
    contractType: ContractType;
    score: number;
    isDoubled: boolean;
    isRedoubled: boolean;
    imps: number;
    points: number;
    tricksMade: number;
}

export interface AddOrEditEntryProps {
    entry: Entry;
    addEntryFunction: (entry: Entry) => void;
}

export interface ScoreToImps {
    lower: number;
    upper: number;
    imps: number;
}