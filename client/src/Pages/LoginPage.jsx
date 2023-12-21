import React, { useState } from 'react';
import '../Styles/SignUpPage.css'; // Import the CSS file
import CustomTextField from '../Components/CustomTextField';
import { TextField } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


import Nav from '../Components/Navigation';

import API_URL from '../config';


// api link
// vaasel-nust-olympiad.onrender.com/api/auth/login

const apiUrl = API_URL;

const initialState = { 
   email: "",
    password:"" };


    
const LoginPage = () => {


  const navigate = useNavigate()

  const [data, setData]= useState(initialState);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleButtonClick = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(`${API_URL}/auth/login`, data);
      const accessToken = response.data.accessToken;
      const UserID = response.data.user.id;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('UserID', UserID);
      console.log('Access token set in localStorage:', accessToken);
      console.log('UserID set in localStorage:', UserID);

      try{
        const response = await axios.get(`${API_URL}/auth/auth`,
        {
          headers: {
          Authorization: `Bearer ${localStorage.accessToken}`,
        }

      })
      console.log(response);
      if (response.data.data.isValidated === false){
        navigate('/verifycode')
      }
      else{
        if (response.data.isParticipant === true){
          navigate('/dashboard');
        }
        else{
          // redirect to reg portal
        }
      }
      }catch(error){
        console.log(error);
      }
  } catch (error) {
      alert('Invalid credentials! Please try again.');
  }
    
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
    <Nav />
    <div className="Mycontainer" >
      {/* Left side */}
      <div className="left-side" >
        <div className="text-center">
          <h2 className="text-4xl font-semibold mb-4" style={{textAlign:'center'}} >Login</h2>
          <form className="w-64" onSubmit={handleButtonClick}>
            <div>
            <CustomTextField type="email" name="email" iconType={<EmailOutlinedIcon />} onChange={handleInputChange} label="Email" />
              <TextField label={<span><LockOutlinedIcon style={{ marginRight: '8px' }} />Password</span>} variant="outlined" margin="normal" fullWidth type={showPassword ? 'text' : 'password'} required 
              onChange={handleInputChange}
              name ="password"
              InputProps={{
                style: { borderRadius: '50px' },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}/>
            </div>
            <br></br>
            <button
              type="submit"
              className="button"
              style={{transform: 'scale(1.25)', paddingLeft:'40px', paddingRight:'40px', paddingTop:'20px', paddingBottom:'20px'}}
            >
              Login
            </button>          
          </form>
         
          <p className="mt-4 text-sm" style={{fontWeight:'bold', textAlign : 'center'}}>
            Don't have an account? <span className="text-blue-500"><Link className="links" href="/signup" rel="noopener noreferrer">Sign Up</Link></span>
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="right-side" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1628779238951-be2c9f2a59f4?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")'}}></div>
    </div>
    </>
  );
};

export default LoginPage;

