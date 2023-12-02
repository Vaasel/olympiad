
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


const SignUpPage = () => {

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
  return (
    <div className="container" >
      {/* Left side */}
      <div className="left-side" >
        <div className="text-center">
          <h2 className="text-4xl font-semibold mb-4" >Sign Up</h2>
          <form className="w-64">
            <div>
              
              <TextField InputProps={{
          style: { borderRadius: '50px' }
        }} label={<span><EmailOutlinedIcon style={{ marginRight: '8px' }} />Email</span>} variant="outlined" margin="normal" fullWidth required/>
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
              <TextField label={<span><LockOutlinedIcon style={{ marginRight: '8px' }} />Confirm Password</span>} variant="outlined" margin="normal" fullWidth type={showPasswordConfirm ? 'text' : 'password'} required 
              InputProps={{
                style: { borderRadius: '50px' },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordConfirmVisibility} edge="end">
                      {showPasswordConfirm ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}/>
              {
              /*<label htmlFor="email" className="block text-sm font-medium">Email</label> 
              <input
                type="email"
                id="email"
                className="mt-1 p-2 w-full border rounded-full focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium">Password</label>
              <input
                type="password"
                id="password"
                className="mt-1 p-2 w-full border rounded-full focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="mt-1 p-2 w-full border rounded-full focus:outline-none focus:ring focus:border-blue-300"
                required
              /> */}
            </div>
            <br></br>
            <div className="mb-4">
              <input type="checkbox" id="terms" className="mr-2" required style={{ display: "inline-block", transform: "scale(1.5)" }}/>
              <label htmlFor="terms" className="text-sm" style={{display:"inline-block"}}>  I agree to the <span><Link className="links" href="#" target="_blank" rel="noopener noreferrer" style={{fontWeight:"bold"}}>Terms and Conditions</Link></span> </label>
            </div>
            <br></br>
            <button
              type="submit"
              className="button"
              style={{transform: 'scale(1.25)', paddingLeft:'40px', paddingRight:'40px', paddingTop:'20px', paddingBottom:'20px'}}
            >
              Create Account
            </button>          
          </form>
          <br></br>
          <p className="mt-4 text-sm" style={{fontWeight:'bold'}}>
            Already registered? <span className="text-blue-500"><Link className="links" href="#" target="_blank" rel="noopener noreferrer">Sign In</Link></span>
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="right-side" style={{backgroundImage: 'url("https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/H5BOVymHiplawzr0/videoblocks-silhouette-of-people-rejoicing-and-lifting-up-his-hands-a-group-of-successful-businessmen-happy-and-celebrate-the-victory-on-the-roof-of-the-business-center-slow-motion_bseot2mclw_thumbnail-1080_01.png")'}}></div>
    </div>
  );
};

export default SignUpPage;

//https://th.bing.com/th/id/OIG.ey_KYrwhZnirAkSgDhmg
//   return (
//     <Container component="main" maxWidth="lg" className="signup-container">
//       <Grid container>
//         {/* Left Side: Sign Up Form */}
//         <Grid item xs={8}>
//           <Paper elevation={3} className="form-container">
//             <Typography variant="h4" component="div" gutterBottom>
//               Sign Up
//             </Typography>
//             <form>
//               <TextField label="Email" variant="outlined" margin="normal" fullWidth required />
//               <TextField label="Password" variant="outlined" margin="normal" fullWidth type="password" required />
//               <TextField label="Confirm Password" variant="outlined" margin="normal" fullWidth type="password" required />
//               <Button variant="contained" color="primary" fullWidth>
//                 Sign Up
//               </Button>
//             </form>
//             <Typography variant="body2" color="textSecondary" marginTop={2}>
//               Already registered? Sign in
//             </Typography>
//           </Paper>
//         </Grid>

//         {/* Right Side: Placeholder Image */}
//         <Grid item xs={3} className="image-container">
//           <Paper elevation={0} sx={{ backgroundImage: 'url(https://us.123rf.com/450wm/kamchatka/kamchatka1502/kamchatka150200367/36934631-happy-man-on-beach.jpg?ver=6)', backgroundSize: 'cover', height: '100vh' }} />
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default SignUpPage;
