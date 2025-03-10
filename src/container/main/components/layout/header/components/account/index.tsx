import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { getNavigationValue } from '@brojs/cli';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import AuthButton from '../auth-button';
import { Skeleton, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../../../../../store/hooks';
import { checkAuth, logout } from '../../../../../../../store/reducers/auth';

export default function AccountMenu() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.authReducer);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate(getNavigationValue('tetrobit-stocks.main'));
  }

  const handleProfile = () => {
    handleClose();
    navigate(getNavigationValue('tetrobit-stocks.profile'));
  }

  React.useLayoutEffect(() => {
    dispatch(checkAuth());
  }, []);

  if (user.status == 'guest') {
    return <AuthButton />;
  }

  if (user.status == 'checking') {
    return <Skeleton sx={{ marginLeft: 1 }} variant='circular' width={40} height={40} />;
  }

  if (user.status == 'authorizing') {
    return <Skeleton sx={{ marginLeft: 1 }} variant='circular' width={40} height={40} />;
  }

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 40, height: 40, background: '#5399f4' }}>
              { user.last_name[0] + user.first_name[0] }
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar src={user.photo} />{ user.last_name } { user.first_name }
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Выйти
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}