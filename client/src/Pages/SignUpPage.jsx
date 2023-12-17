
import React, { useState } from 'react';
import '../Styles/SignUpPage.css'; // Import the CSS file
import { TextField } from '@mui/material';
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

// api link
// vaasel-nust-olympiad.onrender.com/api/auth/register


const SignUpPage = () => {

  const navigate = useNavigate();
  // Handle hide password for first password field
  const [showPassword, setShowPassword] = useState(false);

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

  const handleButtonClick = () => {
    navigate('/registration');
  };

  return (
    <div className="Mycontainer" >
      {/* Left side */}
      <div className="left-side" >
        <div className="text-center">
          <h2 className="text-4xl font-semibold mb-4" style={{textAlign:'center'}}>Sign Up</h2>
          <form className="w-64">
            <div>
            <CustomTextField type="text" iconType={<PersonOutlineOutlinedIcon />} label="Name" />  
            <CustomTextField type="email" iconType={<EmailOutlinedIcon />} label="Email" />
            <TextField
                label={
                  <span style={{ ...labelStyles }}>
                    <LockOutlinedIcon style={{ marginRight: '8px',marginTop:'2px', ...lockIconStyles }} />
                    Password
                  </span>
                }
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
              onClick={handleButtonClick}
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
      <div className="right-side" style={{backgroundImage: 'url("https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/H5BOVymHiplawzr0/videoblocks-silhouette-of-people-rejoicing-and-lifting-up-his-hands-a-group-of-successful-businessmen-happy-and-celebrate-the-victory-on-the-roof-of-the-business-center-slow-motion_bseot2mclw_thumbnail-1080_01.png")'}}></div>
    </div>
  );
};

export default SignUpPage;