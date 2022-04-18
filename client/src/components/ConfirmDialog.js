import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';


export default function ConfirmDialog(props) {
    const { onClose, title, open, content } = props;
    const handleCancel = () => {
      onClose(false);
    };
  
    const handleOk = () => {
      onClose(true);
    };

    return (
      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435, color:'black' } }}
        maxWidth="xs"
        open={open}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent dividers>
          {content}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancel} color="primary"  variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleOk} color="error" variant="contained">Ok</Button>
        </DialogActions>
      </Dialog>
    );
  }
  
