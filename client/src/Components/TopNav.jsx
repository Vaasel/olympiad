//working in progress

import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

const TopNavBar = ({ logoImagePath, profileImagePath, userName }) => {
  const [loggedIn, setLoggedIn] = useState(true);

  const handleLogout = () => {
    // Implement your logout logic here
    setLoggedIn(false);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#1F292B' }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Adjusted styles for the logo image to make it bigger */}
          <img
            src={logoImagePath}
            alt="Logo"
            style={{ width: '80px', height: '80px', objectFit: 'contain', marginRight: '10px' }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {loggedIn && (
            <>
              {/* Adjusted styles for the profile image */}
              <Avatar
                src={profileImagePath}
                alt="Profile"
                style={{ width: '40px', height: '40px', objectFit: 'contain', margin: '20px' }}
              />
              <Typography variant="body1" style={{ margin: '20px' }}>
                {userName}
              </Typography>
            </>
          )}
          {loggedIn && (
            <Button
              variant="contained"
              style={{ backgroundColor: 'red', color: 'white', borderRadius: '20px', paddingRight:'10px' }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavBar;

// import React, { useState } from 'react';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import Avatar from '@mui/material/Avatar';

// const TopNavBar = ({ logoImagePath, profileImagePath, userName }) => {
//   const [loggedIn, setLoggedIn] = useState(true);

//   const handleLogout = () => {
//     // Implement your logout logic here
//     setLoggedIn(false);
//   };

//   return (
//     <AppBar position="static" style={{ backgroundColor: '#1F292B' }}>
//       <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//           {/* Adjusted styles for the logo image */}
//           <img
//             src={logoImagePath}
//             alt="Logo"
//             style={{ width: '50px', height: '50px', objectFit: 'contain', marginRight: '10px' }}
//           />
//         </div>
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//           {loggedIn && (
//             <>
//               {/* Adjusted styles for the profile image */}
//               <Avatar
//                 src={profileImagePath}
//                 alt="Profile"
//                 style={{ width: '40px', height: '40px', objectFit: 'contain', margin: '20px' }}
//               />
//               <Typography variant="body1" style={{ margin: '20px' }}>
//                 {userName}
//               </Typography>
//             </>
//           )}
//           {loggedIn && (
//             <Button
//               variant="contained"
//               style={{ backgroundColor: 'red', color: 'white', borderRadius: '20px' }}
//               onClick={handleLogout}
//             >
//               Logout
//             </Button>
//           )}
//         </div>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default TopNavBar;
