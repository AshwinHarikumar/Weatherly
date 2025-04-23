import SearchIcon from '@mui/icons-material/Search';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { fetchWeatherData } from './api/OpenWeatherService';
import {
  DayWeatherDetails,
  Search,
  SectionHeader,
  UnfedForecastItem
} from './components';

// Theme definitions
const lightTheme = {
  background: 'rgba(255,255,255,0.85)',
  color: '#111',
  buttonBackground: '#007BFF',
  buttonColor: '#fff',
  cardBackground: 'rgba(255,255,255,0.95)'
};
const darkTheme = {
  background: 'rgba(34,34,34,0.85)',
  color: '#fff',
  buttonBackground: '#1A73E8',
  buttonColor: '#fff',
  cardBackground: 'rgba(44,44,44,0.95)'
};

// Styled components
const Background = styled.div`
  min-height: 100vh;
  width: 100vw;
  /* Use a visually appealing gradient as fallback background */
  background: linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%);
  position: fixed;
  top: 0;
  left: 0;
  z-index: -2;
`;

const Overlay = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: ${({ theme }) => theme.background};
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
`;

const Container = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: ${(props) => props.theme.color};
  min-height: 100vh;
  padding: 40px 0;
  transition: color 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  @media (max-width: 600px) {
    padding: 16px 0;
  }
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-size: 2.8rem;
    font-weight: 700;
    margin: 0;
    letter-spacing: 2px;
    color: ${(props) => props.theme.color};
    text-shadow: 0 2px 8px rgba(0,0,0,0.18);
    display: flex;
    align-items: center;
    gap: 12px;
    @media (max-width: 600px) {
      font-size: 2rem;
      gap: 8px;
    }
  }
  p {
    font-size: 1.15rem;
    font-weight: 400;
    margin: 10px 0 0 0;
    color: ${(props) => props.theme.color};
    opacity: 0.8;
    letter-spacing: 0.5px;
    @media (max-width: 600px) {
      font-size: 1rem;
    }
  }
`;

const Card = styled.div`
  background: ${(props) => props.theme.cardBackground};
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  padding: 28px 24px;
  margin: 24px auto;
  max-width: 900px;
  width: 95vw;
  text-align: center;
  backdrop-filter: blur(2px);
  color: ${(props) => props.theme.color};

  @media (max-width: 600px) {
    padding: 16px 8px;
    margin: 12px auto;
    max-width: 98vw;
  }
`;

const SearchCard = styled(Card)`
  background: linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%);
  box-shadow: 0 6px 24px rgba(80, 120, 200, 0.13);
  border: 1.5px solid #b3c6e0;
  margin-bottom: 18px;
  margin-top: 0;
  padding: 32px 24px;
  max-width: 600px;
  width: 100%;
  color: #111;

  @media (max-width: 600px) {
    padding: 16px 8px;
    max-width: 98vw;
  }
`;

const Button = styled.button`
  background: ${(props) => props.theme.buttonBackground};
  color: ${(props) => props.theme.buttonColor};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin: 8px 12px 8px 0;
  padding: 12px 28px;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 1px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: background 0.3s, color 0.3s, box-shadow 0.2s;
  &:hover {
    background: #0056b3;
    color: #fff;
    box-shadow: 0 4px 16px rgba(0,0,0,0.13);
  }
  @media (max-width: 600px) {
    padding: 10px 16px;
    font-size: 0.95rem;
  }
`;

const FlexGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
  justify-items: center;
  align-items: stretch;
  width: 100%;
  margin-top: 12px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 16px;
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 12px;
    margin-top: 8px;
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  position: absolute;
  top: 24px;
  right: 32px;
  font-size: 1.6rem;
  color: ${(props) => props.theme.color};
  transition: background 0.2s;
  &:hover {
    background: rgba(0,0,0,0.07);
  }
  @media (max-width: 600px) {
    top: 12px;
    right: 12px;
    font-size: 1.3rem;
    padding: 6px;
  }
`;

const UnitToggle = styled.button`
  background: ${(props) => props.theme.buttonBackground};
  color: ${(props) => props.theme.buttonColor};
  border: none;
  border-radius: 20px;
  cursor: pointer;
  margin-left: 16px;
  padding: 6px 18px;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 1px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: background 0.3s, color 0.3s, box-shadow 0.2s;
  vertical-align: middle;
  &:hover {
    background: #0056b3;
    color: #fff;
    box-shadow: 0 4px 16px rgba(0,0,0,0.13);
  }
  @media (max-width: 600px) {
    margin-left: 8px;
    padding: 4px 10px;
    font-size: 0.95rem;
  }
