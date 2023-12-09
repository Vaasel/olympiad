import React from 'react';
import {Select, MenuItem, ListItemIcon, ListItemText} from '@mui/material';
import WcOutlinedIcon from '@mui/icons-material/WcOutlined';

const CustomSelectField = ({ type, iconType, label }) => {
  const inputProps = {
    style: { borderRadius: '50px' },
  };

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ];

  return (
    <Select label=". Gender                        ."
    style={{ borderRadius: '50px' }}>
    <MenuItem value={"male"}>Male</MenuItem>
    <MenuItem value={"female"}>Female</MenuItem>
  </Select>
  );
};

export default CustomSelectField;
