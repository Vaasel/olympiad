import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Payments.css';
import '../Styles/Registration.css';
import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';
import React, { useState } from 'react';

const Payments = ({ }) => {
  const [registrationFee, setRegistrationFee] = useState(1000);
  const tennisFee = 1000;
  const futsalFee = 1000;
  const footballFeePerPerson = 250;
  const numberOfFootballPlayers = 4;

  // Calculate total cost
  const totalCost =
    registrationFee + tennisFee + futsalFee + footballFeePerPerson * numberOfFootballPlayers;
  
return(
<div className="container my-5">
      <div className="row">
        <div className="col-md-6">
          <h2>Payment</h2>
          <hr/>
          <div className="mb-3">
            <h6>Pay Online</h6>
            <p>Transfer total Rs {totalCost} to</p>
            <hr/>
            <h6>HBL Bank</h6>
            <p>IBAN: PK34 HABB 02297901278603</p>
            <p>Title of Acct: Nust Olympiad</p>
            <p>HBL Nust Branch H-12, Islamabad</p>
          </div>
          <hr/>
          <div className="mb-3">
            <h6 >Attach the Proof of Payment</h6>
          </div>
          <div class="upload-box px-4">
          <label htmlFor="file-upload" className="upload-label">
              <input id="file-upload-payment" type="file"/>
            </label> 
          </div>
          <button className="btn btn-primary round-edge left-align">I have paid the challan</button>
          <p className="text-muted mt-3">Privacy policy something about not refundable</p>
        </div>
        <div className="col-md-6 ps-5">
          <h2>Summary/Details</h2>
          <hr/>
          <div className="d-flex justify-content-between w-100">
            <h6>Registration Fee</h6>
            <p>Rs {registrationFee}</p>
            </div>
            <h6>Individual</h6>
            <div className="d-flex justify-content-between w-100">
            <p className='ps-2'>Tennis</p>
            <p>Rs {tennisFee}</p>
            </div>
            <div className="d-flex justify-content-between w-100">
            <p className='ps-2'>Futsal</p>
            <p>Rs {futsalFee}</p>
            </div>
            <h6>Team</h6>
            <div className="d-flex justify-content-between w-100">
            <p className='ps-2'>Football<span><p><b>(Rs {footballFeePerPerson} per person)</b></p></span></p>
            <p>Rs {footballFeePerPerson*numberOfFootballPlayers}</p>
          </div>
          <hr/>
          <div className="d-flex justify-content-between">
            <h3>Total</h3>
            <h3>Rs {totalCost}</h3>
          </div>
          <button className="btn btn-link left-align"> <DownloadForOfflineOutlinedIcon /> Download receipt</button>
        </div>
      </div>
    </div>
)
};

export default Payments;