import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ExRatePage from '../ex_rate';
import HistoryPage from '../history';
import ConverterPage from '../converter';
import LoginPage from '../login';
import ProfilePage from '../profile';
import MainPage from './components/page';
import SigninPage from '../signin';
import { getNavigationValue } from '@brojs/cli';
import Layout from './components/layout';
import TransferPage from '../transfer';
import TopUpPage from '../top-up';
import TradePage from '../trade';

export const router = createBrowserRouter([
  {
    path: getNavigationValue('tetrobit-stocks.main'),
    element: <Layout />,
    children: [
      {
        path: getNavigationValue('tetrobit-stocks.main'),
        element: <MainPage />
      },
      {
        path: getNavigationValue('tetrobit-stocks.ex-rate'),
        element: <ExRatePage />
      },
      {
        path: getNavigationValue('tetrobit-stocks.converter'),
        element: <ConverterPage />
      },
      {
        path: getNavigationValue('tetrobit-stocks.history'),
        element: <HistoryPage />
      },
      {
        path: getNavigationValue('tetrobit-stocks.login'),
        element: <LoginPage />
      },
      {
        path: getNavigationValue('tetrobit-stocks.signin'),
        element: <SigninPage />
      },
      {
        path: getNavigationValue('tetrobit-stocks.profile'),
        element: <ProfilePage />
      },
      {
        path: getNavigationValue('tetrobit-stocks.transfer'),
        element: <TransferPage />
      },
      {
        path: getNavigationValue('tetrobit-stocks.top-up'),
        element: <TopUpPage />
      },
      {
        path: getNavigationValue('tetrobit-stocks.trade'),
        element: <TradePage />     
      }
    ]
  }
]);
