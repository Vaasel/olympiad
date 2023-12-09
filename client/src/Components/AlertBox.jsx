import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const AlertBox = ({ open, onClose, onConfirm, dialogContent }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" height='200px' fullWidth>
      <DialogContent>
        {dialogContent}
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
            marginLeft: '10px', // Adjusted spacing between buttons
          }}
          onClick={onConfirm}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertBox;


// import React from 'react';
// import Dialog from '@mui/material/Dialog';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import Button from '@mui/material/Button';

// const AlertBox = ({ open, onClose, onConfirm }) => {
//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="md" height='200px' fullWidth>
//       <DialogContent>
//         <p style={{ color: 'black', textAlign: 'center' }}>
//           Are you sure you want to apply in this sports?
//         </p>
//       </DialogContent>
//       <DialogActions style={{ justifyContent: 'center' }}>
//         <Button
//           variant="outlined"
//           style={{ color: 'blue', borderColor: 'white', borderRadius: '20px' }}
//           onClick={onClose}
//         >
//           Cancel
//         </Button>
//         <Button
//           variant="contained"
//           style={{
//             backgroundColor: 'lightgrey',
//             color: 'white',
//             borderRadius: '20px',
//             marginLeft: '10px', // Adjusted spacing between buttons
//           }}
//           onClick={onConfirm}
//         >
//           Confirm
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default AlertBox;
