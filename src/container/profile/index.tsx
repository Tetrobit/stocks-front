import React from 'react';
import './style.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const UserProfile: React.FC = () => {
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

  const handleSendToUser = () => {
    // Логика отправки пользователю
    console.log('Отправить пользователю');
  };

  const handleLogout = () => {
    // Логика выхода из системы
    console.log('Выход');
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
            <Button onClick={handleSendToUser} variant="contained">Отправить пользователю</Button>
            <Button onClick={handleLogout}  variant="contained">Выход</Button>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;