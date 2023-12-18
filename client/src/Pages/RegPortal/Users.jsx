import React from 'react';
import { Grid, Typography } from '@mui/material';
import RegTopNav from '../../Components/RegTopNav';
import RegSideNav from '../../Components/RegSideNav';


const Users = () => {

    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        {/* TopNav */}
        <RegTopNav/>
  
        {/* Main Container */}
        <div style={{ display: 'flex', flexGrow: 0.5, overflow: 'hidden' }}>
          {/* SideNav */}
          <div
            style={{
              flex: '0 0 15%',
              overflowY: 'auto',
              position: 'sticky',
              top: '64px',
              height: 'calc(100vh - 64px)',
            }}

            className="SideNavBarFlex"
          >
            <RegSideNav />
          </div>
  
          {/* Content */}
          <div
            style={{
              flex: '1',
              overflow: 'auto',
              marginLeft: '20px',
              padding: '20px',
              minWidth: 0,
            }}
          >
            {/* Dashboard Section */}
            
            <Typography variant="h4" component="div"  sx={{ fontWeight: 'bold', fontFamily: 'LemonMilkBold' }}>
              Users
            </Typography>
            
          </div>
        </div>
      </div>
    );
};
export default Users;


