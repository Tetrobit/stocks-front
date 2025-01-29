// index.tsx
import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Snackbar } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import './style.css';
import { getNavigationValue } from '@brojs/cli';

const TopUpPage = (): React.ReactElement => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showFullScreenLoader, setShowFullScreenLoader] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>('');
  const navigate = useNavigate();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleTopUp = () => {
    setIsLoading(true);
    setShowFullScreenLoader(true);
    // Логика перевода средств
    // Здесь можно добавить вызов API или другую логику

    setTimeout(() => {
      setIsLoading(false);
      setShowFullScreenLoader(false);
      // Здесь можно добавить логику для отображения успешного пополнения
    }, 3000);
  };

  const handleBack = () => {
    navigate(getNavigationValue('tetrobit-stocks.profile')); // Заменить на нужный путь
  };

  return (
    <div className="topup-wrapper">
      {showFullScreenLoader && (
        <div className="full-screen-loader">
          <CircularProgress />
        </div>
      )}
      <div className="topup">
        <h1>Пополнение валюты</h1>
        <div className="input-group">
          <label>Введите сумму начисления:</label>
          <TextField
            id="outlined-basic"
            label="RUB"
            variant="outlined"
            value={amount}
            onChange={handleAmountChange}
          />
        </div>
        <div>
          <Stack spacing={2} direction="row" className="buttons">
            <Button onClick={handleTopUp} variant="contained" disabled={isLoading}>Пополнить баланс</Button>
            <Button onClick={handleBack} variant="contained">Назад</Button>
          </Stack>
        </div>
        <Snackbar open={isLoading} autoHideDuration={5000}>
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            Пополнение произведено успешно.
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default TopUpPage;