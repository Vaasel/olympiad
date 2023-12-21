import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/Registration.css';
import React, { useEffect, useState } from "react";
import RegLayout from "../../Components/RegLayout";
import { Grid, Typography } from "@mui/material";
import { MaleOutlined, FemaleOutlined } from '@mui/icons-material';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import WcOutlinedIcon from '@mui/icons-material/WcOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CustomTextField from '../../Components/CustomTextField';
import CustomSelectField from '../../Components/CustomSelect';
// import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import '@fortawesome/fontawesome-free/css/all.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../../config';

const UserDetails = () => {
  const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoid2FxYXNhbGkwMDEyMysxMjMyQGdtYWlsLmNvbSIsImlhdCI6MTcwMzA3NzI4MCwiZXhwIjoxNzAzMjUwMDgwfQ.f5R3WitUx0Sqq6ucscyYPFQvqLvj_IJPI6DphzPEBd8";

  const navigate = useNavigate();
  const {id} = useParams();

  const [details, setDetails] = useState(null);
  const [cnicFront, setCnicFront] = useState("");
  const [cnicBack, setCnicBack] = useState("");
  const [stCardFront, setStCardFront] = useState("");
  const [stCardBack, setStCardBack] = useState("");

  const getSingleUser = async()=>{
    try {
      const { data } = await axios.get(`${API_URL}basic/basicSingleUser/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data && data.status === 200 && data.data) {
        const { basicInfo } = data.data;

        if (basicInfo) {
          setCnicFront(basicInfo.cnicFront || ""); // Update state with API values
          setCnicBack(basicInfo.cnicBack || "");
          setStCardFront(basicInfo.stdFront || "");
          setStCardBack(basicInfo.stdBack || "");
        }

        setDetails(data.data);

        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleUser();
  }, []); // Call the API only once when the component mounts


  return (
    <RegLayout>
      <Typography
        variant="h4"
        component="div"
        sx={{ fontWeight: "bold", fontFamily: "LemonMilkBold" }}
      >
        Participant Detail
      </Typography>

    {
      details === null ? 
      <h1>Loading...</h1> :
      <div className="container">
      <h2 className="text-left">Details</h2>
        <div className="row">
          <div className="col-md-4 mb-3">
            {/* <label className="bold-label" htmlFor="name"> Name </label> */}
          {/* <input type="text" style={{ backgroundImage: 'url("/Images/user.png")' }} className="form-control form-input" id="name" placeholder='John Carter' required /> */}
          <CustomTextField type="Person" iconType={<AccountCircleOutlinedIcon />} label="Name" value={details.name} />
          </div>
          <div className="col-md-4 mb-3">
            {/* <label className="bold-label" htmlFor="phone">Phone Number</label>
            <input type="tel" className="form-control form-input" id="phone" placeholder="(123) 456-7890" required /> */}
            <CustomTextField type="Phone" iconType={<PhoneAndroidOutlinedIcon />} label="Phone" value={details.basicInfo.phoneno} />
          </div>
          <div className="col-md-4 mb-3">
            {/* <label className="bold-label" htmlFor="cnic">CNIC</label>
            <input type="text" className="form-control form-input" id="cnic" placeholder="1234-567890-1" required /> */}
             <CustomTextField type="CNIC" iconType={<CreditCardOutlinedIcon />} label="CNIC" value={details.basicInfo.cnic} />
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
        <CustomTextField type="Gender" iconType={details.basicInfo.gender ? <MaleOutlined /> : <FemaleOutlined />} label="Gender" value={details.basicInfo.gender?"Male":"Female"} fullWidth/>
  </FormControl>
          </div>
          <div className="col-md-8 mb-3">
          
            <CustomTextField type="Address" iconType={<HomeOutlinedIcon />} label="Address" value={details.basicInfo.address} fullWidth/>
          </div>  
        </div>
        <div className="row">
          <div className="col-md-4 mb-3">
         
            <CustomTextField type="Person" iconType={<AccountCircleOutlinedIcon />} label="Guardian Name" value={details.basicInfo.guardianName} />
          </div> 
          <div className="col-md-4 mb-3">
             
            <CustomTextField type="Phone" iconType={<PhoneAndroidOutlinedIcon />} label="Guardian Contact No." value={details.basicInfo.guardianNumber} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 mb-3">
            
          <CustomTextField type="stId" iconType={<AccountCircleOutlinedIcon />} label="Student ID" value={details.basicInfo.student_id} />
          </div>
          <div className="col-md-4 mb-3">
            
            <CustomTextField type="campName" iconType={<HomeOutlinedIcon />} label="Campus Name" value={details.basicInfo.schoolName} />
          </div>
          <div className="col-md-4 mb-3">
            
             <CustomTextField type="ambassadorCode" iconType={<AccountCircleOutlinedIcon />} label="Ambassador Code" value={details.basicInfo.ambassadorcode} />
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
        </div>  
        </div>
        <div className="row pt-5">
          <div className="col">
            <a href="#"><button className="btn my-2 my-sm-0 btn-danger">Ban</button></a>
          </div>
          <div className="col text-end">
            <a href="#"><button className="btn my-2 my-sm-0 outlinedBtn">Reject</button></a>
            <a href="#"><button className="btn  my-2 my-sm-0 filledBtn" >Verify</button></a>
          </div>
        </div>
      {/* </form> */}
    </div>
    }
      

  </RegLayout>
  )
};
export default UserDetails;