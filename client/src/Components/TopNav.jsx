//working in progress

import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';

const TopNavBar = ({ logoImagePath = `${process.env.PUBLIC_URL}/logo.png`, profileImagePath, userName }) => {

  const [loggedIn, setLoggedIn] = useState(true);
  const navigate = useNavigate();


  const handleLogout = () => {
    navigate('/login');
    setLoggedIn(false);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#01463D' }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          
          {/* <img
            src={logoImagePath}
            alt="Logo"
            style={{ width: '80px', height: '80px', objectFit: 'contain', marginRight: '15px' }}
          /> */}
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {loggedIn && (
            <>
              {/* Adjusted styles for the profile image */}
              {/* <Avatar
                src={profileImagePath}
                alt="Profile"
                style={{ width: '40px', height: '40px', objectFit: 'contain', margin: '20px' }}
              /> */}
              <Link href ="/regedit" variant="body1" style={{ margin: '20px',  color:'#ffffff', fontSize: '20px' }}>
                {userName}
              </Link>
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
