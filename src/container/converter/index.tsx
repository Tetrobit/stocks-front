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
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getDaily } from '../../store/reducers/cbr';
import { loadOff, loadOn } from '../../store/reducers/loading';

const ConverterPage = (): React.ReactElement => {
  
  const cbr = useAppSelector(state => state.cbrReducer);
  const dispatch = useAppDispatch();

  const [currencies, setCurrencies] = React.useState(['RUB', 'USD']);
  const [prices, setPrices] = React.useState([
    1,
    1
  ]);

  const handleChangeCurrency = (id: number) => (event: SelectChangeEvent) => {
    let newCurrencies = currencies.slice();
    newCurrencies[id] = event.target.value;
    setCurrencies(newCurrencies);

    let relation = parseFloat(cbr.daily_course[newCurrencies[id]].value) / parseFloat(cbr.daily_course[newCurrencies[1 - id]].value);
    let newPrices = prices.slice()
    newPrices[1 - id] = newPrices[id] * relation;
    setPrices(newPrices);
  };

  const handleChangePrice = (id: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    let newPrices = prices.slice()
    let relation = parseFloat(cbr.daily_course[currencies[id]].value) / parseFloat(cbr.daily_course[currencies[1 - id]].value);
    newPrices[id] = parseFloat(event.target.value ? event.target.value : '0');
    newPrices[1 - id] = newPrices[id] * relation;
    setPrices(newPrices);
  }

  const handleRotate = () => {
    setCurrencies(currencies.reverse().slice());
    setPrices(prices.reverse().slice());
  }

  React.useEffect(() => {
    if (cbr.daily_status == 'idle') {
      dispatch(loadOn(10000));
      dispatch(getDaily());
    }
    else {
      dispatch(loadOn(2000));
    }
  }, []);

  React.useEffect(() => {
    if (cbr.daily_status == 'loaded') {
      dispatch(loadOff(2000));
      setPrices([1, parseFloat(cbr.daily_course[currencies[0]].value) / parseFloat(cbr.daily_course[currencies[1]].value)]);
    }
  }, [cbr.daily_status]);

  if (cbr.daily_status != 'loaded') {
    return null;
  }

  return (
    <div className='converter'>
      { currencies.map((cur, curIndex) => {
        let relation = parseFloat(cbr.daily_course[cur].value) / parseFloat(cbr.daily_course[currencies[1 - curIndex]].value);
        const cost = (relation).toFixed(4);
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
                  fullWidth={true}
                />
              </div>
              <div className='converter-field-currency'>
                <Select
                  variant='standard'
                  size='small'
                  fullWidth={true}
                  value={cur}
                  onChange={handleChangeCurrency(curIndex)}                          
                  style={{
                    maxWidth: 'calc(100vw - 10px)',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'normal', 
                  }}
                  MenuProps={{
                    slotProps: {
                      paper: {
                        style: {
                          maxHeight: 'calc(60vh - 100px)',
                          maxWidth: 'calc(100vw - 40px)',
                        }
                      }
                    }
                  }}
                >
                  { Object.entries(cbr.daily_course).map(([cur, info]) => {
                    const name = info.name;

                    return (
                      <MenuItem disabled={currencies.indexOf(cur) != -1} key={cur} value={cur}>
                        <div className='currency-item'>
                          <img width="20" src={COUNTRIES_ICONS[cur] ?? COUNTRIES_ICONS['UNKNOWN']} alt={name} />
                          <div className='currency-name'>
                            <span>{name}</span>
                          </div>
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