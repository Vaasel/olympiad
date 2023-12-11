import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Divider, IconButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SportsIcon from '@mui/icons-material/Sports';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PaymentIcon from '@mui/icons-material/Payment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;
const logoImagePath =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGZpzfGOb1d6ZbEiairsX09aVHH9gROHhbGw&usqp=CAU';

const SideNav = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(window.innerWidth >= 900);

  const handleDrawerToggle = () => {
    setIsDrawerOpen((prev) => !prev);
  };

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

  useEffect(() => {
    const handleResize = () => {
      setIsDrawerOpen(window.innerWidth >= 900);
    };

    // Set initial state based on screen size
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={rootStyles}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerToggle}
        sx={{ display: { xs: 'block', md: 'none', color: 'white' }, zIndex:1 }}
      >
        <MenuIcon />
      </IconButton>
      <nav style={{ ...drawerStyles, display: isDrawerOpen ? 'block' : 'none' }} aria-label="mailbox folders">
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '75px' }}>
          <img
            src={logoImagePath}
            alt="Logo"
            style={{ width: '80px', height: '80px', objectFit: 'contain', marginRight: '10px', zIndex:2 }}
          />
        </div>
        <List>
          <ListItem>
            <ListItemText primary="    " />
          </ListItem>
          <Divider style={{ backgroundColor: 'lightgrey' }} />
          <ListItem button component="a" href="#">
            <ListItemIcon>
              <DashboardIcon style={{ color: 'lightgrey' }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" style={listItemTextStyles} />
          </ListItem>
          <ListItem button component="a" href="/createteam">
            <ListItemIcon>
              <SportsIcon style={{ color: 'lightgrey' }} />
            </ListItemIcon>
            <ListItemText primary="Join Sports" style={listItemTextStyles} />
          </ListItem>
          <ListItem button component="a" href="/createteam">
            <ListItemIcon>
              <EmojiEventsIcon style={{ color: 'lightgrey' }} />
            </ListItemIcon>
            <ListItemText primary="Competition" style={listItemTextStyles} />
          </ListItem>
          <ListItem button component="a" href="/payments">
            <ListItemIcon>
              <PaymentIcon style={{ color: 'lightgrey' }} />
            </ListItemIcon>
            <ListItemText primary="Payment" style={listItemTextStyles} />
          </ListItem>
        </List>
        <Divider style={{ backgroundColor: 'lightgrey' }} />
        <List>
          <ListItem button component="a" href="/login">
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