`;

const SearchFab = styled.button`
  position: absolute;
  top: 24px;
  left: 32px;
  background: ${(props) => props.theme.buttonBackground};
  color: ${(props) => props.theme.buttonColor};
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.13);
  cursor: pointer;
  z-index: 10;
  transition: background 0.2s;
  &:hover {
    background: #0056b3;
  }
  @media (max-width: 600px) {
    top: 12px;
    left: 12px;
    width: 36px;
    height: 36px;
    svg {
      font-size: 1.2rem;
    }
  }
`;

const SearchModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.25);
  z-index: 100;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const SearchModal = styled.div`
  margin-top: 80px;
  background: ${(props) => props.theme.cardBackground};
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  padding: 32px 24px;
  max-width: 600px;
  width: 95vw;
  text-align: center;

  @media (max-width: 600px) {
    margin-top: 32px;
    padding: 16px 8px;
    max-width: 98vw;
  }
`;

function App() {
  const [coords, setCoords] = useState(null);
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit
  const [theme, setTheme] = useState('light');
  const [location, setLocation] = useState(''); // New state for location name
  const [showSearch, setShowSearch] = useState(false);

  // Get user's geolocation on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      });
    }
  }, []);

  // Fetch weather data once coords are available
  useEffect(() => {
    if (coords) {
      fetchWeatherData(coords.lat, coords.lon)
        .then(([weatherData, forecastData]) => {
          setWeather({ current: weatherData, forecast: forecastData });
          // Set location string if available
          if (weatherData && weatherData.name) {
            let loc = weatherData.name;
            if (weatherData.sys && weatherData.sys.country) {
              loc += `, ${weatherData.sys.country}`;
            }
            setLocation(loc);
          }
        });
    }
  }, [coords]);

  // Toggle temperature unit and theme mode
  const toggleUnit = () => {
    setUnit((prev) => (prev === 'metric' ? 'imperial' : 'metric'));
  };
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Convert Celsius to Fahrenheit if needed
  const convertTemp = (temp) => {
    return unit === 'metric' ? temp : (temp * 9/5 + 32).toFixed(1);
  };

  const handleOnSearchChange = (searchData) => {
    if (searchData) {
      const [lat, lon] = searchData.value.split(' ');
      fetchWeatherData(lat, lon)
        .then(([weatherData, forecastData]) => {
          setWeather({ current: weatherData, forecast: forecastData });
          // Set location string if available
          if (weatherData && weatherData.name) {
            let loc = weatherData.name;
            if (weatherData.sys && weatherData.sys.country) {
              loc += `, ${weatherData.sys.country}`;
            }
            setLocation(loc);
          }
        });
    }
  };

  // Icon for theme toggle
  const themeIcon = theme === 'light'
    ? <span role="img" aria-label="dark mode">🌙</span>
    : <span role="img" aria-label="light mode">☀️</span>;

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <Background />
      <Overlay theme={theme === 'light' ? lightTheme : darkTheme} />
      <Container>
        {/* Search icon button at top left */}
        <SearchFab
          onClick={() => setShowSearch(true)}
          title="Search for cities"
          theme={theme === 'light' ? lightTheme : darkTheme}
        >
          <SearchIcon fontSize="medium" />
        </SearchFab>
        {/* Dark mode toggle at top right */}
        <ToggleButton onClick={toggleTheme} title="Toggle dark mode">
          {themeIcon}
        </ToggleButton>
        <Header>
          <h1>
            <WbSunnyIcon
              sx={{
                fontSize: 38,
                color: theme === 'light' ? '#fbc02d' : '#ffe082',
                verticalAlign: 'middle',
                marginRight: '6px'
              }}
            />
            Weatherly
          </h1>
          <p>
            Your personalized, beautiful weather dashboard.<br />
            Instantly check the current weather, daily and weekly forecasts for your location or any city worldwide.
          </p>
        </Header>
        {/* Search modal */}
        {showSearch && (
          <SearchModalOverlay onClick={() => setShowSearch(false)}>
            <SearchModal
              theme={theme === 'light' ? lightTheme : darkTheme}
              onClick={e => e.stopPropagation()}
            >
              <Search onSearchChange={(data) => { handleOnSearchChange(data); setShowSearch(false); }} />
            </SearchModal>
          </SearchModalOverlay>
        )}
        {weather ? (
          <>
            <Card
              style={{
                background: theme === 'light'
                  ? 'linear-gradient(120deg, #f7fbff 0%, #e3e9f7 100%)'
                  : 'linear-gradient(120deg, #232526 0%, #414345 100%)',
                border: theme === 'light'
                  ? '1.5px solid #b3c6e0'
                  : '1.5px solid #333',
                boxShadow: theme === 'light'
                  ? '0 2px 8px rgba(80,120,200,0.08)'
                  : '0 2px 8px rgba(0,0,0,0.18)'
              }}
            >
              <SectionHeader title="Current Weather" color={theme === 'light' ? '#111' : '#fff'} />
              {/* Show location if available */}
              {location && (
                <p style={{ fontSize: '1.2rem', fontWeight: 500, margin: '8px 0 0 0', color: theme === 'light' ? '#111' : '#fff' }}>
                  {location}
                </p>
              )}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '12px 0' }}>
                {/* Weather icon */}
                {weather.current.weather && weather.current.weather[0] && (
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`}
                    alt={weather.current.weather[0].description}
                    style={{
                      width: 56,
                      height: 56,
                      marginRight: 16,
                      verticalAlign: 'middle'
                    }}
                  />
                )}
                <span style={{
                  fontSize: '2.2rem',
                  fontWeight: 600,
                  color: theme === 'light' ? '#111' : '#fff'
                }}>
                  {convertTemp(weather.current.main.temp)} {unit === 'metric' ? '°C' : '°F'}
                </span>
                <UnitToggle onClick={toggleUnit} title="Toggle Celsius/Fahrenheit">
                  {unit === 'metric' ? '°F' : '°C'}
                </UnitToggle>
              </div>
              <p style={{
                fontSize: '1.1rem',
                margin: '8px 0',
                color: theme === 'light' ? '#444' : '#ccc',
                fontWeight: 500,
                letterSpacing: '1px',
                textTransform: 'capitalize',
                background: theme === 'light'
                  ? 'linear-gradient(90deg, #e3e9f7 0%, #f7fbff 100%)'
                  : 'linear-gradient(90deg, #232526 0%, #414345 100%)',
                borderRadius: '8px',
                display: 'inline-block',
                padding: '6px 18px',
                boxShadow: theme === 'light'
                  ? '0 1px 4px rgba(80,120,200,0.08)'
                  : '0 1px 4px rgba(0,0,0,0.18)'
              }}>
                {weather.current.weather[0].description}
              </p>
              <FlexGrid>
                <div>
                  <strong>Humidity:</strong> {weather.current.main.humidity}%
                </div>
                <div>
                  <strong>Wind:</strong> {weather.current.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}
                </div>
                <div>
                  <strong>Clouds:</strong> {weather.current.clouds.all}%
                </div>
              </FlexGrid>
            </Card>
            <Card>
              <SectionHeader title="Daily Forecast" mb="2rem" color={theme === 'light' ? '#111' : '#fff'} />
              <FlexGrid>
                {weather.forecast && weather.forecast.list && weather.forecast.list.slice(0, 5).map((item, index) => (
                  <DayWeatherDetails
                    key={index}
                    day={item.dt_txt}
                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                    description={item.weather[0].description}
                    color={theme === 'light' ? '#111' : '#fff'}
                  />
                ))}
              </FlexGrid>
            </Card>
            <Card>
              <SectionHeader title="Weekly Details" mb="2rem" color={theme === 'light' ? '#111' : '#fff'} />
              <FlexGrid>
                {weather.forecast && weather.forecast.list && weather.forecast.list.slice(0, 3).map((item, index) => (
                  <UnfedForecastItem
                    key={index}
                    day={item.dt_txt}
                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                    value={convertTemp(item.main.temp)}
                    color={theme === 'light' ? '#111' : '#fff'}
                  />
                ))}
              </FlexGrid>
            </Card>
          </>
        ) : (
          <Card>
            <p style={{ fontSize: '1.2rem', color: '#888' }}>Loading weather information...</p>
          </Card>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
