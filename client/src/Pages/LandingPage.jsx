import React from 'react';
import { Grid, Typography } from '@mui/material';
import Description from "../Pages/Description"
import CricketDescription from "../Pages/Description"
import '../Styles/Registration.css';
const LandingPage = () => {
    const sportsDescData = { 
        title: "Badminton",
        cost:"1000",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      };
      const sportsTennisData = { 
        title: "Tennis",
        cost:"1000",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      };
      const cricketDescData = {
        title: "Cricket",
        price:"250",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        teamMembers: [
          {
            name: "John Doe",
            role: "Captain",
            profilePicture: "https://xsgames.co/randomusers/avatar.php?g=male",
          },
          {
            name: "Alice Smith",
            role: "Player",
            profilePicture: "https://xsgames.co/randomusers/avatar.php?g=female",
          },
          {
            name: "John Doey",
            role: "Captain",
            profilePicture: "https://xsgames.co/randomusers/avatar.php?g=male",
          },
          {
            name: "Alicey Smith",
            role: "Player",
            profilePicture: "https://xsgames.co/randomusers/avatar.php?g=female",
          },
        ],
      };
    return (
//         <Description
//         title={sportsDescData.title}
//         description={sportsDescData.description}
//       />
    <CricketDescription data={cricketDescData} /> 
    );
  };
  

export default LandingPage;