// // // //working in progress


import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SportsIcon from '@mui/icons-material/Sports';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PaymentIcon from '@mui/icons-material/Payment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const drawerWidth = 240;

const SideNav = () => {
  const rootStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start', // Align items to the top
    alignItems: 'center',
    height: '100vh', // Set height to 100vh to cover the whole screen
    backgroundColor: '#1F292B',
  };

  const drawerStyles = {
    width: drawerWidth,
    flexShrink: 0,
  };

  const drawerPaperStyles = {
    width: drawerWidth,
    backgroundColor: '#1F292B',
  };

  const listItemTextStyles = {
    color: 'lightgrey',
  };

  return (
    <div style={rootStyles}>
      <nav style={drawerStyles} aria-label="mailbox folders">
        <List>
          <ListItem>       
            <ListItemText primary ="    "></ListItemText>
          </ListItem>
          <Divider style={{ backgroundColor: 'lightgrey' }} />
          <ListItem button component="a" href="#">
            <ListItemIcon>
              <DashboardIcon style={{ color: 'lightgrey' }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" style={listItemTextStyles} />
          </ListItem>
          <ListItem button component="a" href="#">
            <ListItemIcon>
              <SportsIcon style={{ color: 'lightgrey' }} />
            </ListItemIcon>
            <ListItemText primary="Sports" style={listItemTextStyles} />
          </ListItem>
          <ListItem button component="a" href="#">
            <ListItemIcon>
              <EmojiEventsIcon style={{ color: 'lightgrey' }} />
            </ListItemIcon>
            <ListItemText primary="Competition" style={listItemTextStyles} />
          </ListItem>
          <ListItem button component="a" href="#">
            <ListItemIcon>
              <PaymentIcon style={{ color: 'lightgrey' }} />
            </ListItemIcon>
            <ListItemText primary="Payment" style={listItemTextStyles} />
          </ListItem>
        </List>
        <Divider style={{ backgroundColor: 'lightgrey' }} />
        <List>
          <ListItem button component="a" href="#">
            <ListItemIcon>
              <ExitToAppIcon style={{ color: 'lightgrey' }} />
            </ListItemIcon>
            <ListItemText primary="Logout" style={listItemTextStyles} />
          </ListItem>
        </List>
      </nav>
    </div>
  );
};

export default SideNav;


