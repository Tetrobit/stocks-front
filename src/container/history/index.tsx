import React from 'react';

import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import SyncAltIcon from '@mui/icons-material/SyncAlt';

import './style.css';

import CurrencyChart from './components/currency_chart';

import { COUNTRIES_ICONS } from '../../constants/countries';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getDaily } from '../../store/reducers/cbr';

const HistoryPage = (): React.ReactElement => {

  const cbr = useAppSelector(state => state.cbrReducer);
  const dispatch = useAppDispatch();

  const [currencies, setCurrencies] = React.useState(['RUB', 'USD']);

  const handleChangeCurrency = (id: number) => (event: SelectChangeEvent) => {
    let newCurrencies = currencies.slice();
    newCurrencies[id] = event.target.value;
    setCurrencies(newCurrencies);
  };

  const handleRotate = () => {
    setCurrencies(currencies.reverse().slice());
  }

  React.useEffect(() => {
    if (cbr.daily_status == 'idle') {
      dispatch(getDaily());
    }
  }, []);

  React.useEffect(() => {
    if (cbr.daily_status == 'loaded') {
      console.log(cbr.daily_course);
    }
  }, [cbr.daily_course]);

  if (cbr.daily_status != 'loaded') {
    return <div>Loading...</div>;
  }

  return (
    <div className='history'>
      <div className='currencies'>
        { currencies.map((cur, curIndex) => {
          return <React.Fragment key={cur}>
                <div className='currency-selector'>
                  <Select
                    variant='outlined'
                    size='small'
                    fullWidth={true}
                    value={cur}
                    onChange={handleChangeCurrency(curIndex)}
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

      <div className='dynamic-chart-wrapper'>
        <div className='dynamic-chart'>
          <CurrencyChart currencyBuy={currencies[0]} currencySell={currencies[1]} />
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;