import * as React from 'react';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Button, styled } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ScoreTableRowProps } from '../model';
import { purpuleColor } from '../styles';
import { getSymbol } from './Helpers/utils';
import { useStoreState } from '../Store/Hooks';

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

const EntryRow: React.FC<ScoreTableRowProps> = ({ entry, calculateImpsTotalUpTo, calculateScoreTotalUpTo, onDeleteClick, onEditClick }) => {
  const { windowSize } = useStoreState((store) => store)

  return (
    <StyledTableRow
      key={entry.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <StyledTableCell component="th" scope="row">
        {entry.boardNumber}
      </StyledTableCell>
      <StyledTableCell align="right">
        {entry.contractLevel} {getSymbol(entry.contractType)} {entry.isDoubled ? 'X' : entry.isRedoubled ? 'XX' : ''}
        <i style={{ opacity: '0.5', marginLeft: '5px' }}>({entry.points.toString() + ' ' + 'pts'} )</i>
      </StyledTableCell>
      <StyledTableCell align="right">{entry.by}</StyledTableCell>
      {windowSize.width > 600 ? <StyledTableCell align="right">{entry.score}</StyledTableCell> : ''}
      {windowSize.width > 600 ? <StyledTableCell align="right">{entry.imps}</StyledTableCell> : ''}
      <StyledTableCell align="right"> <b>{calculateImpsTotalUpTo(entry.id)}</b></StyledTableCell>
      <StyledTableCell align="right"><b>{calculateScoreTotalUpTo(entry.id)}</b></StyledTableCell>
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