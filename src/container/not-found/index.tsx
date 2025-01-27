// NotFoundPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { getNavigationValue } from '@brojs/cli'; // Импортируйте ваш CSS для стилизации
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
// import logoImage from '../../../../../assets/images/logo.svg';

import logoImage from 'src/assets/images/logo.svg';


const NotFoundPage = (): React.ReactElement => {
  const navigate = useNavigate();


  const handleLogout = () => {
    // Логика выхода из системы
    navigate(getNavigationValue('tetrobit-stocks.main'));
  };


  return (
    <div className="not-found-container">
      <p>О нет! Этого нет на</p>
      <img src={logoImage} className="image"/>
      <Button onClick={handleLogout} variant="contained">Вернуться на главную</Button>
    </div>
  );
};

export default NotFoundPage;