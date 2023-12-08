
import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SportsIcon from '@mui/icons-material/Sports';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PaymentIcon from '@mui/icons-material/Payment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const drawerWidth = 240;
const logoImagePath ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGZpzfGOb1d6ZbEiairsX09aVHH9gROHhbGw&usqp=CAU';
const SideNav = () => {
  const rootStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#1F292B',
    overflowY: 'auto',
    paddingTop: '64px',
  };

  const drawerStyles = {
    width: drawerWidth,
    flexShrink: 0,
  };

  const listItemTextStyles = {
    color: 'lightgrey',
  };

  return (
    <div style={rootStyles}>
      <nav style={drawerStyles} aria-label="mailbox folders">
      <div style={{ display: 'flex', alignItems: 'center', marginLeft:'75px' }}>
          {/* Adjusted styles for the logo image to make it bigger */}
          <img
            src={logoImagePath}
            alt="Logo"
            style={{ width: '80px', height: '80px', objectFit: 'contain', marginRight: '10px' }}
          />
        </div>
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


