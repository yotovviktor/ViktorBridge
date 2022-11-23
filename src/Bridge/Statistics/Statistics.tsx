import { Divider, Typography } from "@mui/material";
import { Entry, StatisticsProps } from "../../model";
import { getStatisticsData } from "../Calculation/StatisticsCalculations";
import { useStoreState } from "../../Store/Hooks";
import PieChart from "./PieChart";

const marginTopBottom15SX = {
    marginTop: '15px',
    marginBottom: '15px'
}

const Statistics: React.FC<StatisticsProps> = (by) => {
    const { entries } = useStoreState((state) => state)

    const data = getStatisticsData(entries, by.by);

    const pieChartData = [
        ["", "Points"],
        ["N-S Pts", data.pointsNSAvv],
        ["E-W Pts", data.pointsEWAvv],
    ];

    return (
        <div style={{ textAlign: 'center' }}>
            <Typography fontSize={22} sx={{ textAlign: 'center' }}>
                Points
            </Typography>
            <PieChart data={pieChartData} options={{ title: 'Points distribution' }} />
            <Divider sx={marginTopBottom15SX} />
            <Typography sx={{ m: '10px' }}>
                You have played {data.contractsByCount} games.
            </Typography>
            <Divider sx={marginTopBottom15SX} />
            <Typography sx={{ m: '10px' }}>
                Games made with less than 25 HCP: {data.gamesBelow24Count}.
            </Typography>
            <Typography sx={{ m: '10px' }}>
                You have won {data.gamesBewol24Imps} imps from them!
            </Typography>
            <Divider sx={marginTopBottom15SX} />
            <Typography sx={{ m: '10px' }}>
                Games <b>not</b> made with less than 25 HCP: {data.gamesBelow25DownCount}.
            </Typography>
            <Typography sx={{ m: '10px' }}>
                You have gained {data.gamesBelow25DownImps} imps from them!
            </Typography>
            <Divider sx={marginTopBottom15SX} />
            <Typography sx={{ m: '10px' }}>
                Games made with more than 25 HCP: {data.gamesOver25Count}
            </Typography>
            <Typography sx={{ m: '10px' }}>
                You have gained {data.gamesOver25Imps} imps from them!
            </Typography>
            <Divider sx={marginTopBottom15SX} />
            <Typography sx={{ m: '10px' }}>
                Games <b>not</b> made with more than 25 HCP: {data.gamesOver25DownCount}
            </Typography>
            <Typography sx={{ m: '10px' }}>
                You have lost {data.gamesOver25DownImps} imps from them!
            </Typography>
            <Divider sx={marginTopBottom15SX} />
            <Typography sx={{ m: '10px' }}>
                Slams made: {data.slamsCount}
            </Typography>
            <Typography sx={{ m: '10px' }}>
                You have gained {data.slamsImps} imps from them!
            </Typography>
            <Divider sx={marginTopBottom15SX} />
            <Typography sx={{ m: '10px' }}>
                Slams <b>not</b> made: {data.slamsDownCount}
            </Typography>
            <Typography sx={{ m: '10px' }}>
                You have lost {data.slamsDownImps} imps from them!
            </Typography>

        </div >
    )
}

export default Statistics;