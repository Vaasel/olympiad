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

const RegEdit = () => {
  
    const User = { 
        file_upload_cnicb:"https://templatearchive.com/wp-content/uploads/2018/05/Corporate-ID-1-e1526258858905.jpg",
        file_upload_cnicf:"https://templatearchive.com/wp-content/uploads/2018/05/Corporate-ID-1-e1526258858905.jpg",
        stcardFront:"https://templatearchive.com/wp-content/uploads/2018/05/Corporate-ID-1-e1526258858905.jpg",
        stcardBack:"https://templatearchive.com/wp-content/uploads/2018/05/Corporate-ID-1-e1526258858905.jpg"
    };
  return (
    <div className="container mt-5">
      <h2 className="text-left">Profile</h2>
        <div className="row">
          <div className="col-md-4 mb-3">
            {/* <label className="bold-label" htmlFor="name"> Name </label> */}
          {/* <input type="text" style={{ backgroundImage: 'url("/Images/user.png")' }} className="form-control form-input" id="name" placeholder='John Carter' required /> */}
          <CustomTextField type="Person" iconType={<AccountCircleOutlinedIcon />} label="Name" />
          </div>
          <div className="col-md-4 mb-3">
            {/* <label className="bold-label" htmlFor="phone">Phone Number</label>
            <input type="tel" className="form-control form-input" id="phone" placeholder="(123) 456-7890" required /> */}
            <CustomTextField type="Phone" iconType={<PhoneAndroidOutlinedIcon />} label="Phone" value="03345677980"/>
          </div>
          <div className="col-md-4 mb-3">
            {/* <label className="bold-label" htmlFor="cnic">CNIC</label>
            <input type="text" className="form-control form-input" id="cnic" placeholder="1234-567890-1" required /> */}
             <CustomTextField type="CNIC" iconType={<CreditCardOutlinedIcon />} label="CNIC" value="345789966532"/>
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
        <InputLabel id="demo-simple-select-label"><WcOutlinedIcon style={{ marginRight: '8px' }}/>Gender</InputLabel>
        <CustomSelectField value="male"/>
  </FormControl>
          </div>
          <div className="col-md-8 mb-3">
          {/* <label className="bold-label" htmlFor="address">Address</label>
            <input type="text" className="form-control full-width form-input" id="address" placeholder="H#1 street 23, block A, society F city" required /> */}
            <CustomTextField type="Address" iconType={<HomeOutlinedIcon />} label="Address" value="H12 NUST"fullWidth/>
          </div>  
        </div>
        <div className="row">
          <div className="col-md-4 mb-3">
          {/* <label className="bold-label" htmlFor="guardian_name">Guardian Name</label>
            <input type="text" className="form-control form-input" id="guardian_name" placeholder="Carter Alpha" required /> */}
            <CustomTextField type="Person" iconType={<AccountCircleOutlinedIcon />} label="Guardian Name" value="John" />
          </div> 
          <div className="col-md-4 mb-3">
              {/* <label className="bold-label" htmlFor="guardian_phone">Guardian Number</label>
            <input type="tel" className="form-control form-input" id="guardian_phone" placeholder="(123) 456-7890" required /> */}
            <CustomTextField type="Phone" iconType={<PhoneAndroidOutlinedIcon />} label="Guardian Contact No." value="034578996" />
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
          <div class="upload-box px-4" style={{ backgroundImage: `url(${User.file_upload_cnicf})`, backgroundSize: 'cover'}}>
 
        </div>
          </div>
          <div className="col-md-6 mb-3">
          <div className="col-md-6 mb-3">
            
            <label className="bold-label" htmlFor="cnicBack">CNIC Back Copy</label>
            {/* <input type="file" className="form-control-file" id="cnicBack" onChange={handleFileChange} /> */}
          </div>
          <div class="upload-box px-4" style={{ backgroundImage: `url(${User.file_upload_cnicb})`, backgroundSize: 'cover'}}>

        </div>
          </div>
        </div>
        <div className="row">
        <div className="col-md-6 mb-3">
          <div className="col-md-6 mb-3">
            <label className="bold-label" htmlFor="stcardFront">Student Card front side</label>
          </div>
          <div class="upload-box px-4" style={{ backgroundImage: `url(${User.stcardFront})`, backgroundSize: 'cover'}}>

        </div>
          </div>
          <div className="col-md-6 mb-3">
          <div className="col-md-6 mb-3">
            <label className="bold-label" htmlFor="stcardBack">Student Card back side</label>
          </div>
          <div class="upload-box px-4" style={{ backgroundImage: `url(${User.stcardBack})`,backgroundSize: 'cover' }}>
      
          </div>
        </div>  
        </div>
        <button type="submit" className="btn btn-primary right-align ">Edit</button>
      {/* </form> */}
    </div>
  );
};

export default RegEdit;