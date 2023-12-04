import React from 'react';
import { Grid, Typography } from '@mui/material';
import CustomCard from '../Components/CustomCard';
import StatusCard from '../Components/StatusCards';



// import { TopNav } from '../Components/TopNav';

const LandingPage = () => {

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
      <div>
      {/* <TopNav /> */}
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
    //   <div>
    //     {/* <TopNav /> */}
    //     <Typography variant="h3" component="div">
    //       Dashboard
    //     </Typography>  
    //     <Grid container spacing={2}>
    //     {statusCardData.map((card, index) => (
    //         <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
    //           <StatusCard {...card} />
    //           <Typography variant="h3" component="div">
    //       My Sports
    //     </Typography>  
    //       {cardData.map((card, index) => (
    //         <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
    //           <CustomCard {...card} />
    //           <Typography variant="h3" component="div">
    //       My Competitions
    //     </Typography>  
    //       {cardData.map((card, index) => (
    //         <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
    //           <CustomCard {...card} />
    //         </Grid>
    //       ))}
    //     </Grid>
    // </div>    
    
    );
  };
  

export default LandingPage;
