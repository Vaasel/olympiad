import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';

const CreateTeamAlertBox = ({ open, onClose, onConfirm, genderVar, sportsNameVar }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" height='200px' fullWidth>
      <DialogContent>
        <Typography variany='h2'>Create {genderVar} {sportsNameVar} Team</Typography>
        <br></br>
        <Typography variany='h4'>Enter Team Name:</Typography>
        <TextField
          variant="outlined"
          placeholder="Team Name"
          fullWidth
          style={{ borderRadius: '20px', marginBottom: '10px' }}
        />
      </DialogContent>
      <DialogActions style={{ justifyContent: 'center' }}>
        <Button
          variant="outlined"
          style={{ color: 'blue', borderColor: 'white', borderRadius: '20px' }}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          style={{
            backgroundColor: 'blue',
            color: 'white',
            borderRadius: '20px',
            marginLeft: '10px'
          }}
          onClick={onConfirm}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTeamAlertBox;
