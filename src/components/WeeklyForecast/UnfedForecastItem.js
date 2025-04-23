import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import WeeklyForecastItem from './WeeklyForecastItem';

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

const UnfedForecastItem = (props) => {
  const textColor = props.color || 'white';
  const isLight = props.color === '#111';
  const bgColor = isLight ? '#f7fbff' : 'rgba(44,44,44,0.95)';
  const borderColor = isLight ? '#b3c6e0' : 'rgba(255,255,255,0.15)';
  const iconFilter = isLight ? 'none' : 'brightness(1.2) invert(0.88)';
  const valueColor = textColor;
  const labelColor = isLight ? '#333' : '#eee';

  return (
    <Grid
      container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        background: bgColor,
        borderRadius: '10px',
        border: `1.5px solid ${borderColor}`,
        minWidth: '200px',
        marginBottom: '8px',
        boxShadow: isLight
          ? '0 2px 8px rgba(80,120,200,0.08)'
          : '0 2px 8px rgba(0,0,0,0.18)',
        padding: '12px 10px',
      }}
    >
      <Typography
        xs={12}
        sx={{
          fontFamily: 'Poppins',
          fontWeight: { xs: '400', sm: '600' },
          fontSize: { xs: '13px', sm: '14px', md: '15px' },
          color: textColor,
          lineHeight: 1,
          height: '31px',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '4px',
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
          marginBottom: '8px',
        }}
      >
        <Box
          component="img"
          sx={{
            width: { xs: '24px', sm: '28px', md: '31px' },
            height: 'auto',
            marginRight: '4px',
            filter: iconFilter,
          }}
          alt="weather"
          src={props.src}
        />
        <Typography
          variant="h4"
          component="h4"
          sx={{
            fontSize: { xs: '13px', md: '14px' },
            color: valueColor,
            lineHeight: 1,
            fontFamily: 'Roboto Condensed',
          }}
        >
          {props.value}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 1,
          marginBottom: '4px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <Typography sx={{
            color: labelColor,
            fontSize: '12px',
            marginRight: '4px',
            fontWeight: 500,
            minWidth: '55px'
          }}>
            Temp:
          </Typography>
          <WeeklyForecastItem
            type="temperature"
            value={props.value}
            color={isLight ? '#111' : '#fff'}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <Typography sx={{
            color: labelColor,
            fontSize: '12px',
            marginRight: '4px',
            fontWeight: 500,
            minWidth: '55px'
          }}>
            Clouds:
          </Typography>
          <WeeklyForecastItem
            type="clouds"
            value={props.value}
            color={isLight ? '#111' : '#fff'}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <Typography sx={{
            color: labelColor,
            fontSize: '12px',
            marginRight: '4px',
            fontWeight: 500,
            minWidth: '55px'
          }}>
            Wind:
          </Typography>
          <WeeklyForecastItem
            type="wind"
            value={props.value}
            color={isLight ? 'green' : '#b2ffb2'}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <Typography sx={{
            color: labelColor,
            fontSize: '12px',
            marginRight: '4px',
            fontWeight: 500,
            minWidth: '55px'
          }}>
            Humidity:
          </Typography>
          <WeeklyForecastItem
            type="humidity"
            value={props.value}
            color={isLight ? 'green' : '#b2ffb2'}
          />
        </Box>
      </Box>
    </Grid>
  );
};

export default UnfedForecastItem;
