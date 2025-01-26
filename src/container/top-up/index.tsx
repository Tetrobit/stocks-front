

import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom'
import { getNavigationValue } from '@brojs/cli';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import Alert from '@mui/material/Alert';
import './style.css';
import CheckIcon from '@mui/icons-material/Check';
import { getExRate } from '../../api';
import { COUNTRIES_ICONS } from '../../constants/countries';
import { CURRENCIES } from '../../constants/currencies';


// index.tsx




// index.tsx
import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Snackbar } from '@mui/material';

const TopUpPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>('');
  const [currency, setCurrency] = useState<string>('$');
  const navigate = useNavigate();
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
  };

  const handleTopUp = () => {
    // Логика перевода средств
    setIsLoading(true);
    // ...
    setTimeout(() => {
      setIsLoading(false);
    }, 10000);
  };


  const handleBack = () => {
    // Логика возврата назад
    navigate(getNavigationValue('tetrobit-stocks.profile'));
  };

  return (
    <div className="topup-wrapper">
      <div className="topup">
        <h1>Пополнение валюты</h1>
        <div className="input-group">
          <label>Введите сумму начисления:</label>
          <TextField id="outlined-basic" label="RUB" variant="outlined" onChange={handleAmountChange}/>
        </div>
        <div>
          <Stack spacing={2} direction="row" className="buttons">
            <Button onClick={handleTopUp} variant="contained">Пополнить баланс</Button>
            <Button onClick={handleBack} variant="contained">Назад</Button>
          </Stack>
        </div>
        <Snackbar open={isLoading}>
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            Пополенние произведено успешно.
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default TopUpPage;