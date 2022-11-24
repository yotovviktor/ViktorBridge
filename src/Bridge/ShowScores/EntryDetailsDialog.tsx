import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { EntryDetailsDialogProps } from '../../model';
import DeleteIcon from '@mui/icons-material/Delete';
import { Divider, Typography } from '@mui/material';
import { getSymbol } from '../Helpers/utils';

const paragraphSxProps = {
    marginTop: '15px',
    marginBottom: '15px'
}

const EntryDetailsDialog: React.FC<EntryDetailsDialogProps> = ({ entry, calculateImpsTotalUpTo, calculateScoreTotalUpTo, onDeleteClick, close }) => {
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
        close();
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="xs"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center' }}>
                    {"Entry Details"}
                </DialogTitle>
                <DialogContent sx={{ textAlign: 'center' }}>
                    <Divider sx={paragraphSxProps}/>
                    <Typography sx={paragraphSxProps}>
                        {entry.contractLevel} {getSymbol(entry.contractType)} {entry.isDoubled ? 'X' : entry.isRedoubled ? 'XX' : ''}
                        <i style={{ opacity: '0.5', marginLeft: '5px' }}>({entry.points.toString() + ' ' + 'pts'} )</i>
                        by {entry.by}
                    </Typography>
                    <Typography sx={paragraphSxProps}>
                        Score : {entry.score}
                    </Typography>
                    <Typography sx={paragraphSxProps}>
                        Total Score : {calculateScoreTotalUpTo(entry.id)}
                    </Typography>
                    <Typography sx={paragraphSxProps}>
                        Imps : {entry.imps}
                    </Typography>
                    <Typography sx={paragraphSxProps}>
                        Total Imps : {calculateImpsTotalUpTo(entry.id)}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="text"
                        onClick={() => { onDeleteClick(entry.id); handleClose(); }}>
                        <DeleteIcon />
                    </Button>
                    <Button onClick={handleClose} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EntryDetailsDialog;