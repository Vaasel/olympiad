import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Registration.css';
// import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import '@fortawesome/fontawesome-free/css/all.css';

const OlympiadRegistration = () => {
  

  return (
    <div className="m-5">
      <h2>Olympiad Registration</h2>
      <p>Please fill the form below to participate in Olympiad. Fill all the required fields</p>
      {/* <form onSubmit={handleSubmit}> */}
      <div className="row">
        <div className="mb-3">
          <label className="bold-label" htmlFor="name">Basic Info</label>
          <p className='right-align-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit used do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </div>
      
      <div className="row">
          <div className="col-md-4 mb-3">
            <label className="bold-label" htmlFor="name"> Name </label>
          <input type="text" style={{ backgroundImage: 'url("/Images/user.png")' }} className="form-control form-input" id="name" placeholder='John Carter' required />

          </div>
          <div className="col-md-4 mb-3">
            <label className="bold-label" htmlFor="phone">Phone Number</label>
            <input type="tel" className="form-control form-input" id="phone" placeholder="(123) 456-7890" required />
          </div>
          <div className="col-md-4 mb-3">
            <label className="bold-label" htmlFor="cnic">CNIC</label>
            <input type="text" className="form-control form-input" id="cnic" placeholder="1234-567890-1" required />
          </div>
        </div>
        <div className="row">
        <div className="col-md-4 mb-3">
            <label className="bold-label" htmlFor="guardian_name">Guardian Name</label>
            <input type="text" className="form-control form-input" id="guardian_name" placeholder="Carter Alpha" required />
          </div>
          <div className="col-md-4 mb-3">
            <label className="bold-label" htmlFor="guardian_phone">Guardian Number</label>
            <input type="tel" className="form-control form-input" id="guardian_phone" placeholder="(123) 456-7890" required />
          </div>  
        </div>
        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="bold-label" htmlFor="edu">School/College/University</label>
            <input type="tel" className="form-control form-input" id="edu" placeholder="NUST" required />
          </div> 
          <div className="col-md-4 mb-3">
            <label className="bold-label" htmlFor="address">Address</label>
            <input type="text" className="form-control full-width form-input" id="address" placeholder="H#1 street 23, block A, society F city" required />
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
          <div className="col-md-6 mb-3">
            <label className="bold-label" htmlFor="cnicFront">CNIC Front Copy</label>
            {/* <input type="file" className="form-control-file" id="cnicFront" onChange={handleFileChange} /> */}
          </div>
          <div class="upload-box">
          <div className="circular-container">
          <img src="/Images/upload.png" alt="Uploaded Image" class="uploaded-image" /> 
          </div>
          <label for="file-upload" class="upload-label">
            <span><span class="blue-text"><a href="">Click here</a></span> to upload</span>
            {/* <input id="file-upload" type="file"/> */}
          </label>
        </div>
          </div>
          <div className="col-md-6 mb-3">
          <div className="col-md-6 mb-3">
            <label className="bold-label" htmlFor="cnicBack">CNIC Back Copy</label>
            {/* <input type="file" className="form-control-file" id="cnicBack" onChange={handleFileChange} /> */}
          </div>
          <div class="upload-box">
          <div className="circular-container">
          <img src="/Images/upload.png" alt="Uploaded Image" class="uploaded-image" /> 
          </div>
          <label for="file-upload" class="upload-label">
            <span><span class="blue-text"><a href="">Click here</a></span> to upload</span>
            {/* <input id="file-upload" type="file"/> */}
          </label>
        </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary round-edge right-align">Next step</button>
      {/* </form> */}
    </div>
  );
};

export default OlympiadRegistration;