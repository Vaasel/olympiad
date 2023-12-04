import PropTypes from 'prop-types';
import {
  Box,
  IconButton,
  Avatar,
  Button,
  Typography,
  Tooltip,
  useMediaQuery,
  createTheme,
  ThemeProvider,
  alpha,
  styled
} from '@mui/material';
import { useState } from 'react';

// Use createTheme to access theme.breakpoints
const theme = createTheme();

const StyledBox = styled(Box)(({ theme }) => ({
  backdropFilter: 'blur(6px)',
  backgroundColor: alpha(theme.palette.background.default, 0.8),
  position: 'sticky',
  left: {
    lg: '0', // Adjust as needed
  },
  top: 0,
  width: '100%',
  zIndex: theme.zIndex.appBar,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1),
}));

const TopNav = (props) => {
  const { onNavOpen } = props;
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'));

  const [user] = useState({
    name: 'John Doe',
    avatar: '/path/to/your/avatar.png', // Replace with the actual path to the avatar image
  });

  const handleLogout = () => {
    // Handle logout logic
    console.log('Logout');
  };

  return (
    <ThemeProvider theme={theme}>
      <StyledBox component="header">
        {!lgUp && (
          <IconButton onClick={onNavOpen}>
            {/* Add your menu icon here */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Add your menu icon paths here */}
            </svg>
          </IconButton>
        )}

        {/* Logo */}
        <img
          src="/path/to/logo.png" // Replace with the actual path to the logo image
          alt="Logo"
          style={{ height: '40px', width: 'auto' }}
        />

        {lgUp && (
          <>
            {/* Your SVG icon */}
            <IconButton>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {/* Add your SVG icon paths here */}
              </svg>
            </IconButton>

            {/* User Avatar and Name */}
            <Tooltip title={`Hello, ${user.name}`}>
              <Avatar
                alt={user.name}
                src={user.avatar}
              />
            </Tooltip>
            <Typography variant="subtitle1" sx={{ marginLeft: 1 }}>
              {user.name}
            </Typography>

            {/* Logout Button */}
            <Button variant="contained" sx={{ backgroundColor: 'red', borderRadius: '20px' }} onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </StyledBox>
    </ThemeProvider>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func,
};

export default TopNav;


// import PropTypes from 'prop-types';
// import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
// import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
// import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
// import HorizontalSplitOutlinedIcon from '@mui/icons-material/HorizontalSplitOutlined';

// import {
//   Avatar,
//   Badge,
//   Box,
//   IconButton,
//   Stack,
//   SvgIcon,
//   Tooltip,
//   useMediaQuery,
//   alpha,
//   createTheme,
//   ThemeProvider
// } from '@mui/material';
// import { styled } from '@mui/system';

// const theme = createTheme();
// const SIDE_NAV_WIDTH = '280px';
// const TOP_NAV_HEIGHT = '60px';

// const StyledBox = styled(Box)(({ theme }) => ({
//   backdropFilter: 'blur(6px)',
//   backgroundColor: 'navy', // Change to navy blue
//   position: 'sticky',
//   left: {
//     lg: `${SIDE_NAV_WIDTH}px`
//   },
//   top: 0,
//   width: {
//     lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`
//   },
//   zIndex: theme.zIndex.appBar,
//   minHeight: TOP_NAV_HEIGHT,
//   px: 2
// }));

// export const TopNav = (props) => {
//   const { onNavOpen } = props;
//   const lgUp = useMediaQuery(theme.breakpoints.up('lg'));

//   return (
//     <ThemeProvider theme={theme}>
//       <StyledBox component="header">
//         <Stack
//           alignItems="center"
//           direction="row"
//           justifyContent="space-between"
//           spacing={2}
//         >
//           <Stack
//             alignItems="center"
//             direction="row"
//             spacing={2}
//           >
//             {!lgUp && (
//               <IconButton onClick={onNavOpen}>
//                 <SvgIcon fontSize="small">
//                   <HorizontalSplitOutlinedIcon />
//                 </SvgIcon>
//               </IconButton>
//             )}
//             <Tooltip title="Search">
//               <IconButton>
//                 <SvgIcon fontSize="small">
//                   <SearchOutlinedIcon />
//                 </SvgIcon>
//               </IconButton>
//             </Tooltip>
//           </Stack>
//           <Stack
//             alignItems="center"
//             direction="row"
//             spacing={2}
//           >
//             <Tooltip title="Contacts">
//               <IconButton>
//                 <SvgIcon fontSize="small">
//                   <AccountCircleOutlinedIcon />
//                 </SvgIcon>
//               </IconButton>
//             </Tooltip>
//             <Tooltip title="Notifications">
//               <IconButton>
//                 <Badge
//                   badgeContent={4}
//                   color="success"
//                   variant="dot"
//                 >
//                   <SvgIcon fontSize="small">
//                     <NotificationsOutlinedIcon />
//                   </SvgIcon>
//                 </Badge>
//               </IconButton>
//             </Tooltip>
//             <Avatar
//               sx={{
//                 cursor: 'pointer',
//                 height: 40,
//                 width: 40
//               }}
//               src="/assets/avatars/avatar-anika-visser.png"
//             />
//           </Stack>
//         </Stack>
//       </StyledBox>
//     </ThemeProvider>
//   );
// };

// TopNav.propTypes = {
//   onNavOpen: PropTypes.func
// };
