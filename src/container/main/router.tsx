
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ListPage from '../list/list';
import DetailPage from '../detail';
import { getNavigationsValue } from '@brojs/cli';
import Layout from './components/layout';

export const router = createBrowserRouter([
  {
    path: getNavigationsValue('project.main'),
    element: <Layout />,
    children: [
      {
        path: getNavigationsValue('project.main'),
        element: <ListPage />
      },
      {
        path: getNavigationsValue('project.detail'),
        element: <DetailPage />
      }
    ]
  }
]);