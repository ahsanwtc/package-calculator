import { EXPENSES, PLACEHOLDER, STRINGS, DEFAULT_PRICELIST } from './constants';

export const getNewTravelingArray = ({ days, traveling = [] }) => {
  let result = null;
  const initCost = 5000;
  if (days > 0 && traveling.length !== days) {
    result = Array.apply(null, new Array(days)).map((_, i) => {
      return traveling[i] ? traveling[i] : initCost;
    });
  }
  return result ? result : traveling;
};

export const calculateTotalCost = (items = []) => {
  return items.reduce((cost, current) => {
    return parseInt(cost) + parseInt(current);
  }, 0);
};

// export const calculateExternalCost = ({ days, number, cost }) => parseInt(days) * parseInt(number) * parseInt(cost);
export const calculateExternalCost = ({ expense = [], price = 1 }) => {
  return expense.reduce((total, current) => {
    return total + parseInt(current.value) * parseInt(price);
  }, 0);
};

export const getDispatchParams = ({ name, value }) => {
  const numberRegex = new RegExp(/^[0-9]+$/i);
  if ((name !== undefined && name !== null && name.length > 0) && (numberRegex.test(value) || value.length === 0)) {
    const nameArray = name.split('-');
    const type = nameArray[0];
    let dispatch = '', expense = nameArray[1];
    const index = parseInt(nameArray[2]) - 1;

    switch(type) {
      case 'cost': {
        dispatch = 'updatePricelist';
        break;
      }
      case 'days': {
        dispatch = 'setPackageDays';
        break;
      }
      case 'quantity': {
        if (expense === 'deliverable') {
          expense = nameArray[2];
          dispatch = 'updateDeliverable';
        } else {
          dispatch = 'updateExpense';
        }
        break;
      }
      case 'advance': {
        dispatch = 'payAdvance';
        break;
      }
      default:
        return null;
    }

    return { dispatch, index, expense };
  }

  return null;
};

export const calculateNewExpenseArray = ({ expense, days, property }) => {
  let result = null;
  if (days > 0 && expense.length !== days) {
    result = Array.apply(null, new Array(days)).map((_, i) => {
      return expense[i] ? expense[i] : { 
        label: calculateTags({ expense: property, index: i, type: 'label' }),
        name: calculateTags({ expense: property, index: i, type: 'name' }),
        value: parseInt(getPriceOrQuantity({ expense: property }))
      };
    });
  }
  return result ? result : expense;
};

export const getPriceOrQuantity = ({ expense }) => (expense === EXPENSES.travelling) ? DEFAULT_PRICELIST.travelling : 0;
export const calculateTags = ({ expense, index, type }) => STRINGS[EXPENSES[expense]][type].replace(PLACEHOLDER, index + 1);