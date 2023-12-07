import React from 'react';
import { Grid, Typography } from '@mui/material';
import CustomCard from '../Components/CustomCard';
import StatusCard from '../Components/StatusCards';
import TopNav from '../Components/TopNav';
import { useState } from 'react';
import SideNav from '../Components/SideNav';
// import SideNav from '../Components/SideNav';


const Dashboard = () => {


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
        <TopNav
          logoImagePath="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Dyson_logo.svg/2560px-Dyson_logo.svg.png"
          profileImagePath="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          userName="John Doe"
        />
    
        <div style={{ display: 'flex', flexGrow: 1, flexDirection: 'row' }}>
          {/* SideNav */}
          <div style={{ flex: '0 0 20%', maxWidth: '20%' }}>
            <SideNav />
          </div>
    
          {/* Content */}
          <div style={{ flex: '1', overflow: 'auto' }}>
            <Typography variant="h3" component="div" sx={{ margin: '20px' }}>
              Dashboard
            </Typography>
            <Grid container spacing={2}>
              {statusCardData.map((card, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <StatusCard {...card} />
                </Grid>
              ))}
            </Grid>
    
            {/* My Sports Cards Section */}
            <Typography variant="h3" component="div" sx={{ margin: '20px' }}>
              My Sports
            </Typography>
            <Grid container spacing={2}>
              {cardData.map((card, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <CustomCard {...card} />
                </Grid>
              ))}
            </Grid>
    
            {/* My Competitions Cards Section */}
            <Typography variant="h3" component="div" sx={{ margin: '20px' }}>
              My Competitions
            </Typography>
            <Grid container spacing={2}>
              {cardData.map((card, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <CustomCard {...card} />
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </div>
    );  
  };
 
  export default Dashboard;


