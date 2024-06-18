import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material';
import React from 'react';

const ViewJson = ({formData, jsonDialogOpen, setJsonDialogOpen}) => {
 

  return (
    <Dialog
      open={jsonDialogOpen}
      onClose={() => setJsonDialogOpen(false)}
      PaperProps={{
        style: {
          width: '40vw', // Set the fixed width of the dialog
          maxWidth: 'none', // Ensure the max width is not restricted
        },
      }}
    >
       <DialogTitle style={{fontSize:'18px'}}>Form Data (JSON)</DialogTitle>
        <DialogContent dividers>
          <pre style={{backgroundColor:'black', color:'green'}}>
            <code style={{fontSize:'16px'}}>{formData}</code>
          </pre>
        </DialogContent>
      <DialogActions>
        <Button onClick={() => setJsonDialogOpen(false)} color='primary'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewJson;
