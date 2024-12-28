import React from 'react';

import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import SyncAltIcon from '@mui/icons-material/SyncAlt';

import './style.css';

import { getExRate } from '../../api';
import { COUNTRIES_ICONS } from '../../constants/countries';
import { CURRENCIES } from '../../constants/currencies';

const ConverterPage = (): React.ReactElement => {
  const exrates = React.useMemo(() => {
    return getExRate();
  }, []);

  const [currencies, setCurrencies] = React.useState(['RUB', 'USD']);
  const [prices, setPrices] = React.useState([1, exrates[currencies[1]] / exrates[currencies[0]]]);

  const handleChangeCurrency = (id: number) => (event: SelectChangeEvent) => {
    let newCurrencies = currencies.slice();
    newCurrencies[id] = event.target.value;
    setCurrencies(newCurrencies);

    let relation = exrates[newCurrencies[1 - id]] / exrates[newCurrencies[id]];
    let newPrices = prices.slice()
    newPrices[1 - id] = newPrices[id] * relation;
    setPrices(newPrices);
  };

  const handleChangePrice = (id: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    let newPrices = prices.slice()
    let relation = exrates[currencies[1 - id]] / exrates[currencies[id]];
    newPrices[id] = parseFloat(event.target.value);
    newPrices[1 - id] = newPrices[id] * relation;
    setPrices(newPrices);
  }

  const handleRotate = () => {
    setCurrencies(currencies.reverse().slice());
    setPrices(prices.reverse().slice());
  }

  return (
    <div className='converter'>
      { currencies.map((cur, curIndex) => {
        const cost = (exrates[currencies[1 - curIndex]] / exrates[cur]).toFixed(4);
        const label = `1 ${cur} = ${cost} ${currencies[1 - curIndex]}`;
        return <React.Fragment key={cur}>
          <Paper elevation={1}>
            <div className='converter-field'>
              <div className='converter-field-title'>
                <h3>{['Купить', 'Продать'][curIndex]}</h3>
              </div>
              <div className='converter-field-price'>
                <TextField
                  value={prices[curIndex]}
                  onChange={handleChangePrice(curIndex)}
                  label={label}
                  variant='outlined'
                  type='number'
                />
              </div>
              <div className='converter-field-currency'>
                <Select
                  variant='standard'
                  size='small'
                  fullWidth={true}
                  value={cur}
                  onChange={handleChangeCurrency(curIndex)}
                >
                  { Object.entries(CURRENCIES).map(([cur, [name, country]]) => {
                    return (
                      <MenuItem disabled={currencies.indexOf(cur) != -1} key={cur} value={cur}>
                        <div className='currency-item'>
                          <img width="20" src={COUNTRIES_ICONS[country]} alt={country} />
                          <span>{name}</span>
                        </div>
                      </MenuItem>
                    );
                  })}
                </Select>
              </div>
            </div>
          </Paper>

          { curIndex == 0 &&
            <div className="converter-rotator">
              <IconButton onClick={handleRotate}>
                <SyncAltIcon />
              </IconButton>
            </div>
          }
        </React.Fragment>
      })}
    </div>
  )
};

export default ConverterPage;