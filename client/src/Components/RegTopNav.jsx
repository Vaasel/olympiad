//working in progress

import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const RegTopNavBar = () => {

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
          
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
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

export default RegTopNavBar;
