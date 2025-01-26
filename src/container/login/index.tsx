import React from 'react';
import './style.css';
import { useState } from 'react';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import logoImage from '../../assets/images/logo.svg'; // Путь к логотипу

const LoginPage = (): React.ReactElement => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const user = {
    username: 'test',
    password: 'test'
  };

  return (
    <div className='login-page'>
      <div className='login-container'>
        <Stack spacing={2}>
        <div className='login-text'>Введите логин и пароль</div>
        <div className='input-wrapper'>
          <Stack spacing={2}>
            <TextField
              id="outlined-login-input"
              label="Login"
              type="Login"
              className="form-input"
              autoComplete="current-login"
            />
            <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            className="form-input"
            autoComplete="current-password"
            />
          </Stack>  
        </div>
        <Box className='box-wrapper'>
              <Button variant="outlined" className='login-button'>Войти</Button>
        </Box>
        {/* <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          /> */}
          
          <div className='login-signup-text'>Нет аккаунта? <Link to='/register'>Зарегистрироваться</Link></div>
        </Stack>
        <div className='login-sn'>
          {/* <div className='login-sn-text'>Войти через</div> */}
          
            

        </div>

      </div>
    </div>
);
};

export default LoginPage;


