import React, { useState } from 'react';
import './Styles/SignUpPage.css'; // Import the CSS file
import CustomTextField from '../Components/CustomTextField';
import { TextField } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// api link
// vaasel-nust-olympiad.onrender.com/api/auth/login

const LoginPage = () => {

  // Handle hide password for first password field
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container" >
      {/* Left side */}
      <div className="left-side" >
        <div className="text-center">
          <h2 className="text-4xl font-semibold mb-4" >Login</h2>
          <form className="w-64">
            <div>
             <CustomTextField type="email" iconType={<EmailOutlinedIcon />} label="Email" />
              <TextField label={<span><LockOutlinedIcon style={{ marginRight: '8px' }} />Password</span>} variant="outlined" margin="normal" fullWidth type={showPassword ? 'text' : 'password'} required 
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
          <br></br>
          <p className="mt-4 text-sm" style={{fontWeight:'bold'}}>
            Don't have an account? <span className="text-blue-500"><Link className="links" href="#" target="_blank" rel="noopener noreferrer">Sign Up</Link></span>
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="right-side" style={{backgroundImage: 'url("https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/H5BOVymHiplawzr0/videoblocks-silhouette-of-people-rejoicing-and-lifting-up-his-hands-a-group-of-successful-businessmen-happy-and-celebrate-the-victory-on-the-roof-of-the-business-center-slow-motion_bseot2mclw_thumbnail-1080_01.png")'}}></div>
    </div>
  );
};

export default LoginPage;

