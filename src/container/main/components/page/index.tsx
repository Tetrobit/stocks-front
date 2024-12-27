import React from 'react';

import './style.css';

const MainPage = (): React.ReactElement => {
  return (
    <div className='greeting'>
      <div className='greeting-title'>
        <h1>TetroBit.Финансы</h1>
        <h2>Тут вся информация о курсах валют</h2>
      </div>
    </div>
  );
};

export default MainPage;