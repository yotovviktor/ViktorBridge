import * as React from 'react';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Button, styled } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ContractType, Entry, ScoreTableProps, ScoreTableRowProps } from '../model';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
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

  const getSymbol = (type: ContractType) => {
    switch (type) {
      case 'Clubs': return (<span style={{ color: 'green' }}>&clubs;</span>)
      case 'Diamonds': return (<span style={{ color: 'orange' }}>&diams;</span>)
      case 'Hearts': return (<span style={{ color: 'red' }}>&hearts;</span>)
      case 'Spades': return (<span style={{ color: 'blue' }}>&spades;</span>)
      case 'NoTrump': return (<span>NT</span>);
      default: return ''
    }
  }

  return (
    <StyledTableRow
      key={entry.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <StyledTableCell component="th" scope="row">
        {entry.boardNumber}
      </StyledTableCell>
      <StyledTableCell align="right">{entry.contractLevel} {getSymbol(entry.contractType)}</StyledTableCell>
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