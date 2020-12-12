import { configureStore } from '@reduxjs/toolkit';

import reducer from './reducer';
import { Actions as AppActions, Selectors as AppSelectors } from './app';

export const Application = {
  Actions: AppActions,
  Selectors: AppSelectors
};

const store = configureStore({
  reducer,
});

export default store;