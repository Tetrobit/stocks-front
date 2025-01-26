import React from 'react';
import { useNavigate } from 'react-router-dom'
import { getNavigationValue } from '@brojs/cli';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import './style.css';

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const user = {
    name: 'Вася Пупкин',
    uid: '224729875',
    balance: {
      usd: 54354,
      rub: 456457,
    },
  };

  const handleTopUpBalance = () => {
    // Логика пополнения баланса
    console.log('Пополнить баланс');
  };

  const handleTransfer = () => {
    // Логика отправки пользователю
    console.log('Отправить пользователю');
    navigate(getNavigationValue('tetrobit-stocks.transfer'));
  };

  const handleLogout = () => {
    // Логика выхода из системы
    navigate(getNavigationValue('tetrobit-stocks.main'));
  };

  return (
    <div className="profile-wrapper">
      <div className="profile">
        <div className="profile-section">
          <div className="info">
            <div className="avatar"></div>
            <div className="name">
              <h2 className="user">{user.name}</h2>
              <p className="hidden">Uid: {user.uid}</p>
            </div>
          </div>
          <div className="balance">
            <p className={"big"}>Ваш баланс: {user.balance.rub} RUB</p>
            <p></p>
          </div>
        </div>
        <div className="buttons-section">
          <Stack spacing={2} direction="column">
            <Button onClick={handleTopUpBalance} variant="contained">Пополнить баланс</Button>
            <Button onClick={handleTransfer} variant="contained">Отправить пользователю</Button>
            <Button onClick={handleLogout}  variant="contained">Выход</Button>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;