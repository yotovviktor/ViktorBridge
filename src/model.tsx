export type By = 'N-S' | 'E-W' | '';
export type ContractType = 'Clubs' | 'Diamonds' | 'Hearts' | 'Spades' | 'NoTrump' | '';
export type Vulnerability = 'N-S' | 'E-W' | 'Both' | 'None';

export interface ScoreTableProps {
    onDelete: (entryId: number) => void;
    onEdit: (entryId: number) => void;
}

export interface ScoreTableRowProps {
    entry: Entry;
    onDeleteClick: (entryId: number) => void;
    onEditClick: (entryId: number) => void;
    calculateScoreTotalUpTo: (entryId: number) => number;
    calculateImpsTotalUpTo: (entryId: number) => number;
}

export interface StatisticsProps {
    by: By;
}

export interface PieChartProps {
    data: (string | number)[][],
    options: { title: string }
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
    addEntryFunction: (entry: Entry) => void;
}

export interface ScoreToImps {
    lower: number;
    upper: number;
    imps: number;
}

export interface StatisticsData {
    contractsByCount: number,
    pointsNSAvv: number,
    pointsEWAvv: number,
    gamesBelow24Count: number,
    gamesBewol24Imps: number,
    gamesOver25Count: number,
    gamesOver25Imps: number,
    slamsCount: number,
    slamsImps: number,
    gamesBelow25DownCount: number,
    gamesBelow25DownImps: number,
    gamesOver25DownCount: number,
    gamesOver25DownImps: number,
    slamsDownCount: number,
    slamsDownImps: number,
}