import React, { useState } from 'react';
import { Card, CardContent, Button, Typography, Box } from '@mui/material';
import CreateTeamAlertBox from './CreateTeamAlertBox';

const CreateTeamCard = ({ gender, sports, doneCount, leftCount  }) => {
  const [isCreated, setIsCreated] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
//   const customDialogContent = "Are you sure you want to apply in this sports?";
  
    const [isCreateTeamDialogOpen, setCreateTeamDialogOpen] = useState(false);
  
    const handleOpenCreateTeamDialog = () => {
      setCreateTeamDialogOpen(true);
    };
  
    const handleCloseCreateTeamDialog = () => {
      setCreateTeamDialogOpen(false);
    };
  
    const handleConfirmCreateTeam = () => {
      // Add logic for confirming and handling team creation
      // This might involve interacting with your backend or performing other actions
      handleCloseCreateTeamDialog();
    };

  const handleCreateClick = () => {
    // Display the AlertBox when the 'Apply' button is clicked
    setAlertOpen(true);
  };

  const handleConfirmCreate = () => {
    // Additional logic or API calls can be added here.
    setIsCreated(true);
    setAlertOpen(false);
  };

  const handleCancelCreate = () => {
    // Handle cancel action if needed
    setAlertOpen(false);
  };

  return (
    <div>
      <Card sx={{ borderRadius: '20px', maxWidth: 300, margin: '30px', alignItems: 'center', backgroundColor: '#f5f5f5', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant="h5" component="div">
            {sports}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
            PKR 700/-
          </Typography>
          <Button
            variant="contained"
            color={isCreated ? 'grey' : 'primary'}
            sx={{ width: '60%', mt: 2, color: 'white', borderRadius: '20px', fontWeight: 'bold' }}
            onClick={handleCreateClick}
            disabled={isCreated}
          >
            {isCreated ? 'Created' : 'Create'}
          </Button>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left', fontSize: '1.1rem' }}>
              {doneCount} done
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'right', fontSize: '1.1rem' }}>
              {leftCount} left
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* AlertBox component */}
      <CreateTeamAlertBox
        open={isCreateTeamDialogOpen}
        onClose={handleCloseCreateTeamDialog}
        onConfirm={handleConfirmCreateTeam}
        genderVar={gender} 
        sportsNameVar={sports} 
      />
    </div>
  );
};
export default CreateTeamCard;
