import React from 'react';
import Main from './container/main';

import './styles/font.css';
import { Provider } from 'react-redux';
import { store } from './store';

const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  )
};

export default App;