import React, { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import styled from 'styled-components';
import { fetchCities } from '../../api/OpenWeatherService';

// Styled wrapper for better appearance
const SearchWrapper = styled.div`
  .react-select__control {
    background: #f7fbff;
    border: 1.5px solid #b3c6e0;
    border-radius: 8px;
    min-height: 48px;
    box-shadow: 0 2px 8px rgba(80, 120, 200, 0.08);
    font-size: 1.1rem;
    transition: border 0.2s;
  }
  .react-select__control--is-focused {
    border-color: #007bff;
    box-shadow: 0 0 0 2px #b3d4fc;
  }
  .react-select__input,
  .react-select__single-value {
    color: #222;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  .react-select__placeholder {
    color: #888;
    font-size: 1rem;
  }
  .react-select__menu {
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(80, 120, 200, 0.13);
    font-size: 1rem;
  }
`;

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    background: '#f7fbff',
    borderColor: state.isFocused ? '#007bff' : '#b3c6e0',
    minHeight: 48,
    borderRadius: 8,
    boxShadow: state.isFocused ? '0 0 0 2px #b3d4fc' : '0 2px 8px rgba(80,120,200,0.08)',
    fontSize: '1.1rem',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#888',
    fontSize: '1rem',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#222',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: 8,
    boxShadow: '0 4px 16px rgba(80,120,200,0.13)',
    fontSize: '1rem',
  }),
};

const Search = ({ onSearchChange }) => {
  const [searchValue, setSearchValue] = useState(null);

  const loadOptions = async (inputValue) => {
    const citiesList = await fetchCities(inputValue);

    return {
      options: citiesList.data.map((city) => {
        return {
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        };
      }),
    };
  };

  const onChangeHandler = (enteredData) => {
    setSearchValue(enteredData);
    onSearchChange(enteredData);
  };

  return (
    <SearchWrapper>
      <AsyncPaginate
        placeholder="Search for cities"
        debounceTimeout={600}
        value={searchValue}
        onChange={onChangeHandler}
        loadOptions={loadOptions}
        styles={customStyles}
        classNamePrefix="react-select"
      />
    </SearchWrapper>
  );
};

export default Search;
