import React from 'react';
import {Select, MenuItem} from '@mui/material';

const CustomSelectField = ({ type, iconType, label }) => {
  const inputProps = {
    style: { borderRadius: '50px' },
  };

  const iconComponent =
    iconType && React.isValidElement(iconType) ? (
      <span style={{ marginRight: '8px' }}>{iconType}</span>
    ) : null;

  return (
    <Select
    label={<span>{iconComponent}{label}</span>}
    style={{ borderRadius: '50px' }}>
    <MenuItem value={"male"}>Male</MenuItem>
    <MenuItem value={"female"}>Female</MenuItem>
  </Select>
  );
};

// Example usage:
// <CustomTextField type="email" iconType={<EmailOutlinedIcon />} label="Email" />

export default CustomSelectField;
