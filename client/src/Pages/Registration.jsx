import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/Registration.css";
import React, { useState } from "react";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import WcOutlinedIcon from "@mui/icons-material/WcOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CustomTextField from "../Components/CustomTextField";
import CustomSelectField from "../Components/CustomSelect";
// import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import "@fortawesome/fontawesome-free/css/all.css";
import { useNavigate } from "react-router-dom";
import olympiad from "../Images/logo/logo.png";

const OlympiadRegistration = () => {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState("");
  const [cnicFront, setCnicFront] = useState("");
  const [cnicBack, setCnicBack] = useState("");

  const handleButtonClick = () => {
    navigate("/details");
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCnicFrontChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCnicFront(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCnicBackChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCnicBack(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="container content-center">

        <img src={olympiad} alt="olympiad logo" />
        <h2>Olympiad Registration</h2>
        <p>
          Please fill the form below to participate in Olympiad. Fill all the
          required fields
        </p>


      <div className="row mb-5 centerRow">
          <div
            className="upload-box-1"
            style={{
              backgroundImage: `url(${profilePic})`,
              backgroundSize: "cover",
            }}
          >

          </div>
          <h4>Upload picture</h4>
          <p>Upload your picture by clicking on the upload sign</p>
          <label htmlFor="file-upload" className="upload-label">
            <input
              id="file_upload_pfp"
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
            />
          </label>
      </div>
      <div className="row">
        <div className="col-md-4 mb-3">
          <CustomTextField
            type="Person"
            iconType={<AccountCircleOutlinedIcon />}
            label="Name"
          />
        </div>
        <div className="col-md-4 mb-3">
          {/* <label className="bold-label" htmlFor="phone">Phone Number</label>
            <input type="tel" className="form-control form-input" id="phone" placeholder="(123) 456-7890" required /> */}
          <CustomTextField
            type="Phone"
            iconType={<PhoneAndroidOutlinedIcon />}
            label="Phone"
          />
        </div>
        <div className="col-md-4 mb-3">
          {/* <label className="bold-label" htmlFor="cnic">CNIC</label>
            <input type="text" className="form-control form-input" id="cnic" placeholder="1234-567890-1" required /> */}
          <CustomTextField
            type="CNIC"
            iconType={<CreditCardOutlinedIcon />}
            label="CNIC"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 mb-3">
          {/* <label className="bold-label" htmlFor="gender">Gender</label>
  <select id="gender" className="form-control form-input">
    <option value="male">Male</option>
    <option value="female">Female</option>
  </select>      */}
          <FormControl
            fullWidth
            variant="outlined"
            margin="normal"
            required
            style={{ marginTop: "15px" }}
          >
            <InputLabel id="demo-simple-select-label">
              <WcOutlinedIcon style={{ marginRight: "8px" }} />
              Gender
            </InputLabel>
            <CustomSelectField />
          </FormControl>
        </div>
        <div className="col-md-8 mb-3">
          {/* <label className="bold-label" htmlFor="address">Address</label>
            <input type="text" className="form-control full-width form-input" id="address" placeholder="H#1 street 23, block A, society F city" required /> */}
          <CustomTextField
            type="Address"
            iconType={<HomeOutlinedIcon />}
            label="Address"
            fullWidth
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 mb-3">
          {/* <label className="bold-label" htmlFor="guardian_name">Guardian Name</label>
            <input type="text" className="form-control form-input" id="guardian_name" placeholder="Carter Alpha" required /> */}
          <CustomTextField
            type="Person"
            iconType={<AccountCircleOutlinedIcon />}
            label="Guardian Name"
          />
        </div>
        <div className="col-md-4 mb-3">
          {/* <label className="bold-label" htmlFor="guardian_phone">Guardian Number</label>
            <input type="tel" className="form-control form-input" id="guardian_phone" placeholder="(123) 456-7890" required /> */}
          <CustomTextField
            type="Phone"
            iconType={<PhoneAndroidOutlinedIcon />}
            label="Guardian Contact No."
          />
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
          {/* <div> */}
            <label className="bold-label" htmlFor="cnicFront">CNIC Front Copy
            </label>
            {/* <input type="file" className="form-control-file" id="cnicFront" onChange={handleFileChange} /> */}
          {/* </div> */}
          <div
            class="upload-box "
            style={{
              backgroundImage: `url(${cnicFront})`,
              backgroundSize: "cover",
            }}
          ></div>
          <div className="col-md-6 mb-3">
            <br />
            <label htmlFor="file-upload" className="upload-label">
              <input
                id="file_upload_cnicf"
                type="file"
                accept="image/*"
                onChange={handleCnicFrontChange}
              />
            </label>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="col-md-6 mb-3">
            <label className="bold-label" htmlFor="cnicBack">
              CNIC Back Copy
            </label>
            {/* <input type="file" className="form-control-file" id="cnicBack" onChange={handleFileChange} /> */}
          </div>
          <div
            class="upload-box"
            style={{
              backgroundImage: `url(${cnicBack})`,
              backgroundSize: "cover",
            }}
          ></div>
          <div className="col-md-6 mb-3">
            <br />
            <label htmlFor="file-upload" className="upload-label">
              <input
                id="file_upload_cnicb"
                type="file"
                accept="image/*"
                onChange={handleCnicBackChange}
              />
            </label>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-primary right-align"
        onClick={handleButtonClick}
      >
        Next step
      </button>
      {/* </form> */}
    </div>
  );
};

export default OlympiadRegistration;
