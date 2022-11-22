import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Statistics from './Statistics';
import { By } from '../../model';
import { ButtonGroup, Container, DialogActions, SxProps } from '@mui/material';

const containerSx: SxProps = {
  width: "max-content",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: 4,
  borderRadius: 2,
};

export default function ScrollDialog() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
  const [by, setBy] = React.useState('' as By);
  const handleClickOpen = (scrollType: DialogProps['scroll'], byArg: By) => () => {
    setBy(byArg);
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <>
      <Container sx={containerSx}>
        <Button color="secondary" onClick={handleClickOpen('body', 'N-S')}>Statistics By N-S</Button>
        <Button onClick={handleClickOpen('body', 'E-W')}>Statistics By E-W</Button>
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        fullWidth={true}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Statistics</DialogTitle>
        <DialogContent dividers={scroll === 'body'} >
          <Statistics by={by} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}