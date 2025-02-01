import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { getNavigationValue } from '@brojs/cli';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import './style.css';
import { useAppSelector } from '../../store/hooks';
import { Avatar } from '@mui/material';

const UserProfile = (): React.ReactElement => {
  const navigate = useNavigate();
  const user = useAppSelector(state => state.authReducer);
  // const [user, setUser] = useState<{ name: string; uid: string; balance: number } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
      <div className="profile">
        <div className="profile-section">
          <div className="info">
            <div className="avatar">
              <img src={user.photo} />
            </div>
            <div className="name">
              <h2 className="user">{user?.last_name} {user?.first_name}</h2>
              <p className="hidden">Uid: { user.id }</p>
            </div>
          </div>
          <div className="balance">
            <p className={"big"}>Ваш баланс: 10 RUB</p>
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