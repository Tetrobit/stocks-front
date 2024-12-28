import React from 'react';

import Avatar from '@mui/material/Avatar'
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import './style.css';

import { getExRate } from '../../api';
import { COUNTRIES_ICONS } from '../../constants/countries';
import { CURRENCIES } from '../../constants/currencies';

const ExRatePage = (): React.ReactElement => {

  const [currency, setCurrency] = React.useState('RUB');
  const currencies_values = React.useMemo(() => {
    let list_currencies = Object.entries(CURRENCIES);
    list_currencies = list_currencies.filter(cur => cur[0] != currency);

    let currencies_cnt = list_currencies.length;
    let ex_rate = getExRate();
    return list_currencies.map(([cur, [name, country]]) => {
      let price = ex_rate[cur] / ex_rate[currency];
      return (
        <div className='currency-info'>
          <div className='currency-price-info'>
            <span className='currency-cost'>{price.toFixed(4)} </span>
            <span className='currency-code'>{cur}</span>
          </div>
          <div className='currency-price-subtitle'>
            <img width="20" src={COUNTRIES_ICONS[country]} alt={country} />
            <span className='currency-name'>{name}</span>
          </div>
        </div>
      );
    });
  }, [currency]);
  
  const handleChange = (event: SelectChangeEvent) => {
    setCurrency(event.target.value);
  };

    return (
    <div className='exrate'>
      <div className='main-currency'>
        <span className='currency-count'>1</span>
        <Select
          value={currency}
          onChange={handleChange}
        >
          { Object.entries(CURRENCIES).map(([cur, [name, country]]) => {
            return (
              <MenuItem key={cur} value={cur}>
                <div className='currency-item'>
                  <img width="30" src={COUNTRIES_ICONS[country]} alt={country} />
                  <span>{name}</span>
                </div>
              </MenuItem>
            );
          })}
        </Select>
      </div>
      <div className='currency-prices'>
          <div className='currency-prices-col'>
            {currencies_values.slice(0, currencies_values.length >> 1)}
          </div>
          <div className='currency-prices-col'>
            {currencies_values.slice(currencies_values.length >> 1)}
          </div>
      </div>
    </div>
  )
};

export default ExRatePage;