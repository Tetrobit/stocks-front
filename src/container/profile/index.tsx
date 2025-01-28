import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { getNavigationValue } from '@brojs/cli';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import './style.css';

export const getUserData = (): Promise<{ name: string; uid: string; balance: number}> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'Вася Пупкин',
        uid: '224729875',
        balance: 456457,
      });
    }, 1000); // 1 секунда задержки
  });
};

const UserProfile = (): React.ReactElement => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; uid: string; balance: number } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Имитация загрузки данных с сервера
    getUserData()
      .then((data) => {
        setUser(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        // Здесь можно добавить обработку ошибок
      });
  }, []);

  const handleTopUpBalance = () => {
    // Логика пополнения баланса
    console.log('Пополнить баланс');
    navigate(getNavigationValue('tetrobit-stocks.top-up'));
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
      {isLoading && (
        <div className="full-screen-loader">
          <CircularProgress />
        </div>
      )}
      <div className="profile">
        <div className="profile-section">
          <div className="info">
            <div className="avatar"></div>
            <div className="name">
              <h2 className="user">{user?.name}</h2>
              <p className="hidden">Uid: {user?.uid}</p>
            </div>
          </div>
          <div className="balance">
            <p className={"big"}>Ваш баланс: {user?.balance} RUB</p>
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