
import React from 'react';
import { Link } from 'react-router-dom';
import { getNavigationsValue } from '@brojs/cli';

const navigations: Array<{ name: string; href: string }> = [
  {
    name: 'Главная',
    href: getNavigationsValue('tetrobit-stocks.main')
  },
  {
    name: 'Детальная информация',
    href: getNavigationsValue('tetrobit-stocks.describe')
  }
];

const Header = (): React.ReactElement => {
  return (
    <header>
      <ul>
        {navigations.map((item) => {
          return (
            <li key={item.name}>
              <Link to={item.href}>{item.name}</Link>
            </li>
          );
        })}
      </ul>
    </header>
  );
};

export default Header;