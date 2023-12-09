import React, { useState } from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Registration.css';
import CustomTextField from '../Components/CustomTextField';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';

const StudentDetails = ({ }) => {

  return (
<div>
       <div className="row">
          <div className="col-md-4 mb-3">
          <CustomTextField type="Person"  iconType={<AccountCircleOutlinedIcon />} label="Name" value="John Doe" />
          </div>
          <div className="col-md-4 mb-3">
            <CustomTextField type="Campus" iconType={<SchoolOutlinedIcon />} label="Campus Name" />
          </div>
          <div className="col-md-4 mb-3">
             <CustomTextField type="Code" iconType={<AccountCircleOutlinedIcon/>} label="Ambassador Code" />
          </div>
        </div> 
      <div className="row">
          <div className="col-md-6 mb-3">
          <div className="col-md-6 mb-3">
            <label className="bold-label" htmlFor="stcardFront">Student Card front side</label>
          </div>
          <div class="upload-box px-4">
          <label htmlFor="file-upload" className="upload-label">
              <input id="stcardFront" type="file"/>
            </label> 
        </div>
          </div>
          <div className="col-md-6 mb-3">
          <div className="col-md-6 mb-3">
            <label className="bold-label" htmlFor="stcardBack">Student Card back side</label>
          </div>
          <div class="upload-box px-4">
          <label htmlFor="file-upload" className="upload-label">
              <input id="stcardBack" type="file"/>
            </label> 
        
          </div>
        </div>
</div>
</div>
  );
};

export default StudentDetails;
