import React, { useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import CustomCard from '../Components/CustomCard';
import StatusCard from '../Components/StatusCards';
import TopNav from '../Components/TopNav';
import { useState } from 'react';
import SideNav from '../Components/SideNav';
import JoinTeamCard from '../Components/JoinTeamCard';
import OpenCard from '../Components/OpenCard';
import AlertBox from '../Components/AlertBox';
import Button from '@mui/material/Button';
// import SideNav from '../Components/SideNav';
import logo from '../Images/logo/logo.png';
import API_URL from '../config';
import axios from 'axios';

const Dashboard = () => {

  const [isApplied, setIsApplied] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const customDialogContent = "Are you sure you want to apply for accomodation?"
  
  const handleApplyClick = () => {
    // Display the AlertBox when the 'Apply' button is clicked
    setAlertOpen(true);
  };

  const handleConfirmApply = () => {
    // Additional logic or API calls can be added here.
    setIsApplied(true);
    setAlertOpen(false);
  };

  const handleCancelApply = () => {
    // Handle cancel action if needed
    setAlertOpen(false);
  };

  
  const statusCardData = [
    {
      title: 'Verified',
      description: 'Account Verification',
      color: '#FFD2B1', 
    },
    {
      title: 'Pending',
      description: 'Challan Status',
      color : '#FFB1B1',
    },
    {
      title: 'Applied',
      description: 'Accomodation Status',
      color: '#E7AEFF', // Specify the color for the third card
    },
  ];

    const cardData = [
      {
        title: 'Badminton',
        description: 'PKR 700/-',
        doneCount: 3,
        leftCount: 8,
      },
      {
        title: 'Badminton',
        description: 'PKR 700/-',
        doneCount: 3,
        leftCount: 8,
      },
      {
        title: 'Badminton',
        description: 'PKR 700/-',
        doneCount: 3,
        leftCount: 8,
      },
      {
        title: 'Badminton',
        description: 'PKR 700/-',
        doneCount: 3,
        leftCount: 8,
      },
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        {/* TopNav */}
        <TopNav
          logoImagePath={logo}
          profileImagePath="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          userName="John Doe"
          // style={{ zIndex: 2 }}
        />
  
        {/* Main Container */}
        <div style={{ display: 'flex', flexGrow: 0.5, overflow: 'hidden' }}>
          {/* SideNav */}
          <div
            style={{
              flex: '0 0 15%',
              overflowY: 'auto',
              position: 'sticky',
              top: '64px',
              height: 'calc(100vh - 64px)', // Adjusted height to cover the remaining viewport
            }}
          >
            <SideNav />
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
              Dashboard
            </Typography>
            
            <Grid container spacing={2}>
              {statusCardData.map((card, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <StatusCard {...card} />
                </Grid>
              ))}
            </Grid>
            <Typography variant="h5" component="div" sx={{ mt: 2, fontWeight: 'bold', fontFamily: 'LemonMilkBold' }}>
              Accommodation
            </Typography>
            <Typography variant="p" component="div">
              Apply with just one click and our team will contact you through email.
            </Typography>
  
            
            <Button
            variant="contained"
            color={isApplied ? 'grey' : 'primary'}
            sx={{ mb: 2, mt: 2, color: 'white', borderRadius: '10px', fontFamily: 'LemonMilkBold' }}
            onClick={handleApplyClick}
            disabled={isApplied}
          >
            {isApplied ? 'Applied' : 'Apply for Accommodation'}
            </Button>
            <br></br>
            <br></br>
  
            {/* My Sports Cards Section */}
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', fontFamily: 'LemonMilkBold' }}>
              My Sports
            </Typography>
            <Grid container spacing={2}>
              {cardData.map((card, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <OpenCard {...card} />
                </Grid>
              ))}
            </Grid>
  
            {/* My Competitions Cards Section */}
            <Typography variant="h5" component="div" sx={{ mt: 2, fontWeight: 'bold', fontFamily: 'LemonMilkBold' }}>
              My Competitions
            </Typography>
            <Grid container spacing={2}>
              {cardData.map((card, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <OpenCard {...card} />
                </Grid>
              ))}
            </Grid>
            
            {/* AlertBox component */}
      <AlertBox
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        onConfirm={handleConfirmApply}
        dialogContent={customDialogContent}
      />
          </div>
        </div>
      </div>
    );
};
export default Dashboard;


