
import React from 'react';
import { Link } from 'react-router-dom'
import { getNavigationValue } from '@brojs/cli';

import Button from '@mui/material/Button';
import './style.css';

import logoImage from '../../../../../assets/images/logo.svg';

const navigations: Array<{ name: string; href: string }> = [
  {
    name: 'Курсы валют',
    href: getNavigationValue('tetrobit-stocks.ex-rate')
  },
  {
    name: 'Конвертер',
    href: getNavigationValue('tetrobit-stocks.converter')
  },
  {
    name: 'Динамика',
    href: getNavigationValue('tetrobit-stocks.history')
  }
];

const Header = (): React.ReactElement => {
  const forceUpdate = React.useReducer(x => x + 1, 0)[1];
  
  return (
    <header className='app-header'>
      <div className='app-header-logo'>
        <Link onClick={() => forceUpdate()} to={getNavigationValue('tetrobit-stocks.main')}>
          <img src={logoImage} />
        </Link>
      </div>
      <nav className='app-header-nav'>
        {navigations.map((item) => {
          const chosen = (window.location.pathname == item.href);
          return (
            <div key={`${item.href}-${chosen ? '0' : '1'}`} className='app-header-nav-item'>
              <Link onClick={() => forceUpdate()} to={item.href}>
                <Button key={item.name} variant={chosen ? 'contained' : 'outlined'}>
                  {item.name}
                </Button>
              </Link>
            </div>
          );
        })}
      </nav>
    </header>
  );
};

export default Header;
