import React, { useState } from 'react';
import { Card, CardContent, Button, Typography, Box } from '@mui/material';

const CustomCard = ({ title, description, doneCount, leftCount }) => {
  const [isApplied, setIsApplied] = useState(false);

  const handleApplyClick = () => {
    setIsApplied(true);
    // Additional logic or API calls can be added here.
  };

  return (
    <Card sx={{ borderRadius: '20px', maxWidth: 300, margin: '30px', alignItems: 'center', backgroundColor: '#f5f5f5', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
          {description}
        </Typography>
        <Button
          variant="contained"
          color={isApplied ? 'grey' : 'primary'}
          sx={{ width: '60%', mt: 2, color: 'white', borderRadius: '20px', fontWeight: 'bold' }}
          onClick={handleApplyClick}
          disabled={isApplied}
        >
          {isApplied ? 'Applied' : 'Apply'}
        </Button>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left', fontSize: '1.1rem' }}>
            {doneCount} done
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'right', fontSize: '1.1rem' }}>
            {leftCount} left
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
