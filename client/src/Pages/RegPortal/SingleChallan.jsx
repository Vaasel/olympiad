import React, { useEffect, useState } from "react";
import RegLayout from "../../Components/RegLayout";
import { Grid, Typography } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Styles/Payments.css";
import "../../Styles/Registration.css";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import API_URL from "../../config";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ChallanDetails = () => {
  const [details, setDetails] = useState(null);
  const { id } = useParams();
  const [regObj, setRegObj] = useState(null);
  const [teams, setTeams] = useState([]);
  const [individuals, setIndividuals] = useState([]);
  const [show, setShow] = useState(false);
  const [reason, setReason] = useState("");
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [action, setAction] = useState(null);

  // Function to handle the action click
  const handleAction = (actionType) => {
    setAction(actionType);
  };


  if (parseInt(id) === 1) {
    navigate("/challans");
  }
  
  const setStatus = async()=>{
    try {
      const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoid2FxYXNhbGkwMDEyMysxMjMyQGdtYWlsLmNvbSIsImlhdCI6MTcwMzA3NzI4MCwiZXhwIjoxNzAzMjUwMDgwfQ.f5R3WitUx0Sqq6ucscyYPFQvqLvj_IJPI6DphzPEBd8";
  
      const {data} = await axios.post(`${API_URL}challan/setStatusChallan`,{
        userId : parseInt(details.user.id),
        reason,
        isPaid : action,
        id : parseInt(id)
      },{
        headers : {
          Authorization: `Bearer ${token}`
        }
      })

      if (data.status === 200) {
        return  navigate('/challans');
      }

    } catch (error) {
      console.log(error);
    }
  }


  const getChallanDetails = async () => {
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoid2FxYXNhbGkwMDEyMysxMjMyQGdtYWlsLmNvbSIsImlhdCI6MTcwMzA3NzI4MCwiZXhwIjoxNzAzMjUwMDgwfQ.f5R3WitUx0Sqq6ucscyYPFQvqLvj_IJPI6DphzPEBd8";

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Assuming 'id' is defined elsewhere in your code
      const { data } = await axios.get(
        `${API_URL}challan/getChallan/${id}`,
        config
      );

      if (data.status != 200) {
        alert(data.message);
        return;
      }

      const teamsArray = data.data.detail.filter(
        (obj) => obj.isIndividual === false && obj.id !== 0
      );
      const individualsArray = data.data.detail.filter(
        (obj) => obj.isIndividual === true && obj.id !== 0
      );
      const regObject = data.data.detail.find((obj) => obj.id === 0);

      console.log(teamsArray);
      console.log(individualsArray);
      console.log(regObject);

      setTeams(teamsArray);
      setIndividuals(individualsArray);
      if (regObject) {
        setRegObj(regObject);
      }

      setDetails(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [showPreview, setShowPreview] = useState(false);

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  useEffect(() => {
    getChallanDetails();
  }, []);

  return (
    <RegLayout>
      {details == null ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Typography
            variant="h4"
            component="div"
            sx={{ fontWeight: "bold", fontFamily: "LemonMilkBold" }}
          >
            Challan Detail
          </Typography>
          <div className="container">
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "normal", fontFamily: "LemonMilkBold" }}
            >
              UserName: {details.user.name}
            </Typography>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-10">
                <div className="row">
                  <div className="col">
                    <div className="col" onClick={togglePreview}>
                      <img
                        src={details.paymentProof}
                        alt="Preview"
                        style={{ width: "100%", cursor: "pointer" }}
                      />
                    </div>

                    {/* Modal/Preview */}
                    {showPreview && (
                      <div
                        className="modal"
                        style={{ display: "block", padding: "50px" }}
                      >
                        <span
                          onClick={togglePreview}
                          className="btn btn-danger"
                          style={{ cursor: "pointer" }}
                        >
                          Close
                        </span>
                        <img
                          onClick={togglePreview}
                          src={details.paymentProof}
                          alt="Full Size"
                          style={{ width: "100%" /* Style as needed */ }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="col-md-6">
                    {/* Summary/Details section */}
                    <div className="ps-5">
                      <h2>Summary/Details</h2>
                      <hr />

                      {regObj !== null ? (
                        <>
                        <div className="row mb-3 regFee">
                          <div className="col">
                            <h6 className="regFee">Registration Fee</h6>
                          </div>
                          <div className="col endAlign">
                            <p>Rs {regObj.price}</p>
                          </div>
                        </div>
                        <hr/>
                        </>
                      ) : (
                        <></>
                      )}
                      {individuals.length > 0 ? (
                        <>
                          <h6 className="text-muted head">Individual</h6>
                          {individuals.map((individual, index) => (
                            <div key={index} className="row mb-3">
                              <div className="col">
                                <p className="ps-2">
                                  <b>{individual.name}</b>
                                </p>
                              </div>
                              <div className="col endAlign">
                                <p>Rs {individual.price}</p>
                              </div>
                            </div>
                          ))}
                          <hr/>
                        </>
                      
                      ) : (
                        <></>
                      )}
                      {teams.length > 0 ? (
                        <>
                          <h6 className="text-muted head">Team</h6>
                          {teams.map((individual, index) => (
                            <div key={index} className="row mb-3">
                              <div className="col">
                                <p className="ps-2">
                                  <b>{individual.name}</b>
                                </p>
                              </div>
                              <div className="col endAlign">
                                <p>Rs {individual.price}</p>
                              </div>
                            </div>
                          ))}
                          <hr/>
                        </>
                      ) : (
                        <></>
                      )}
                      <hr />
                      <div className="d-flex justify-content-between mb-3">
                        <h3>Total</h3>
                        <h3>
                          Rs <b>{details.netTotal}</b>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>



          <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Set User Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <label >Reason:</label>
            <input type="text" placeholder='Write reason here' value={reason} onChange={(e)=>setReason(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{
            handleClose()
            setStatus()
            }}>
            Set Status
          </Button>
        </Modal.Footer>
      </Modal>
      

      <div className="row pt-5">
            
            <div className="col text-end">
              <a href="#">
                <Button
                  className="btn my-2 my-sm-0 outlinedBtn"
                  onClick={() => {
                    handleShow();
                    handleAction("rejected");
                  }}
                >
                  Reject
                </Button>
              </a>
              <a href="#">
                <Button
                  className="btn  my-2 my-sm-0 filledBtn"
                  onClick={() => {
                    handleShow();
                    handleAction("verified");
                  }}
                >
                  Verify
                </Button>
              </a>
            </div>
            </div>
        </>
      )}
    </RegLayout>
  );
};

export default ChallanDetails;
