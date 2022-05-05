import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import { borderRadius } from '@mui/system';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 15,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          x
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function CustomizedDialogs({ children, buttonName, buttonColor, buttonBg, title, pay, prd }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}
        sx={{
          color: buttonColor,
          background: buttonBg,
          fontSize: 'normal normal bold 18px/24px Nunito',
          width: '225px',
          paddingTop: '11px',
          paddingBottom: '10px',
          border: 'none',
          marginRight: '5px',
          borderRadius: '8px',
          "&:hover": {
            backgroundColor: buttonBg
          }
        }}
      >
        {buttonName}
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {title}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {children}
          {
            title === 'Satın Al' ?
              <>
                <Button autoFocus onClick={handleClose}
                 
                 sx={{
                  width: '150px',
                  backgroundColor: '#F0F8FF',
                  borderRadius: '8px',
                  font: 'normal normal bold 18px/24px Nunito',
                  color: '#4B9CE2'
                }}
                >
                  Vazgeç
                </Button>
                <Button onClick={() => pay(prd)}
                sx={{
                  width: '150px',
                  backgroundColor: '#4B9CE2',
                  borderRadius: '8px',
                  font: 'normal normal bold 18px/24px Nunito',
                  color: '#fff',
                  "&:hover": {
                    backgroundColor: '#4B9CE2'
                  }
                }}
                >
                  Satın Al
                </Button>
              </>
              :
              ""
          }
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}