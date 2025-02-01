import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header';
import { useAppSelector } from '../../../../store/hooks';
import { LinearProgress } from '@mui/material';

const Layout = (): React.ReactElement => {
  const loading = useAppSelector(state => state.loadingReducer);
  
  return (
    <>
      <Header />
      { loading.loading &&
        <div className="linear-loader">
          <LinearProgress />
        </div>
      }
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
