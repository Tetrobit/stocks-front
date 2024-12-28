import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ExRatePage from '../ex_rate';
import HistoryPage from '../history';
import ConverterPage from '../converter';
import MainPage from './components/page';
import { getNavigationValue } from '@brojs/cli';
import Layout from './components/layout';

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
      }
    ]
  }
]);
