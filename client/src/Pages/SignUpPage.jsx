import React, { useState } from 'react';
import '../Styles/SignUpPage.css'; // Import the CSS file
import { TextField, Typography } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CustomTextField from '../Components/CustomTextField';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from '../Components/Navigation';

import API_URL from '../config';


// api link
// vaasel-nust-olympiad.onrender.com/api/auth/register

const apiUrl = API_URL;
const initialState = { name: "" , email: "", password:"" }




const SignUpPage = () => {

  const [ data, setData ] = useState(initialState);
  const [ wrongPassword, setWrongPassword ] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const navigate = useNavigate();
  // Handle hide password for first password field
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordConfirmChange = (e) => {
    const value = e.target.value;
    setPasswordConfirm(value);
    setPasswordMatchError(value !== data.password);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle hide password for first password confirm field
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleTogglePasswordConfirmVisibility = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const labelStyles = { position: 'relative', top: '-2px', left: '2px' };
  const lockIconStyles = { position: 'relative', top: '5x', left: '2px' };
  const visibilityIconStyles = { position: 'relative', right: '10px' };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleButtonClick = async (e) => {
    try {
      if (data.password !== passwordConfirm) {
        setPasswordMatchError(true);}
      // console.log(data);
      e.preventDefault();
      const response = await axios.post(`${API_URL}/auth/register`, data);
      // console.log(response.data);
      console.log(response);
  
        const accessToken = response.data.data.accessToken;
        localStorage.setItem('accessToken', accessToken);
        console.log('Access token set in localStorage:', accessToken);
      // console.log(response.data.accessToken)
      navigate('/verifycode');
  } catch (error) {
    if (error.response.data.data === null){
      alert(error.response.data.message)
    }else{
      setWrongPassword(true);
      alert(error.response.data.data)
      // console.error('Error:', error.response.data.data);
  }}
    
  };

  // const handleButtonClick = () => {
  //   navigate('/registration');
  // };

  return (
    <>
    <Nav />
    <div className="Mycontainer" >
      {/* Left side */}
      <div className="left-side" >
        <div className="text-center">
          <h2 className="text-4xl font-semibold mb-4" style={{textAlign:'center'}}>Sign Up</h2>
          <form className="w-64" onSubmit={handleButtonClick}>
            <div>
            <CustomTextField type="text" name="name" iconType={<PersonOutlineOutlinedIcon />} onChange={handleInputChange} label="Name" />  
            <CustomTextField type="email" name="email" iconType={<EmailOutlinedIcon />} onChange={handleInputChange} label="Email" />
            <TextField
                label={
                  <span style={{ ...labelStyles }}>
                    <LockOutlinedIcon style={{ marginRight: '8px',marginTop:'2px', ...lockIconStyles }} />
                    Password
                  </span>
                }
                onChange={handleInputChange}
                name="password"
                variant="outlined"
                margin="normal"
                fullWidth
                type={showPassword ? 'text' : 'password'}
                required
                InputProps={{
                  style: { borderRadius: '50px' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                        {showPassword ? (
                          <VisibilityIcon style={{ ...visibilityIconStyles }} />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label={
                  <span style={{ ...labelStyles }}>
                    <LockOutlinedIcon style={{ marginRight: '8px',marginTop:'2px', ...lockIconStyles }} />
                    Confirm Password
                  </span>
                }
                variant="outlined"
                margin="normal"
                fullWidth
                type={showPasswordConfirm  ? 'text' : 'password'}
                required
                error={passwordMatchError}
                helperText={passwordMatchError ? 'Passwords do not match' : ''}
                onChange={handlePasswordConfirmChange}
                InputProps={{
                  style: { borderRadius: '50px' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePasswordConfirmVisibility} edge="end">
                        {showPasswordConfirm  ? (
                          <VisibilityIcon style={{ ...visibilityIconStyles }} />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {wrongPassword && (
                <>
                <Typography className='text-left text-muted'>Password must have at least 1 uppercase letter.</Typography>
                <Typography className='text-muted text-left'>Password must have at least 3 numbers.</Typography>
                <Typography className='text-muted text-left'>Password must have at least 1 special character.</Typography>
                </>
              )
              }
            </div>
            <br></br>
            {/* <div className="mb-4">
              <input type="checkbox" id="terms" className="mr-2" required style={{ display: "inline-block", transform: "scale(1.5)" }}/>
              <label htmlFor="terms" className="text-sm" style={{display:"inline-block"}}>  I agree to the <span><Link className="links" href="#" rel="noopener noreferrer" style={{fontWeight:"bold"}}>Terms and Conditions</Link></span> </label>
            </div>
            <br></br> */}

            <button
              type="submit"
              className="button"
              // onClick={handleButtonClick}
              style={{transform: 'scale(1.25)', paddingLeft:'40px', paddingRight:'40px', paddingTop:'20px', paddingBottom:'20px'}}
            >
              Create Account
            </button>          
          </form>
          
          <p className="mt-4 text-sm" style={{fontWeight:'bold', textAlign:'center'}}>
            Already registered? <span className="Tcolor"><Link className="links" href="/login" rel="noopener noreferrer">Sign In</Link></span>
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="right-side" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")'}}></div>
    </div>
    </>
  );
};

export default SignUpPage;