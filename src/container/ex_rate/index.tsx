import React from 'react';

import Avatar from '@mui/material/Avatar'
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import './style.css';

import { countries_icons } from '../../constants/countries';
import { currencies } from '../../constants/currencies';

const ExRatePage = (): React.ReactElement => {

  const [currency, setCurrency] = React.useState('RUB');
  
  const handleChange = (event: SelectChangeEvent) => {
    setCurrency(event.target.value);
  };

  console.log(Object.entries(currencies));
  return (
    <div className='exrate'>
      <div className='main-currency'>
        <span className='currency-count'>1</span>
        <Select
          value={currency}
          onChange={handleChange}
        >
          { Object.entries(currencies).map(([cur, [name, country]]) => {
            return (
              <MenuItem key={cur} value={cur}>
                <div className='currency-item'>
                  <img width="30" src={countries_icons[country]} alt={country} />
                  <span>{name}</span>
                </div>
              </MenuItem>
            );
          })}
        </Select>
      </div>
    </div>
  )
};

export default ExRatePage;