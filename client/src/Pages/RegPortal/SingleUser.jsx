import React, { useEffect, useState } from "react";
import RegLayout from "../../Components/RegLayout";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import API_URL from "../../config";

const UserDetails = () => {
  return (
    <RegLayout>
      <Typography
        variant="h4"
        component="div"
        sx={{ fontWeight: "bold", fontFamily: "LemonMilkBold" }}
      >
        Participant Detail
      </Typography>

  </RegLayout>
  )
};
export default UserDetails;