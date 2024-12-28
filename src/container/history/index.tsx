import React from 'react';

import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import SyncAltIcon from '@mui/icons-material/SyncAlt';

import './style.css';

import { COUNTRIES_ICONS } from '../../constants/countries';
import { CURRENCIES } from '../../constants/currencies';

const HistoryPage = (): React.ReactElement => {
  const [currencies, setCurrencies] = React.useState(['RUB', 'USD']);

  const handleChangeCurrency = (id: number) => (event: SelectChangeEvent) => {
    let newCurrencies = currencies.slice();
    newCurrencies[id] = event.target.value;
    setCurrencies(newCurrencies);
  };


  const handleRotate = () => {
    setCurrencies(currencies.reverse().slice());
  }

  return (
    <div className='history'>
      <div className='currencies'>
        { currencies.map((cur, curIndex) => {
          return <React.Fragment key={cur}>
                <div className='currency-selector'>
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
    </div>
  );
};

export default HistoryPage;