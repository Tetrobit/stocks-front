import React from 'react';

import InteractiveTiles from '../../../../components/interactive-tiles'; '../../../../components/interactive-tiles';

import './style.css';

const MainPage = (): React.ReactElement => {
  return (
    <div className='greeting'>
      <div className='greeting-title'>
        <h1>TetroBit.Финансы</h1>
        <h2>Всё о курсах валют в одном месте</h2>
      </div>
      <div className="background">
        <InteractiveTiles />
      </div>
    </div>
  );
};

export default MainPage;