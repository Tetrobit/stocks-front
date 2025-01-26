import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getNavigationValue } from '@brojs/cli';
import './style.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import './style.css';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';

const LoginPage = (): React.ReactElement => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // const user = {
  //   username: 'test',
  //   password: 'test'
  // };
  return (
    <div className='login-page'>
      <div className='login-container'>
        <Stack spacing={2}>
        <div className='login-text'>Введите логин и пароль</div>
        <div className='input-wrapper'>
          <Stack spacing={2}>
            <TextField
              id="outlined-login-input"
              label="Логин"
              type="Login"
              className="form-input"
              autoComplete="current-login"
            />
            <FormControl>
            <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
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
                label="Пароль"
              />
        </FormControl>
          </Stack>  
        </div>
        <Box className='box-wrapper'>
              <Button variant="outlined" className='login-button'>Войти</Button>
        </Box>
          <Divider />
          <div className='login-signup-text'>Нет аккаунта? 
            <Link to={getNavigationValue('tetrobit-stocks.signin')}>Зарегистрироваться</Link>
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

export default LoginPage;


