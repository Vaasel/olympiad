import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import RegLayout from "../../Components/RegLayout";
import axios from "axios";
import API_URL from "../../config";
import Table from "react-bootstrap/Table";

const Users = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}user/allUsers`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ3YXFhc2FsaTAwMTIzKzEyMzJAZ21haWwuY29tIiwiaWF0IjoxNzAyODk5NDY0LCJleHAiOjE3MDMwNzIyNjR9.t52Q-eg_4Qts-50Dm6Uluehm3VFvT87twtgk7RChNFo`,
        },
      });

      setUsers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  getUsers();

  return (
    <RegLayout>
      <Typography
        variant="h4"
        component="div"
        sx={{ fontWeight: "bold", fontFamily: "LemonMilkBold" }}
      >
        Participants
      </Typography>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Email Status</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {users.length === 0 ? (
          <tr>
            <td className="text-center" colSpan={8}>
              No entries Found
            </td>
          </tr>
        ) : (
          users.map((user) => {
            return user.basicInfo === null ? (
              <>
                {/* You can use React.Fragment or an empty div to wrap the content */}
              </>
            ) : (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isVerified ? "Verified" : "Unverified"}</td>
                <td>{user.basicInfo.phoneno}</td>
                <td>{user.basicInfo.gender ? "male" : "female"}</td>
                <td>{user.basicInfo.status}</td>
                <td><a href="#">view</a></td>
              </tr>
            );
          })
        )}

        </tbody>
      </Table>
    </RegLayout>
  );
};
export default Users;
