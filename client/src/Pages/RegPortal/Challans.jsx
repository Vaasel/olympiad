import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import RegLayout from "../../Components/RegLayout";
import axios from "axios";
import API_URL from "../../config";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";

const Challans = () => {
  const [challans, setChallans] = useState([]);
  const navigate = useNavigate();

  const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoid2FxYXNhbGkwMDEyMysxMjMyQGdtYWlsLmNvbSIsImlhdCI6MTcwMzA3NzI4MCwiZXhwIjoxNzAzMjUwMDgwfQ.f5R3WitUx0Sqq6ucscyYPFQvqLvj_IJPI6DphzPEBd8";

  const getChallans = async () => {
    try {
      const response = await axios.get(`${API_URL}challan/getAllChallans`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setChallans(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  getChallans();

  return (
    <RegLayout>
      <Typography
        variant="h4"
        component="div"
        sx={{ fontWeight: "bold", fontFamily: "LemonMilkBold" }}
      >
        Challans
      </Typography>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {challans.length === 0 ? (
            <tr>
              <td className="text-center" colSpan={7}>
                No entries Found
              </td>
            </tr>
          ) : (
            challans.map((challan, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{challan.user.name}</td>
                  <td>{challan.user.email}</td>
                  <td>{challan.netTotal}</td>
                  <td>{challan.isPaid}</td>
                  <td><button onClick={()=>navigate(`/challan/${challan.id}`)}>View</button></td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>
    </RegLayout>
  );
};
export default Challans;
