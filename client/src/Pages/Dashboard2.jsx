
//test file


import React, { useState } from 'react';
import SideNav from '../Components/SideNav';
import TopNav from '../Components/TopNav';
import CustomCard from '../Components/CustomCard';
import { Grid } from '@mui/material';
import JoinTeamCard from '../Components/JoinTeamCard';

const Dashboard2 = () => {
  const [selectedHeader, setSelectedHeader] = useState('individual');

  const handleHeaderChange = (newHeader) => {
    setSelectedHeader(newHeader);
  };
  const individualParticipationData = [
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

  const teamParticipationData = [
    {
      title: 'Cricket',
      description: 'PKR 700/-',
      doneCount: 3,
      leftCount: 8,
    },
    {
      title: 'Cricket',
      description: 'PKR 700/-',
      doneCount: 3,
      leftCount: 8,
    },
    {
      title: 'Cricket',
      description: 'PKR 700/-',
      doneCount: 3,
      leftCount: 8,
    },
  ];
  const cardData = selectedHeader === 'individual' ? individualParticipationData : teamParticipationData;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* TopNav */}
      <TopNav
        logoImagePath="https:encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGZpzfGOb1d6ZbEiairsX09aVHH9gROHhbGw&usqp=CAU"
        profileImagePath="https:images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
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
            height: 'calc(100vh - 64px)',  
          }}
        >
          <SideNav />
        </div>

        {/* Content Container */}
        <div style={{ flex: '1', padding: '20px', backgroundColor: '#f5f5f5' }}>
         <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
       <div
       onClick={() => handleHeaderChange('individual')}
     style={{
       cursor: 'pointer',
       padding: '10px',
       backgroundColor: selectedHeader === 'individual' ? 'blue' : 'white',
       color: selectedHeader === 'individual' ? 'white' : 'blue',
       borderRadius: '15px',
       marginRight: '10px',
       marginBottom:'20px'
     }}
   >
     <h2 style={{ margin: '0' }}>Individual</h2>
   </div>
   <div
     onClick={() => handleHeaderChange('team')}
     style={{
       cursor: 'pointer',
       padding: '10px',
       backgroundColor: selectedHeader === 'team' ? 'blue' : 'white',
       color: selectedHeader === 'team' ? 'white' : 'blue',
       borderRadius: '15px',
       marginBottom:'20px'
     }}
   >
     <h2 style={{ margin: '0' }}>Team</h2>
   </div>
 </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <h2 style={{ margin: '0', color: '#2196F3' }}>
              {selectedHeader === 'individual' ? 'Individual Participation' : 'Team Participation'}
            </h2>
            <div style={{ borderBottom: '1px solid #ccc', marginLeft: '10px', flex: '1' }}></div>
          </div>

          {/* Render Cards */}
          {/* <JoinTeamCard />
          <Grid container spacing={2}>
            {cardData.map((card, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <CustomCard {...card} />
              </Grid>
            ))}
          </Grid> */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* Conditionally Render JoinTeamCard */}
          {selectedHeader === 'team' && <JoinTeamCard />}
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
    </div>
  );
};

export default Dashboard2;
