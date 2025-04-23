import AirIcon from '@mui/icons-material/Air';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import { Box, SvgIcon, Typography } from '@mui/material';
import React from 'react';
import { ReactComponent as HumidityIcon } from '../../assets/humidity.svg';

const WeeklyForecastItem = ({ value, type, color }) => {
  let iconContent;

  // Set icon color based on the color prop (for light/dark mode)
  const iconColor = color || 'white';
  const textColor = color || 'white';

  if (type === 'temperature')
    iconContent = (
      <ThermostatIcon
        sx={{
          fontSize: { xs: '15px', sm: '16px', md: '18px' },
          color: iconColor,
        }}
      />
    );
  else if (type === 'wind')
    iconContent = (
      <AirIcon
        sx={{
          fontSize: { xs: '15px', sm: '16px', md: '18px' },
          color: iconColor,
        }}
      />
    );
  else if (type === 'clouds')
    iconContent = (
      <FilterDramaIcon
        sx={{
          fontSize: { xs: '15px', sm: '16px', md: '18px' },
          color: iconColor,
        }}
      />
    );
  else if (type === 'humidity')
    iconContent = (
      <SvgIcon
        component={HumidityIcon}
        inheritViewBox
        sx={{
          fontSize: { xs: '15px', sm: '16px', md: '18px' },
          color: iconColor,
        }}
      />
    );
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '31px',
        color: textColor,
        gap: { xs: '3px', sm: '4px', md: '6px' },
        width: '100%',
      }}
    >
      {iconContent}
      <Typography
        variant="p"
        component="p"
        sx={{
          fontSize: { xs: '12px', sm: '13px' },
          fontWeight: { xs: '400', sm: '600' },
          color: textColor,
          fontFamily: 'Poppins',
          lineHeight: 1,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};

export default WeeklyForecastItem;
