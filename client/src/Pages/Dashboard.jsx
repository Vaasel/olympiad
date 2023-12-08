import React from 'react';
import { Grid, Typography } from '@mui/material';
import CustomCard from '../Components/CustomCard';
import StatusCard from '../Components/StatusCards';
import TopNav from '../Components/TopNav';
import { useState } from 'react';
import SideNav from '../Components/SideNav';
import JoinTeamCard from '../Components/JoinTeamCard';
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
        {/* TopNav */}
        <TopNav
          logoImagePath="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGZpzfGOb1d6ZbEiairsX09aVHH9gROHhbGw&usqp=CAU"
          profileImagePath="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          userName="John Doe"
          style={{ zIndex: 2 }}
        />
  
        {/* Main Container */}
        <div style={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
          {/* SideNav */}
          <div
            style={{
              flex: '0 0 15%',
              borderRight: '1px solid #ccc',
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
              minWidth: 0, // Ensure the content can shrink below its intrinsic width
            }}
          >
            {/* Dashboard Section */}
            <Typography variant="h3" component="div">
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
            <Typography variant="h3" component="div" style={{ marginTop: '20px' }}>
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
            <Typography variant="h3" component="div" style={{ marginTop: '20px' }}>
              My Competitions
            </Typography>
            <Grid container spacing={2}>
              {cardData.map((card, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <CustomCard {...card} />
                </Grid>
              ))}
            </Grid>
            <JoinTeamCard />
          </div>
        </div>
      </div>
    );
};
export default Dashboard;


