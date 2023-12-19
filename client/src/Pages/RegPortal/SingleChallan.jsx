import React, { useEffect, useState } from "react";
import RegLayout from "../../Components/RegLayout";
import { Grid, Typography } from "@mui/material";

const ChallanDetails = () => {
    return (
      <RegLayout>
        <Typography
          variant="h4"
          component="div"
          sx={{ fontWeight: "bold", fontFamily: "LemonMilkBold" }}
        >
          Challan Detail
        </Typography>
        
    </RegLayout>
    )
  };
  

  export default ChallanDetails;