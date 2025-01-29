// NotFoundPage.tsx
import React from 'react';
import './style.css';
import { getNavigationValue } from '@brojs/cli';
import { useNavigate } from 'react-router-dom'

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
    </div>
  );
};

export default NotFoundPage;