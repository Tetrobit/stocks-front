import React from 'react';

import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import './style.css';

import { COUNTRIES_ICONS } from '../../constants/countries';
import { CURRENCIES } from '../../constants/currencies';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getDaily } from '../../store/reducers/cbr';
import { FormControl } from '@mui/material';
import { loadOff, loadOn } from '../../store/reducers/loading';

const ExRatePage = (): React.ReactElement => {

  const cbr = useAppSelector(state => state.cbrReducer);
  const dispatch = useAppDispatch();
  const [currency, setCurrency] = React.useState('RUB');

  const currencies_values = React.useMemo(() => {
    let list_currencies = Object.entries(cbr.daily_course);

    return list_currencies.map(([cur, info]) => {
      const price = parseFloat(cbr.daily_course[currency].value) / parseFloat(info.value);
      const value = price.toFixed(4);
      const name = info.name;
      if (cur == currency) return null;
      return (
        <div key={cur} className='currency-info'>
          <div className='currency-price-info'>
            <span className='currency-cost'>{parseFloat(value).toFixed(4)} </span>
            <span className='currency-code'>{cur}</span>
          </div>
          <div className='currency-price-subtitle'>
            <img width="20" src={COUNTRIES_ICONS[cur] ?? COUNTRIES_ICONS['UNKNOWN']} alt={name} />
            <span className='currency-name'>{name}</span>
          </div>
        </div>
      );
    });
  }, [currency, cbr.daily_course]);
  
  React.useEffect(() => {
    if (cbr.daily_status == 'idle') {
      dispatch(loadOn(10000));
      dispatch(getDaily());
    }
    else if (cbr.daily_status == 'loaded') {
      dispatch(loadOff(2000));
    }
  }, [cbr.daily_status]);

  React.useEffect(() => {
    dispatch(loadOn(2000));
  }, []);
  
  const handleChange = (event: SelectChangeEvent) => {
    setCurrency(event.target.value);
  };

  return (
    <div className='exrate'>
      <div className='main-currency'>
        <span className='currency-count'>1</span>
        <span className='currency-code'>{ currency }</span>
        <Select
          value={currency}
          onChange={handleChange}
          style={{
            maxWidth: 'calc(100vw - 130px)',
            textOverflow: 'ellipsis',
            whiteSpace: 'normal', 
          }}
          MenuProps={{
            slotProps: {
              paper: {
                style: {
                  maxHeight: 'calc(70vh - 100px)',
                  maxWidth: 'calc(100vw - 40px)',
                }
              }
            }
          }}
        >
          { Object.entries(cbr.daily_course).map(([cur, info]) => {
            const name = info.name;
            return (
              <MenuItem key={cur} value={cur}>
                <div className='currency-item'>
                  <img width="30" src={COUNTRIES_ICONS[cur] ?? COUNTRIES_ICONS['UNKNOWN']} alt={name} />
                  <div className='currency-name'>
                    <span>{name}</span>
                  </div>
                </div>
              </MenuItem>
            );
          })}
        </Select>
      </div>
      <div className='currency-prices-wrapper'>
        <div className='currency-prices'>
          { currencies_values }
        </div>
      </div>
    </div>
  )
};

export default ExRatePage;