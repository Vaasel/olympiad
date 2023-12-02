import React from 'react';
import TextField from '@mui/material/TextField';

const CustomTextField = ({ type, iconType, label, ...props }) => {
  const inputProps = {
    style: { borderRadius: '50px' },
  };

  const iconComponent =
    iconType && React.isValidElement(iconType) ? (
      <span style={{ marginRight: '8px' }}>{iconType}</span>
    ) : null;

  return (
    <TextField
      InputProps={{
        ...inputProps,
      }}
      label={<span>{iconComponent}{label}</span>}
      variant="outlined"
      margin="normal"
      fullWidth
      required
      {...props}
    />
  );
};

// Example usage:
// <CustomTextField type="email" iconType={<EmailOutlinedIcon />} label="Email" />

export default CustomTextField;
