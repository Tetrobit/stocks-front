import React from 'react';
import './style.css';

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
    <div className="container">
      <div className="profile-section">
        <div className="avatar"></div>
        <h2>{user.name}</h2>
        <p>Uid: {user.uid}</p>
        <div className="balance">
          <p>Ваш баланс</p>
          <p>{user.balance.usd}$</p>
          <p>{user.balance.rub} RUB</p>
        </div>
      </div>

      <div className="action-buttons">
        <button onClick={handleTopUpBalance}>Пополнить баланс</button>
        <button onClick={handleSendToUser}>Отправить пользователю</button>
        <button onClick={handleLogout}>Выход</button>
      </div>
    </div>
  );
};

export default UserProfile;