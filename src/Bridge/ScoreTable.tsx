import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ScoreTableProps } from '../model';
import EntryRow, { StyledTableCell, StyledTableRow } from './EntryRow';
import { SxProps, useMediaQuery } from '@mui/material';
import { useStoreState } from '../Store/Hooks';

const tableContainerSx: SxProps = {
    border: "1px solid rgba(128,128,128,0.4)",
    width: "max-content",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 4,
    borderRadius: 2,
    maxHeight: 500
};

export const ScoreTable: React.FC<ScoreTableProps> = ({ onDelete, onEdit }) => {

    const { entries, windowSize } = useStoreState((store) => store)

    const calculateImpsTotalUpTo = (entryId: number): number =>
        entries.filter(entry => entry.id <= entryId)
            .map(entry => entry.imps)
            .reduce<number>((accumulator, current) => {
                return accumulator + current;
            }, 0);

    const calculateScoreTotalUpTo = (entryId: number): number =>
        entries.filter(entry => entry.id <= entryId)
            .map(entry => entry.score)
            .reduce<number>((accumulator, current) => {
                return accumulator + current;
            }, 0);
    return (
        <TableContainer sx={tableContainerSx}>
            <Table
                stickyHeader={true}
                sx={{ maxWidth: windowSize.width > 600 ? '680px' : `${windowSize.width}px`, minWidth: windowSize.width > 600 ? '600px' : `${windowSize.width}px`}}>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>#</StyledTableCell>
                        <StyledTableCell align="right">Contract</StyledTableCell>
                        <StyledTableCell align="right">By</StyledTableCell>
                        {windowSize.width > 600 ? <StyledTableCell align="right">Score</StyledTableCell> : ''}
                        {windowSize.width > 600 ?<StyledTableCell align="right">Imps</StyledTableCell> : ''}
                        <StyledTableCell align="right">	Imps &Sigma;</StyledTableCell>
                        <StyledTableCell align="right">Score &Sigma;</StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {entries?.map((entry) => (
                        <EntryRow
                            key={entry.id}
                            entry={entry}
                            onDeleteClick={onDelete}
                            onEditClick = {onEdit}
                            calculateImpsTotalUpTo={calculateImpsTotalUpTo}
                            calculateScoreTotalUpTo={calculateScoreTotalUpTo} />))}
                    <StyledTableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <StyledTableCell component="th" scope="row">
                        </StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>
                        {windowSize.width > 600 ? <StyledTableCell align="right"></StyledTableCell> : ''}
                        {windowSize.width > 600 ?<StyledTableCell align="right"></StyledTableCell> : ''}
                        <StyledTableCell align="right"></StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>
                    </StyledTableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}