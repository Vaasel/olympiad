import React from 'react';
import TextField from '@mui/material/TextField';

const CustomTextField = ({ type, iconType, label, req='1', ...props }) => {
  const inputProps = {
    style: { borderRadius: '50px' },
  };

  const labelStyles = label ? { position: 'relative', top: '-5px',left:'3px' } : {};
  const iconStyles = label ? { position: 'relative', top: '5px', left:'2px' } : {};

  const iconComponent =
    iconType && React.isValidElement(iconType) ? (
      <span style={{ marginRight: '8px', ...iconStyles }}>{iconType}</span>
    ) : null;

  return (
    req === '1' ?
    <TextField
      InputProps={{
        ...inputProps,
      }}
      label={<span style={{ ...labelStyles }}>{iconComponent}{label}</span>}
      variant="outlined"
      margin="normal"
      fullWidth
      required
      {...props}
    />
    :
    <TextField
      InputProps={{
        ...inputProps,
      }}
      label={<span style={{ ...labelStyles }}>{iconComponent}{label}</span>}
      variant="outlined"
      margin="normal"
      fullWidth
      {...props}
    />
  );
};
export default CustomTextField;


// Example usage:
// <CustomTextField type="email" iconType={<EmailOutlinedIcon />} label="Email" />
// <CustomTextField type="someType" iconType={<SomeIcon />} label="Some Label" />