import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Registration.css';
import React, { useState } from 'react';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import WcOutlinedIcon from '@mui/icons-material/WcOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CustomTextField from '../Components/CustomTextField';
import CustomSelectField from '../Components/CustomSelect';
// import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import '@fortawesome/fontawesome-free/css/all.css';

const OlympiadRegistration = () => {
  

  return (
    <div className="mt-5">
      <h2>Olympiad Registration</h2>
      <p>Please fill the form below to participate in Olympiad. Fill all the required fields</p>
      {/* <form onSubmit={handleSubmit}> */}
      <div className="row">
      <div className="mb-3">
            <label className="bold-label" htmlFor="name">Basic Info</label>
            <p className='right-align-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit used do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
      </div>

      <div className="row">
        <div className="col-md-3">
          <div className="upload-box-1">
            <div className="circular-container">
              <img src="/Images/upload.png" alt="Uploaded Image" className="uploaded-image" /> 
            </div>
            <label htmlFor="file-upload" className="upload-label">
              <span><span className="blue-text"><a href="#">Click here</a></span> to upload</span>
              <input id="file-upload" type="file"/>
            </label>
          </div>
        </div>
          <div className="col-md-5 upload-text">
              <h2>Upload picture</h2>
              <p>Upload your picture by clicking on the upload sign</p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 mb-3">
            {/* <label className="bold-label" htmlFor="name"> Name </label> */}
          {/* <input type="text" style={{ backgroundImage: 'url("/Images/user.png")' }} className="form-control form-input" id="name" placeholder='John Carter' required /> */}
          <CustomTextField type="Person" iconType={<AccountCircleOutlinedIcon />} label="Name" />
          </div>
          <div className="col-md-4 mb-3">
            {/* <label className="bold-label" htmlFor="phone">Phone Number</label>
            <input type="tel" className="form-control form-input" id="phone" placeholder="(123) 456-7890" required /> */}
            <CustomTextField type="Phone" iconType={<PhoneAndroidOutlinedIcon />} label="Phone" />
          </div>
          <div className="col-md-4 mb-3">
            {/* <label className="bold-label" htmlFor="cnic">CNIC</label>
            <input type="text" className="form-control form-input" id="cnic" placeholder="1234-567890-1" required /> */}
             <CustomTextField type="CNIC" iconType={<CreditCardOutlinedIcon />} label="CNIC" />
          </div>
        </div>
        <div className="row">
        <div className="col-md-4 mb-3">
        {/* <label className="bold-label" htmlFor="gender">Gender</label>
  <select id="gender" className="form-control form-input">
    <option value="male">Male</option>
    <option value="female">Female</option>
  </select>      */}
  <FormControl fullWidth variant="outlined"
      margin="normal" required style={{ marginTop: '15px'}}>
 <InputLabel id="demo-simple-select-label">Gender</InputLabel>
 <CustomSelectField  type="gender" iconType={<WcOutlinedIcon />} label="Gender" />
  </FormControl>
          </div>
          <div className="col-md-4 mb-3">
          {/* <label className="bold-label" htmlFor="address">Address</label>
            <input type="text" className="form-control full-width form-input" id="address" placeholder="H#1 street 23, block A, society F city" required /> */}
            <CustomTextField type="Address" iconType={<HomeOutlinedIcon />} label="Address" />
          </div>  
        </div>
        <div className="row">
          <div className="col-md-4 mb-3">
          {/* <label className="bold-label" htmlFor="guardian_name">Guardian Name</label>
            <input type="text" className="form-control form-input" id="guardian_name" placeholder="Carter Alpha" required /> */}
            <CustomTextField type="Person" iconType={<AccountCircleOutlinedIcon />} label="Guardian Name" />
          </div> 
          <div className="col-md-4 mb-3">
              {/* <label className="bold-label" htmlFor="guardian_phone">Guardian Number</label>
            <input type="tel" className="form-control form-input" id="guardian_phone" placeholder="(123) 456-7890" required /> */}
            <CustomTextField type="Phone" iconType={<PhoneAndroidOutlinedIcon />} label="Guardian Name" />
          </div>
        </div>
        {/* <div className="row">
          <div className="col-md-6 mb-3">
            <label className="bold-label" htmlFor="cnicFront">CNIC Front Copy</label>
          </div>
          <div className="col-md-6 mb-3">
            <label className="bold-label" htmlFor="cnicBack">CNIC Back Copy</label>
          </div>
        </div> */}
        <div className="row">
          <div className="col-md-6 mb-3">
          <div className="col-md-6 mb-3">
            <label className="bold-label" htmlFor="cnicFront">CNIC Front Copy</label>
            {/* <input type="file" className="form-control-file" id="cnicFront" onChange={handleFileChange} /> */}
          </div>
          <div class="upload-box">
          <div className="circular-container">
          <img src="/Images/upload.png" alt="Uploaded Image" class="uploaded-image" /> 
          </div>
          <label for="file-upload" class="upload-label">
            <span><span class="blue-text"><a href="">Click here</a></span> to upload</span>
            {/* <input id="file-upload" type="file"/> */}
          </label>
        </div>
          </div>
          <div className="col-md-6 mb-3">
          <div className="col-md-6 mb-3">
            <label className="bold-label" htmlFor="cnicBack">CNIC Back Copy</label>
            {/* <input type="file" className="form-control-file" id="cnicBack" onChange={handleFileChange} /> */}
          </div>
          <div class="upload-box">
          <div className="circular-container">
          <img src="/Images/upload.png" alt="Uploaded Image" class="uploaded-image" /> 
          </div>
          <label for="file-upload" class="upload-label">
            <span><span class="blue-text"><a href="">Click here</a></span> to upload</span>
            {/* <input id="file-upload" type="file"/> */}
          </label>
        </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary round-edge right-align">Next step</button>
      {/* </form> */}
    </div>
  );
};

export default OlympiadRegistration;