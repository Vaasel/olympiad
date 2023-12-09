import React, { useState } from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';

const CustomRadioField = ({ type, label,handleChange }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const boldLabelStyle = {
  fontWeight: 'bold',
  color: '#000000',
  }

  const Options = [
    { value: 'nust', label: 'Nust' },
    { value: 'other_uni', label: 'Other University' },
    { value: 'college', label: 'College' },
    { value: 'school', label: 'School' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend" style={boldLabelStyle}>{label}</FormLabel>
      <RadioGroup
        aria-label="University"
        name="uni"
        onChange={handleChange}
        column
      >
        {Options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default CustomRadioField;
// import React from 'react';
// import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';

// const CustomRadioField = ({ label, handleChange }) => {
//   const boldLabelStyle = {
//     fontWeight: 'bold',
//     color: '#000000',
//   };

//   const Options = [
//     { value: 'nust', label: 'Nust' },
//     { value: 'other_uni', label: 'Other University' },
//     { value: 'college', label: 'College' },
//     { value: 'school', label: 'School' },
//     { value: 'other', label: 'Other' },
//   ];

//   return (
//     <FormControl component="fieldset">
//       <FormLabel component="legend" style={boldLabelStyle}>{label}</FormLabel>
//       <RadioGroup
//         aria-label="University"
//         name="uni"
//         value={handleChange} 
//         onChange={(e) => handleChange(e.target.value)} 
//         column
//       >
//         {Options.map((option) => (
//           <FormControlLabel
//             key={option.value}
//             value={option.value}
//             control={<Radio />}
//             label={option.label}
//           />
//         ))}
//       </RadioGroup>
//     </FormControl>
//   );
// };

// export default CustomRadioField;
