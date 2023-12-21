import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import RegLayout from "../../Components/RegLayout";
import axios from "axios";
import API_URL from "../../config";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const initialState = {
  name: "",
  description: "",
  minPlayer: 0,
  maxPlayer: 0,
  price: 0,
  gender: true,
  teamCap: 0,
};

const AddComp = () => {
  const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoid2FxYXNhbGkwMDEyMysxMjMyQGdtYWlsLmNvbSIsImlhdCI6MTcwMzA3NzI4MCwiZXhwIjoxNzAzMjUwMDgwfQ.f5R3WitUx0Sqq6ucscyYPFQvqLvj_IJPI6DphzPEBd8";

  const [comps, setcomps] = useState([]);
  const [comp, setcomp] = useState(initialState);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setcomp({ ...comp, [name]: value });
  };

  const getcomps = async () => {
    try {
      const response = await axios.get(`${API_URL}competitions/AllSports`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setcomps(response.data.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const addcomp = async () => {
    try {
      setShow(false);

      // Convert string values to integers
      const intMinPlayer = parseInt(comp.minPlayer);
      const intMaxPlayer = parseInt(comp.maxPlayer);
      const intPrice = parseInt(comp.price);
      const intTeamCap = parseInt(comp.teamCap);
  
      const updatedcomp = {
        ...comp,
        minPlayer: intMinPlayer,
        maxPlayer: intMaxPlayer,
        price: intPrice,
        teamCap: intTeamCap,
      };
  
      const response = await axios.post(`${API_URL}competitions/addSport`, updatedcomp, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ3YXFhc2FsaTAwMTIzKzEyMzJAZ21haWwuY29tIiwiaWF0IjoxNzAyODk5NDY0LCJleHAiOjE3MDMwNzIyNjR9.t52Q-eg_4Qts-50Dm6Uluehm3VFvT87twtgk7RChNFo`,
        },
      });
  
  
      setcomp(initialState);
      getcomps();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    getcomps();

  },[])

  return (
    <RegLayout>
      <Typography
        variant="h4"
        component="div"
        sx={{ fontWeight: "bold", fontFamily: "LemonMilkBold" }}
      >
        Competition
      </Typography>
      <Button variant="primary" onClick={handleShow}>
        Add Competition
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Competition</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div>
              <label htmlFor="name">comp Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={comp.name}
                onChange={handleInputChange}
                placeholder="comp Name"
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                name="description"
                value={comp.description}
                onChange={handleInputChange}
                placeholder="Description"
              />
            </div>
            <div>
              <label htmlFor="minPlayer">Minimum Players:</label>
              <input
                type="number"
                id="minPlayer"
                name="minPlayer"
                value={comp.minPlayer}
                onChange={handleInputChange}
                placeholder="Minimum Players"
              />
            </div>
            <div>
              <label htmlFor="maxPlayer">Maximum Players:</label>
              <input
                type="number"
                id="maxPlayer"
                name="maxPlayer"
                value={comp.maxPlayer}
                onChange={handleInputChange}
                placeholder="Maximum Players"
              />
            </div>
            <div>
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                id="price"
                name="price"
                value={comp.price}
                onChange={handleInputChange}
                placeholder="Price"
              />
            </div>
            <div>
              <label htmlFor="gender">Gender:</label>
              <select
                id="gender"
                name="gender"
                value={comp.gender}
                onChange={handleInputChange}
              >
                <option value={true}>Male</option>
                <option value={false}>Female</option>
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addcomp}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Min Player</th>
            <th>Max Player</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {comps.length === 0 ? (
            <tr>
              <td className="text-center" colSpan={7}>
                No entries Found
              </td>
            </tr>
          ) : (
            comps.map((comp, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{comp.name}</td>
                  <td>{comp.gender ? "Male" : "Female"}</td>
                  <td>{comp.minPlayer}</td>
                  <td>{comp.maxPlayer}</td>
                  <td>{comp.price}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>
    </RegLayout>
  );
};
export default AddComp;
