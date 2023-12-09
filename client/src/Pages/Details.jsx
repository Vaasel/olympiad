import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Registration.css';
import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CustomRadioField from '../Components/CustomRadio';
import CustomTextField from '../Components/CustomTextField';
import StudentDetails from '../Components/StudentDetails';


const Details = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [showComponent, setShowComponent] = useState(false);
  
    const handleRadioChange = (event) => {
      const selected = event.target.value;
      setSelectedValue(selected);
      setIsButtonDisabled(selected !== 'other');
      setShowComponent(selected !== 'other');
    };
  
    const handleButtonClick = () => {
      // Handle the click event for the button
      // This function will execute when the button is clicked
    };

  return (
    <div className="container mt-5">
      <h2>Olympiad Registration</h2>
      <p>Please fill the form below to participate in Olympiad. Fill all the required fields</p>
      {/* <form onSubmit={handleSubmit}> */}
      <div className="row">
      <div className="col-md-4 mb-3 right-align-text">
            <h3>Details</h3>
            <p>Fill the form given below.</p>
          </div>
      </div>
      <div className="row">
        <div className="col-md-4 mb-3 right-align-text">
        <CustomRadioField type="University"  label="You are a Student of?" handleChange={handleRadioChange} />
        </div>
        </div>
        {showComponent && (
        <div>
        <StudentDetails/>
        </div>
      )}
       <button 
        onClick={handleButtonClick}
        disabled={isButtonDisabled}
        variant="contained"
        color="primary"
        type="submit"
        className="btn btn-primary round-edge right-align">Next step</button>
    </div>
  );
};

export default Details;