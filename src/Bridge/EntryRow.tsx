import * as React from 'react';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Button, styled } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ContractType, Entry, ScoreTableProps, ScoreTableRowProps } from '../model';
import { purpuleColor } from '../styles';
import { getSymbol } from './Helpers/utils';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: purpuleColor,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const EntryRow: React.FC<ScoreTableRowProps> = ({ entry, calculateImpsTotalUpTo, calculateScoreTotalUpTo, onDeleteClick }) => {
  return (
    <StyledTableRow
      key={entry.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <StyledTableCell component="th" scope="row">
        {entry.boardNumber}
      </StyledTableCell>
      <StyledTableCell align="right">{entry.contractLevel} {getSymbol(entry.contractType)} {entry.isDoubled ? 'X' : entry.isRedoubled ? 'XX' : ''}</StyledTableCell>
      <StyledTableCell align="right">{entry.by}</StyledTableCell>
      <StyledTableCell align="right">{entry.score}</StyledTableCell>
      <StyledTableCell align="right">{entry.imps}</StyledTableCell>
      <StyledTableCell align="right"> <b>{calculateImpsTotalUpTo(entry.id)}</b></StyledTableCell>
      <StyledTableCell align="right"><b>{calculateScoreTotalUpTo(entry.id)}</b></StyledTableCell>
      <StyledTableCell align="right">
        {entry.points}
      </StyledTableCell>
      <StyledTableCell align="right">
        <Button
          variant="text"
          onClick={() => onDeleteClick(entry.id)}>
          <DeleteIcon />
        </Button>
      </StyledTableCell>
    </StyledTableRow>
  );
}

export default EntryRow;