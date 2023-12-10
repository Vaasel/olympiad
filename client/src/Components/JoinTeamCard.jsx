import React, { useState } from 'react';
import { Card, CardContent, Button, Typography, Box, TextField } from '@mui/material';
import AlertBox from './AlertBox'; // Import the AlertBox component
import GppBadOutlinedIcon from '@mui/icons-material/GppBadOutlined';


const JoinTeamCard = () => {
  const [isJoined, setIsJoined] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const customDialogContent = "Are you sure you want to join this team?";

  const handleJoinClick = () => {
    // Display the AlertBox when the 'Apply' button is clicked
    setAlertOpen(true);
  };

  const handleConfirmJoin = () => {
    // Additional logic or API calls can be added here.
    setIsJoined(true);
    setAlertOpen(false);
  };

//   const handleCancelJoin = () => {
//     // Handle cancel action if needed
//     setAlertOpen(false);
//   };

  return (
    <div>
      <Card sx={{ borderRadius: '20px', maxWidth: 300, margin: '30px', alignItems: 'center', backgroundColor: '#5D81A5', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant="h5" component="div">
            Join team with a code
          </Typography>
          {/* <CustomTextField type="email" iconType={<GppBadOutlinedIcon />} label="Team Code" style={{ backgroundColor: 'white' }} /> */}
          <TextField label= "Team Code" variant="outlined" margin="normal" fullWidth required style={{ backgroundColor: 'white' }}></TextField>
          <Button
            variant="contained"
            color={isJoined ? 'success' : 'primary'}
            sx={{ width: '60%', mt: 2, color: 'white', borderRadius: '20px', fontWeight: 'bold' }}
            onClick={handleJoinClick}
            disabled={isJoined}
          >
            {isJoined ? 'Joined' : 'Join'}
          </Button>
        </CardContent>
      </Card>

      {/* AlertBox component */}
      <AlertBox
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        onConfirm={handleConfirmJoin}
        dialogContent={customDialogContent}
      />
    </div>
  );
};

export default JoinTeamCard;