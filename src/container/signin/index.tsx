import React from 'react';
import './style.css';
import Button from '@mui/material/Button';
import { getNavigationValue } from '@brojs/cli';
import { Link} from 'react-router-dom';
import './style.css';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

const SigninPage = (): React.ReactElement => {
  
  return (
    <div className='login-page'>
      <div className='login-container'>
        <Stack spacing={2}>
        <div className='login-text'>Добро пожаловать на TetroBit.Финансы</div>
        <div className='input-wrapper'>
          <Stack spacing={2}>
          <TextField
              id="outlined-name-input"
              label="Имя"
              type="Name"
              className="form-input"
              autoComplete="current-name"
            />
            <TextField
              id="outlined-login-input"
              label="Почта"
              type="Login"
              className="form-input"
              autoComplete="current-login"
            />
            <TextField
              id="outlined-password-input"
              label="Пароль"
              type="Password"
              className="form-input"
              autoComplete="current-password"
            />
            <TextField
            id="outlined-password-input"
            label="Повторите пароль"
            type="Password"
            className="form-input"
            autoComplete="current-password"
            />
          </Stack>  
        </div>
        <Box className='box-wrapper'>
              <Button variant="outlined" className='login-button'>Зарегестрироваться</Button>
        </Box>
          <Divider />
          <div className='login-signup-text'>Есть аккаунт? 
            <Link to=''>Войти</Link>
          </div>

          <div className='login-sn'>
            <div className='login-signup-text'>Авторизоваться через социальные сети</div>
            <div className='social-buttons'>
              <Box sx={{ width: 40, height: 40, backgroundColor: '#00bcd4', margin: 2 }} />
              <Box sx={{ width: 40, height: 40, backgroundColor: '#00bcd4', margin: 2 }} />
              <Box sx={{ width: 40, height: 40, backgroundColor: '#00bcd4', margin: 2 }} />
            </div>
        </div>
        </Stack>
      </div>
    </div>
);
};

export default SigninPage;


