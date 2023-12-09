import React, { useState } from 'react';
import { Card, CardContent, Button, Typography, Box } from '@mui/material';
import CreateTeamAlertBox from './CreateTeamAlertBox';

const CreateTeamCard = ({ gender, sports, doneCount, leftCount, teamCode }) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [isCreateTeamDialogOpen, setCreateTeamDialogOpen] = useState(false);
  const [isCreated, setIsCreated] = useState(false);

  const handleOpenCreateTeamDialog = () => {
    setCreateTeamDialogOpen(true);
  };

  const handleCloseCreateTeamDialog = () => {
    setCreateTeamDialogOpen(false);
  };

  const handleConfirmCreateTeam = () => {
    // Add logic for confirming and handling team creation
    // This might involve interacting with your backend or performing other actions

    // You can set the teamCode as needed in your logic

    setIsCreated(true);
    handleCloseCreateTeamDialog();
  };

  const handleCreateClick = () => {
    // Display the AlertBox when the 'Create' button is clicked
    if (!isCreated) {
      handleOpenCreateTeamDialog();
    }
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
          {isCreated ? (
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1.1rem', margin: '10px 0' }}>
              Team Code: {teamCode}
            </Typography>
          ) : (
            <Button
              variant="contained"
              color="primary"
              sx={{ width: '60%', mt: 2, color: 'white', borderRadius: '20px', fontWeight: 'bold' }}
              onClick={handleCreateClick}
              disabled={isCreated}
            >
              {isCreated ? `Team Code: ${teamCode}` : 'Create'}
            </Button>
          )}
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

// import React, { useState } from 'react';
// import { Card, CardContent, Button, Typography, Box } from '@mui/material';
// import CreateTeamAlertBox from './CreateTeamAlertBox';

// const CreateTeamCard = ({ gender, sports, doneCount, leftCount, teamCode }) => {
//   const [alertOpen, setAlertOpen] = useState(false);
//   const [isCreateTeamDialogOpen, setCreateTeamDialogOpen] = useState(false);

//   const handleOpenCreateTeamDialog = () => {
//     setCreateTeamDialogOpen(true);
//   };

//   const handleCloseCreateTeamDialog = () => {
//     setCreateTeamDialogOpen(false);
//   };

//   const handleConfirmCreateTeam = () => {
//     // Add logic for confirming and handling team creation
//     // This might involve interacting with your backend or performing other actions

//     // You can set the teamCode as needed in your logic

//     handleCloseCreateTeamDialog();
//   };

//   const handleCreateClick = () => {
//     // Display the AlertBox when the 'Apply' button is clicked
//     handleOpenCreateTeamDialog();
//   };

//   return (
//     <div>
//       <Card sx={{ borderRadius: '20px', maxWidth: 300, margin: '30px', alignItems: 'center', backgroundColor: '#f5f5f5', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
//         <CardContent sx={{ textAlign: 'center' }}>
//           <Typography variant="h5" component="div">
//             {sports}
//           </Typography>
//           <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
//             PKR 700/-
//           </Typography>
//           {teamCode ? (
//             <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1.1rem', margin: '10px 0' }}>
//               Team Code: {teamCode}
//             </Typography>
//           ) : (
//             <Button
//               variant="contained"
//               color={teamCode ? 'grey' : 'primary'}
//               sx={{ width: '60%', mt: 2, color: 'white', borderRadius: '20px', fontWeight: 'bold' }}
//               onClick={handleCreateClick}
//               disabled={teamCode}
//             >
//               {teamCode ? `Team Code: ${teamCode}` : 'Create'}
//             </Button>
//           )}
//           <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left', fontSize: '1.1rem' }}>
//               {doneCount} done
//             </Typography>
//             <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'right', fontSize: '1.1rem' }}>
//               {leftCount} left
//             </Typography>
//           </Box>
//         </CardContent>
//       </Card>

//       {/* AlertBox component */}
//       <CreateTeamAlertBox
//         open={isCreateTeamDialogOpen}
//         onClose={handleCloseCreateTeamDialog}
//         onConfirm={handleConfirmCreateTeam}
//         genderVar={gender}
//         sportsNameVar={sports}
//       />
//     </div>
//   );
// };

// export default CreateTeamCard;
