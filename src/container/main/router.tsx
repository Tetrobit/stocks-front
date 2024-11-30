import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ListPage from '../list/list';
import DetailPage from '../detail';
import { getNavigationsValue } from '@brojs/cli';
import Layout from './components/layout';

export const router = createBrowserRouter([
  {
    path: getNavigationsValue('tetrobit-stocks.main'),
    element: <Layout />,
    children: [
      {
        path: getNavigationsValue('tetrobit-stocks.main'),
        element: <ListPage />
      },
      {
        path: getNavigationsValue('tetrobit-stocks.describe'),
        element: <DetailPage />
      }
    ]
  }
]);
