import { Divider, Typography } from "@mui/material";
import { Entry, StatisticsProps } from "../../model";
import { useStoreState } from "../Store/Hooks";
import PieChart from "./PieChart";

const marginTopBottom15SX = {
    marginTop: '15px',
    marginBottom: '15px'
}

const Statistics: React.FC<StatisticsProps> = (by) => {
    const getPointsData = () => {
        const nSPointsAvv = (entries.map(e => e.points).reduce<number>((accumulator, current) => {
            return accumulator + current;
        }, 0) / entries.length)

        const eWPointsAvv = 40 - nSPointsAvv;

        const data = [["", "Points"],
        ["N-S Pts", nSPointsAvv],
        ["E-W Pts", eWPointsAvv],
        ];
        return data;
    }

    const getBoardsWithSpecificPoints = (lower: number, upper: number) =>
        entries.filter(e => {
            if (by.by === "N-S") {
                if (e.points >= lower && e.points <= upper && e.by === by.by) {
                    return e;
                }
            } else {
                if ((40 - e.points) >= lower && (40 - e.points) <= upper && e.by === by.by) {
                    return e;
                }
            }
        });

    const getBoardsWhereSlamWithSpecificPoints = (lower: number, upper: number) =>
        getBoardsWithSpecificPoints(lower, upper).filter(e => {
            if (e.contractLevel === 6 && e.tricksMade >= 12) {
                return e;
            }

            if (e.contractLevel === 7 && e.tricksMade === 13) {
                return e;
            }
        });

    const getBoardWhereGamesWithSprcificPoints = (lower: number, upper: number) =>
        getBoardsWithSpecificPoints(lower, upper).filter(e => {
            if ((e.contractType === 'Hearts' || e.contractType === 'Spades') && e.contractLevel >= 4 && e.contractLevel <= 5 && e.tricksMade >= 10) {
                return e;
            }
            if ((e.contractType === 'Clubs' || e.contractType === 'Diamonds') && e.contractLevel == 5 && e.tricksMade >= 11) {
                return e;
            }
            if (e.contractType === 'NoTrump' && e.contractLevel >= 3 && e.contractLevel <= 5 && e.tricksMade >= 9) {
                return e;
            }
        });

    const getWonImpsFromBoards = (lower: number, upper: number, func: (lower: number, upper: number) => Entry[]) => {
        const specificEntries = func(lower, upper);
        const imps = specificEntries.map(e => e.imps).reduce<number>((accumulator, current) => {
            return accumulator + current;
        }, 0);

        if (by.by === 'N-S') {
            return imps;
        } else {
            return 0 - imps;
        }
    }
    const getContractsBy = () => {
        return entries.filter(e => e.by === by.by)?.length;
    }
    const { entries } = useStoreState((state) => state)
    return (
        <div style={{ textAlign: 'center' }}>
            <Typography sx={{ textAlign: 'center' }}>
                <h5>Points</h5>
            </Typography>
            <PieChart data={getPointsData()} options={{ title: 'Points distribution' }} />
            <Divider sx={marginTopBottom15SX} />
            <Typography sx={{ m: '10px' }}>
                You have played {getContractsBy()} games.
            </Typography>
            <Divider sx={marginTopBottom15SX} />
            <Typography sx={{ m: '10px' }}>
                Game made with less than 25 HCP: {getBoardWhereGamesWithSprcificPoints(1, 24)?.length}.
            </Typography>
            <Typography sx={{ m: '10px' }}>
                You have won {getWonImpsFromBoards(1, 24, getBoardWhereGamesWithSprcificPoints)} imps from them!
            </Typography>
            <Divider sx={marginTopBottom15SX} />
            <Typography sx={{ m: '10px' }}>
                Games made with more than 25 HCP: {getBoardWhereGamesWithSprcificPoints(25, 40)?.length}
            </Typography>
            <Typography sx={{ m: '10px' }}>
                You have gained {getWonImpsFromBoards(25, 40, getBoardWhereGamesWithSprcificPoints)} imps from them!
            </Typography>
            <Divider sx={marginTopBottom15SX} />
            <Typography sx={{ m: '10px' }}>
                Slams made: {getBoardsWhereSlamWithSpecificPoints(1, 40)?.length}
            </Typography>
            <Typography sx={{ m: '10px' }}>
                You have gained {getWonImpsFromBoards(1, 40, getBoardsWhereSlamWithSpecificPoints)} imps from them!
            </Typography>

        </div >
    )
}

export default Statistics;