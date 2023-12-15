import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Registration.css';
import { Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SideNav from '../Components/SideNav';
import TopNav from '../Components/TopNav';

const CricketDescription = ({ data }) => {
  const navigate = useNavigate();
  const { title, description, teamMembers } = data;

  const loggedInUser = {
    role: 'Captain',
  };
  const [showModal, setShowModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleButtonClick = () => {
    navigate('/dashboard');
  };

  const handleDelete = (index) => {
    setShowModal(true);
    setDeleteIndex(index);
  };

  const handleConfirmDelete = () => {
    setShowModal(false);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  return (
    <div> 
      <TopNav
      profileImagePath="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      userName="John Doe"
      ></TopNav>
    <Container fluid className="mt-5">
      <Row>
        {/* SideNav in the first two columns */}
        <Col md={2}>
          <SideNav />
        </Col>
        <Col md={10}>
          <div>
            <Typography variant="h2" align="left">
              {title}
            </Typography>
            <Typography variant="subtitle1" align="left" gutterBottom>
              <b>Description</b>
            </Typography>
            <Typography variant="body1" align="left">
              {description}
            </Typography>
            <br />
            <br />
            <Typography variant="subtitle1" align="left" gutterBottom>
              <b>Team Members</b>
            </Typography>
            {teamMembers.map((member, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginBottom: '10px',
                  marginBottom: '10px',
                }}
              >
                {/* ... (existing member display code) */}
              </div>
            ))}
          </div>
          <Button
            className="btn btn-primary round-edge left-align"
            onClick={handleButtonClick}
          >
            Go Back
          </Button>
        </Col>
      </Row>

      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            padding: '20px',
            borderRadius: '5px',
            // boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
          }}
        >
          <p>Are you sure you want to delete this member?</p>
          <div>
            <Button
              className="btn btn-secondary round-edge me-5"
              onClick={handleCancelDelete}
            >
              Cancel
            </Button>
            <Button
              className="btn btn-primary round-edge"
              onClick={handleConfirmDelete}
            >
              Confirm
            </Button>
          </div>
        </div>
      )}
    </Container>
    </div>
  );
};

export default CricketDescription;



// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../Styles/Registration.css';
// import { Typography} from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import React, { useState } from 'react';
// import { Button } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import SideNav from '../Components/SideNav';
// import TopNav from '../Components/TopNav';
 

// //FOR TEAM SPORTS

// const CricketDescription = ({ data }) => {

//     const navigate = useNavigate();
//     const { title, description, teamMembers } = data;
  
//     // const removeMember = (index) => {
//     //   alert(`Are you sure you want to delete the member`);
//     // };
//     const loggedInUser={
//       role:'Captain'
//     }
//     const [showModal, setShowModal] = useState(false);
//     const [deleteIndex, setDeleteIndex] = useState(null);

//     const handleButtonClick = () => {
//       navigate('/dashboard');
//     }
  
//     const handleDelete = (index) => {
//       setShowModal(true);
//       setDeleteIndex(index);
//     };
  
//     const handleConfirmDelete = () => {
//       setShowModal(false);
//     };
  
//     const handleCancelDelete = () => {
//       setShowModal(false);
//     };
//     return (
//       <div className="container mt-5"> 
//       <div>
//         <Typography variant="h2" align="left">{title}</Typography>
//         <Typography ariant="subtitle1" align="left" gutterBottom>
//           <b>Description</b>
//         </Typography>
//         <Typography variant="body1" align="left">{description}</Typography>
//         <br/>
//         <br/>
//         <Typography ariant="subtitle1" align="left" gutterBottom>
//           <b>Team Members</b>
//         </Typography>
//         {teamMembers.map((member, index) => (
//   <div key={index} style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px', marginBottom:'10px' }}>
//     <div style={{ flex: 1, display: 'flex'}}>
//       <div style={{ marginRight: '10px' }}>
//         <img src={member.profilePicture} alt={member.name} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
//       </div>
//       <div>
//         <Typography variant="subtitle1" align="left">{member.name}</Typography>
//         <Typography variant="body2" align="left">{member.role}</Typography>
//       </div>
//     </div>
//     {loggedInUser.role === "Captain" && (
//       <div>
//         <Button className="btn btn-primary round-edge" onClick={() => handleDelete(index)}>
//           Remove
//         </Button>
//       </div>
//     )}
//     {showModal && (
//         <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}>
//           <p>Are you sure you want to delete this member?</p>
//           <div>
//             <Button className="btn btn-secondary round-edge me-5" onClick={handleCancelDelete}>Cancel</Button>
//             <Button className="btn btn-primary round-edge" onClick={handleConfirmDelete}>Confirm</Button>
//           </div>
//         </div>
//       )}
      
//   </div>
// ))}

//       </div>
//       <button className="btn btn-primary round-edge left-align" 
//       onClick={handleButtonClick}>Go Back</button>
//       </div>
      
//     );
//   };
// export default CricketDescription;

// FOR SINGLE SPORTS
// const Description = ({ title, description }) => {
// return(
// <div className="container mt-5"> 
// <div>
//       <Typography variant="h2" align="left">{title}</Typography>
//       <Typography variant="subtitle1" align="left" gutterBottom>
//       <b>Description</b>
//       </Typography>
//       <Typography variant="body1" align="left">{description}</Typography>
//     </div>
//       <button 
//              className="btn btn-primary round-edge right-align">Leave</button> 
//       </div>       
// );
// }
// export default Description;
