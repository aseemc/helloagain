import React from 'react';
import { Provider } from 'react-redux';

import Main from './src'
import store from './src/store';

export default () => (
  <Provider store={store}>
    <Main />
  </Provider>
);
