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
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';

const SigninPage = (): React.ReactElement => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const [showRepeatPassword, setShowRepeatPassword] = React.useState(false);
  const handleClickShowRepeatPassword = () => setShowRepeatPassword((show) => !show);
  const handleMouseDownRepeatPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleMouseUpRepeatPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  
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
            <FormControl>
            <InputLabel htmlFor="outlined-adornment-password">Повторите пароль</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showRepeatPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showRepeatPassword ? 'hide the password' : 'display the password'
                      }
                      onClick={handleClickShowRepeatPassword}
                      onMouseDown={handleMouseDownRepeatPassword}
                      onMouseUp={handleMouseUpRepeatPassword}
                      edge="end"
                    >
                      {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Повторите пароль"
              />
            </FormControl>
          </Stack>  
        </div>
        <Box className='box-wrapper'>
              <Button variant="outlined" className='login-button'>Зарегестрироваться</Button>
        </Box>
          <Divider />
          <div className='login-signup-text'>Есть аккаунт? 
            <Link to={getNavigationValue('tetrobit-stocks.login')}>Войти</Link>
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


