
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { getNavigationValue } from '@brojs/cli';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Ma\il';
import IconButton from '@mui/material/IconButton';

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
  },
  {
    name: 'Профиль',
    href: getNavigationValue('tetrobit-stocks.profile')
  }
];

const Header = (): React.ReactElement => {
  const forceUpdate = React.useReducer(x => x + 1, 0)[1];

  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  }

  const handleOpenPath = (path) => () => {
    navigate(path);
  }

  const DrawerList = React.useMemo(() => {
    return (
      <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {navigations.map((item) => {
          const chosen = (window.location.pathname == item.href);
          return (
            <ListItem key={`${item.href}-${chosen ? '0' : '1'}`}>
              <ListItemButton onClick={handleOpenPath(item.href)}>
                {/* <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon> */}
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
    )
  }, [window.location.pathname]);
  
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
      <div className='app-header-drawer'>
        <IconButton onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          { DrawerList }
        </Drawer>
      </div>
    </header>
  );
};

export default Header;
