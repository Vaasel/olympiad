import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/Payments.css";
import "../Styles/Registration.css";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import SideNav from "../Components/SideNav";
import TopNav from "../Components/TopNav";

const Payments = ({}) => {
  const navigate = useNavigate();
  const [registrationFee, setRegistrationFee] = useState(1000);
  const [paymentPic, setPaymentPic] = useState("");
  const tennisFee = 1000;
  const futsalFee = 1000;
  const footballFeePerPerson = 250;
  const numberOfFootballPlayers = 4;

  const handlePaymentPic = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPaymentPic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Calculate total cost
  const totalCost =
    registrationFee +
    tennisFee +
    futsalFee +
    footballFeePerPerson * numberOfFootballPlayers;

  const handleButtonClick = () => {
    navigate("/dashboard");
  };

  return (
    <div>
      <TopNav
        profileImagePath="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        userName="John Doe"
      />
      <div className="container my-5">
        <div className="row">
          <div className="col-md-2">
            {/* SideNav component goes here */}
            <SideNav></SideNav>
          </div>
          <div className="col-md-10">
            <div className="row">
              <div className="col-md-6">
                {/* Payment section */}
                <h2>Payment</h2>
                <hr />
                <div className="mb-3">
                  <h6>Pay Online</h6>
                  <p>Transfer total <b>Rs {totalCost}</b> to</p>
                  <hr />
                  <h6>HBL Bank</h6>
                  <p>IBAN: PK34 HABB 02297901278603</p>
                  <p>Title of Acct: Nust Olympiad</p>
                  <p>HBL Nust Branch H-12, Islamabad</p>
                </div>
                <hr />
                <div className="mb-3">
                  <h6>Attach the Proof of Payment</h6>
                </div>
                <div class="upload-box px-4"
                  style={{
                    backgroundImage: `url(${paymentPic})`,
                    backgroundSize: "cover",
                  }}
                >
                  <label htmlFor="file-upload" className="upload-label">
                    <input
                      id="file-upload-payment"
                      type="file"
                      accept="image/*"
                      onChange={handlePaymentPic}
                    />
                  </label>
                </div>
                <button
                  className="btn btnColor mt-3 left-align"
                  onClick={handleButtonClick}
                >
                  I have paid the Challan
                </button>
                <p className="mt-3">* Registration fees is not refundable</p>
              </div>
              <div className="col-md-6">
                {/* Summary/Details section */}
                <div className="ps-5">
                  <h2>Summary/Details</h2>
                  <hr />
                  <div className="row mb-3 regFee">
                  <div className="col">
                    <h6 className="regFee">Registration Fee</h6>
                  </div>
                  <div className="col endAlign">
                    <p>Rs {registrationFee}</p>
                  </div>
                  </div>
                  <h6 className="text-muted head">Individual</h6>
                  <div className="row mb-3">
                  <div className="col">
                    <p className="ps-2"><b>Tennis</b></p>
                  </div>
                  <div className="col endAlign">
                    <p>Rs {tennisFee}</p>
                  </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col">
                      <p className="ps-2"><b>Futsal</b></p>
                    </div>
                    <div className="col endAlign">
                      <p>Rs {futsalFee}</p>
                    </div>
                  </div>
                  <h6 className="text-muted head">Team</h6>
                  <div className="row mb-3">
                    <div className="col">
                      <p className="ps-2">
                      <b>Football</b>
                        <span>
                          <p>
                            (Rs {footballFeePerPerson} per person)
                          </p>
                        </span>
                      </p>
                    </div>
                    <div className="col endAlign">
                      <p>Rs {footballFeePerPerson * numberOfFootballPlayers}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between mb-3">
                    <h3>Total</h3>
                    <h3>Rs <b>{totalCost}</b></h3>
                  </div>
                  <button className="btn btn-link left-align">
                    <DownloadForOfflineOutlinedIcon /> Download receipt
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
