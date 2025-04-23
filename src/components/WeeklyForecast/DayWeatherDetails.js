import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

// Helper to format to 12-hour time with AM/PM
function formatTo12Hour(dtTxt) {
  if (!dtTxt) return '';
  const date = new Date(dtTxt.replace(' ', 'T'));
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const minStr = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${minStr} ${ampm}`;
}

const DayWeatherDetails = (props) => {
  const textColor = props.color || 'white';
  const bgColor = props.color === '#111' ? '#f7fbff' : 'rgba(44,44,44,0.95)';
  const borderColor = props.color === '#111' ? '#b3c6e0' : 'rgba(255,255,255,0.15)';
  return (
    <Grid
      container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingLeft: { xs: '12px', sm: '20px', md: '32px' },
        background: bgColor,
        borderRadius: '10px',
        border: `1.5px solid ${borderColor}`,
        minWidth: '180px',
        marginBottom: '8px',
        boxShadow: props.color === '#111'
          ? '0 2px 8px rgba(80,120,200,0.08)'
          : '0 2px 8px rgba(0,0,0,0.18)',
      }}
    >
      <Typography
        xs={12}
        sx={{
          fontFamily: 'Poppins',
          fontWeight: { xs: '400', sm: '600' },
          fontSize: { xs: '12px', sm: '13px', md: '14px' },
          color: textColor,
          lineHeight: 1,
          height: '31px',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        {/* Show date and 12-hour time */}
        {props.day ? (() => {
          const [datePart, timePart] = props.day.split(' ');
          return (
            <>
              {datePart} {formatTo12Hour(props.day)}
            </>
          );
        })() : ''}
      </Typography>
      <Box
        xs={12}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '31px',
        }}
      >
        <Box
          component="img"
          sx={{
            width: { xs: '24px', sm: '28px', md: '31px' },
            height: 'auto',
            marginRight: '4px',
            filter: props.color === '#111' ? 'none' : 'brightness(1.2) invert(0.88)',
          }}
          alt="weather"
          src={props.src}
        />
        <Typography
          variant="h4"
          component="h4"
          sx={{
            fontSize: { xs: '12px', md: '14px' },
            color: textColor,
            lineHeight: 1,
            fontFamily: 'Roboto Condensed',
          }}
        >
          {props.description}
        </Typography>
      </Box>
    </Grid>
  );
};

export default DayWeatherDetails;
