import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { EXPENSES, DEFAULT_PRICELIST } from '../constants';
import { calculateNewExpenseArray } from '../functions';

const initExpenses = days => {
  const expenses = {};
  for (const expense of Object.keys(EXPENSES)) {
    expenses[expense] = calculateNewExpenseArray({ expense: [], days, property: expense });
  }
  return expenses;
};

const slice = createSlice({
  name: 'app',
  initialState: {
    pricelist: { ...DEFAULT_PRICELIST },
    packageDays: { value: 1, label: 'Number of Days', name: 'days-packageDays' },
    ...initExpenses(1),
    deliverables: {
      usb: 1,
      album: 1
    }
  },
  reducers: {
    packageDaysUpdated: (app, action) => {
      const { payload: { value }} = action;
      const days = parseInt(value);
      app.packageDays.value = days;
      for (const expense of Object.keys(EXPENSES)) {
        app[expense] = calculateNewExpenseArray({ expense: app[expense], days, property: expense });
      }

    },
    expenseUpdated: (app, action) => {
      const { payload: { expense, index, value }} = action;
      if (app.hasOwnProperty(expense)) {
        if (app[expense][index]) {
          app[expense][index].value = parseInt(value);
        }
      }
    },
    deliverablesUpdated: (app, action) => {
      const { payload: { expense, value }} = action;
      app.deliverables[expense] = parseInt(value);
    }
  }
});

const { packageDaysUpdated, expenseUpdated, deliverablesUpdated } = slice.actions;
export default slice.reducer;

const setPackageDays = ({ value }) => packageDaysUpdated({ value });
const updateExpense = ({ expense, value, index }) => expenseUpdated({ expense, value, index });
const updateDeliverable = ({ expense, value }) => deliverablesUpdated({ expense, value });

export const Actions = {
  updateExpense,
  setPackageDays,
  updateDeliverable
};

const appSelector = state => state.entities.app;

const getPackageDays = createSelector(
  appSelector,
  app => app.packageDays
);

const getPricelist = createSelector(
  appSelector,
  app => app.pricelist
);

const getTravelling = createSelector(
  appSelector,
  app => app.travelling
);

const getExpense = expense => createSelector(
  appSelector,
  app => app[expense]
);

const getDeliverables = createSelector(
  appSelector,
  app => app.deliverables
);

export const Selectors = {
  getExpense,
  getPricelist,
  getTravelling,
  getPackageDays,
  getDeliverables,
};