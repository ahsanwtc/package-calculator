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

export const calculateExternalCost = ({ days, number, cost }) => parseInt(days) * parseInt(number) * parseInt(cost);