import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const StatusCard = ({ title, description, color }) => {
  return (
    <Card sx={{ borderRadius: '20px', maxWidth: 300, margin: '30px', alignItems: 'left', backgroundColor: color, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <CardContent sx={{ textAlign: 'left' }}>
      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1.1rem', fontWeight: 'bold', fontFamily: 'LemonMilkRegular' }}>
          {description}
        </Typography>
        <Typography variant="h5" component="div" sx={{ fontFamily: 'LemonMilkBold' }}>
          {title}
        </Typography>  
      </CardContent>
    </Card>
  );
};

export default StatusCard;
