import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/VerificationCode.css";
import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import olympiad from '../Images/logo/logo.png';
import axios from 'axios';
import API_URL from "../config";
import { useNavigate } from "react-router-dom";

const VerificationCode = () => {

    const [otp, setOtp] = useState('');

    const navigate = useNavigate();
 
    const handleVerify = async () => {
      try {
        const response = await axios.post(`${API_URL}/auth/verifyEmail`, { code:otp },
        {
          headers: {
          Authorization: `Bearer ${localStorage.accessToken}`,
        }
      });
        // Handle successful verification
        console.log('Verification successful', response.data.data);
        navigate('/dashboard');
        
      } catch (error) {
        // Handle errors
        alert(error.response.data.data);
      }
    };

    return(
        <>
    <div className="code">
        <div className="Mycard">
        <img src={olympiad} alt="olympiad logo" width={200} className="mx-auto"/>
      <h2>Verification</h2>
      <p>Enter Code send to you on your email</p>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderSeparator={<span> </span>}
        inputType="tel"
        containerStyle={{ display: 'unset' }}
        inputStyle={{ width: "3rem", height: "3.5rem" }}
        renderInput={(props) => <input {...props} className='otp-input' />}
      />
      <div className='btn-container mb-4'>
        <button onClick={handleVerify}>Verify Code</button>
      </div>
      </div>
    </div>
        </>
    );
}

export default VerificationCode;