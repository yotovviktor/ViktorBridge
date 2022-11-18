import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ScoreTableProps } from '../model';
import EntryRow, { StyledTableCell, StyledTableRow } from './EntryRow';

export const ScoreTable: React.FC<ScoreTableProps> = ({ entries, onDelete, onEdit }) => {
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
        <TableContainer style={{ marginLeft: 20 }}>
            <Table sx={{ maxWidth: '680px', minWidth: '600px', border: 1.5, borderRadius: '25%', borderColor: 'grey' }}>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>#</StyledTableCell>
                        <StyledTableCell align="right">Contract</StyledTableCell>
                        <StyledTableCell align="right">By</StyledTableCell>
                        <StyledTableCell align="right">Score</StyledTableCell>
                        <StyledTableCell align="right">Imps</StyledTableCell>
                        <StyledTableCell align="right">	Imps &Sigma;</StyledTableCell>
                        <StyledTableCell align="right">Score &Sigma;</StyledTableCell>
                        <StyledTableCell align="right">Points N-S</StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {entries.map((entry) => (
                        <EntryRow entry={entry} onDeleteClick={onDelete} calculateImpsTotalUpTo={calculateImpsTotalUpTo} calculateScoreTotalUpTo={calculateScoreTotalUpTo} />))}
                    <StyledTableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <StyledTableCell component="th" scope="row">
                        </StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>
                    </StyledTableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}