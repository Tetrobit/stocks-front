

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

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Snackbar } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const TransferPage = (): React.ReactElement => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uid, setUid] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [showFullScreenLoader, setShowFullScreenLoader] = useState<boolean>(false);


  const handleUidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUid(e.target.value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };


  const handleTransfer = () => {
    // Логика перевода средств
    setIsLoading(true);
    setShowFullScreenLoader(true);
    // ...
    setTimeout(() => {
      setIsLoading(false);
      setShowFullScreenLoader(false);
    }, 3000);
  };

  const handleBack = () => {
    // Логика возврата назад
    navigate(getNavigationValue('tetrobit-stocks.profile'));
  };

  return (
    <div className="transfer-wrapper">
      {showFullScreenLoader && (
        <div className="full-screen-loader">
          <CircularProgress />
        </div>
      )}
      <div className="transfer">
        <h1>Перевод средств</h1>
        <div className="input-group">
          <label>Укажите UID Пользователя:</label>
          <TextField id="outlined-basic" label="UID" variant="outlined" onChange={handleUidChange} />
        </div>
        <div className="input-group">
          <label>Укажите Сумму перевода:</label>
          <TextField id="outlined-basic" label="RUB" variant="outlined" onChange={handleAmountChange}/>
        </div>
          <Stack spacing={2} direction="row" className="buttons">
            <Button onClick={handleTransfer} variant="contained" disabled={isLoading}>Перевести</Button>
            <Button onClick={handleBack}  variant="contained">Назад</Button>
          </Stack>
      </div>
      <Snackbar open={isLoading} autoHideDuration={5000}>
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          Перевод успешно выполнен.
        </Alert>
      </Snackbar>
    </div>
  );
};
  export default TransferPage;