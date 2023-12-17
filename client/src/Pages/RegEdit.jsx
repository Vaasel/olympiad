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
import { useNavigate } from 'react-router-dom';

const RegEdit = () => {

    const navigate = useNavigate();

    const [cnicFront, setCnicFront] = useState("");
    const [cnicBack, setCnicBack] = useState("");
    const [stCardFront, setStCardFront] = useState("");
    const [stCardBack, setStCardBack] = useState("");

    const handleCNICfChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setCnicFront(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleCNICbChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setCnicBack(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleSTfChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setStCardFront(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleSTbfChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setStCardBack(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };

    const User = { 
        file_upload_cnicb:"https://templatearchive.com/wp-content/uploads/2018/05/Corporate-ID-1-e1526258858905.jpg",
        file_upload_cnicf:"https://templatearchive.com/wp-content/uploads/2018/05/Corporate-ID-1-e1526258858905.jpg",
        stcardFront:"https://templatearchive.com/wp-content/uploads/2018/05/Corporate-ID-1-e1526258858905.jpg",
        stcardBack:"https://templatearchive.com/wp-content/uploads/2018/05/Corporate-ID-1-e1526258858905.jpg"
    };

    const handleButtonClick = () => {
      navigate('/dashboard');
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
          
            <CustomTextField type="Address" iconType={<HomeOutlinedIcon />} label="Address" value="H12 NUST"fullWidth/>
          </div>  
        </div>
        <div className="row">
          <div className="col-md-4 mb-3">
         
            <CustomTextField type="Person" iconType={<AccountCircleOutlinedIcon />} label="Guardian Name" value="John" />
          </div> 
          <div className="col-md-4 mb-3">
             
            <CustomTextField type="Phone" iconType={<PhoneAndroidOutlinedIcon />} label="Guardian Contact No." value="034578996" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 mb-3">
            
          <CustomTextField type="stId" iconType={<AccountCircleOutlinedIcon />} label="Student ID" />
          </div>
          <div className="col-md-4 mb-3">
            
            <CustomTextField type="campName" iconType={<HomeOutlinedIcon />} label="Campus Name"/>
          </div>
          <div className="col-md-4 mb-3">
            
             <CustomTextField type="ambassadorCode" iconType={<AccountCircleOutlinedIcon />} label="Ambassador Code"/>
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-6 mb-3">
          <div className="col-md-6 mb-3">
            <label className="bold-label" htmlFor="cnicFront">CNIC Front Copy</label>
           
          </div>
          <div class="upload-box px-4"  style={{
              backgroundImage: `url(${cnicFront})`,
              backgroundSize: "cover",
            }}>
 
        </div>
        <label htmlFor="file-upload" className="upload-label pt-2 pb-2">
              <input
                id="file_upload_cnicf_Edit"
                type="file"
                accept="image/*"
                onChange={handleCNICfChange}
              />
            </label>
          </div>
          <div className="col-md-6 mb-3">
          <div className="col-md-6 mb-3">
            
            <label className="bold-label" htmlFor="cnicBack">CNIC Back Copy</label>
            
          </div>
          <div class="upload-box px-4"  style={{
              backgroundImage: `url(${cnicBack})`,
              backgroundSize: "cover",
            }}>

        </div>
        <label htmlFor="file-upload" className="upload-label pt-2 pb-2">
              <input
                id="file_upload_cnicb_Edit"
                type="file"
                accept="image/*"
                onChange={handleCNICbChange}
              />
            </label>
          </div>
        </div>
        <div className="row">
        <div className="col-md-6 mb-3">
          <div className="col-md-6 mb-3">
            <label className="bold-label" htmlFor="stcardFront">Student Card front side</label>
          </div>
          <div class="upload-box px-4"  style={{
              backgroundImage: `url(${stCardFront})`,
              backgroundSize: "cover",
            }}>

        </div>
        <label htmlFor="file-upload" className="upload-label pt-2 pb-2">
              <input
                id="file_upload_stCardf_Edit"
                type="file"
                accept="image/*"
                onChange={handleSTfChange}
              />
            </label>
          </div>
          <div className="col-md-6 mb-3">
          <div className="col-md-6 mb-3">
            <label className="bold-label" htmlFor="stcardBack">Student Card back side</label>
          </div>
          <div class="upload-box px-4"  style={{
              backgroundImage: `url(${stCardBack})`,
              backgroundSize: "cover",
            }}>
      
          </div>
          <label htmlFor="file-upload" className="upload-label pt-2 pb-2">
              <input
                id="file_upload_stCardb_Edit"
                type="file"
                accept="image/*"
                onChange={handleSTbfChange}
              />
            </label>
        </div>  
        </div>
        <button type="submit" className="btn btn-primary right-align " onClick={handleButtonClick}>Edit</button>
      {/* </form> */}
    </div>
  );
};

export default RegEdit;