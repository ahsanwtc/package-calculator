import { DEFAULT_PRICELIST } from './constants';
import { 
  getNewTravelingArray, calculateTotalCost, calculateExternalCost, getDispatchParams, calculateNewExpenseArray, calculateTags,
  getPriceOrQuantity
} from './functions';

describe('Tests for getNewTravelingArray', () => {
  it('returns an array with length 2 when days = 2', () => {
    const result = getNewTravelingArray({ days: 2, traveling: [] });
    expect(result.length).toEqual(2);
  });
  
  it('returns an array with length 1 when days = 1', () => {
    const result = getNewTravelingArray({ days: 1, traveling: [5000, 5000] });
    expect(result.length).toEqual(1);
  });

  it('returns a bigger array with preserved values which were in traveling array when days increase', () => {
    const result = getNewTravelingArray({ days: 5, traveling: [1000, 4000] });
    expect(result[0]).toEqual(1000);
    expect(result[1]).toEqual(4000);
    expect(result[2]).toEqual(5000);
    expect(result[3]).toEqual(5000);
    expect(result[4]).toEqual(5000);
  });

  it('returns a smaller array with preserved values which were in traveling array when days decereases', () => {
    const result = getNewTravelingArray({ days: 3, traveling: [1000, 4000, 5000, 4000, 1000] });
    expect(result[0]).toEqual(1000);
    expect(result[1]).toEqual(4000);
    expect(result[2]).toEqual(5000);
  });

  it('returns the same traveling if traveling.lenth and days are equal', () => {
    const result = getNewTravelingArray({ days: 3, traveling: [1000, 4000, 5000] });
    expect(result.length).toEqual(3);
    expect(result[0]).toEqual(1000);
    expect(result[1]).toEqual(4000);
    expect(result[2]).toEqual(5000);
  });

});

describe('Tests for calculateTotalCost', () => {
  it('returns correct traveling expense', () => {
    const traveling = [1000, 4000, 5000];
    const result = calculateTotalCost(traveling);
    expect(result).toEqual(10000);
  });
});

describe('Tests for calculateExternalCost', () => {
  it('returns correct travelling expense', () => {
    const expense = [
      { value: 2000, label: 'Cost day 1', name: 'price-travelling-1' },
      { value: 3000, label: 'Cost day 2', name: 'price-travelling-2' },
      { value: 4000, label: 'Cost day 3', name: 'price-travelling-3' }
    ];
    const result = calculateExternalCost({ expense });
    expect(result).toEqual(9000);
  });

  it('returns correct video camera expense', () => {
    const expense = [
      { value: 2 },
      { value: 1 },
      { value: 0 }
    ];
    const result = calculateExternalCost({ expense, price: 5000 });
    expect(result).toEqual(15000);
  });

});


describe('Tests for getDispatchParams', () => {
  it('returns null when number condition fails', () => {
    expect(getDispatchParams({ value: '' })).toBe(null);
    expect(getDispatchParams({ })).toBe(null);
    expect(getDispatchParams({ value: 1 })).toBe(null);
    expect(getDispatchParams({ name: '' })).toBe(null);
    expect(getDispatchParams({ name: '', value: 1 })).toBe(null);
    expect(getDispatchParams({ name: 's', value: 1 })).toBeDefined();
  });
});

describe('Tests for calculateNewExpenseArray', () => {
  it('returns an array with length 3 when days = 3', () => {
    const result = calculateNewExpenseArray({ days: 3, expense: [], property: 'travelling' });
    expect(result.length).toEqual(3);
  });

  it('returns an array with length 1 when days = 1', () => {
    const result = calculateNewExpenseArray({ days: 1, expense: [], property: 'travelling' });
    expect(result.length).toEqual(1);
  });

  it('returns a bigger array with preserved values which were in expense array when days increase', () => {
    const expense = [
      { value: 2000, label: 'Cost day 1', name: 'price-travelling-1' },
      { value: 3000, label: 'Cost day 2', name: 'price-travelling-2' },
      { value: 4000, label: 'Cost day 3', name: 'price-travelling-3' }
    ];
    const result = calculateNewExpenseArray({ days: 5, expense, property: 'travelling' });
    
    expect(result[0]).toEqual(expense[0]);
    expect(result[1]).toEqual(expense[1]);
    expect(result[2]).toEqual(expense[2]);
    expect(result[3]).toEqual({ value: 2000, label: 'Cost day 4', name: 'price-travelling-4' });
    expect(result[4]).toEqual({ value: 2000, label: 'Cost day 5', name: 'price-travelling-5' });
  });

  it('returns a smaller array with preserved values which were in expense array when days decereases', () => {
    const expense = [
      { value: 2000, label: 'Cost day 1', name: 'price-travelling-1' },
      { value: 3000, label: 'Cost day 2', name: 'price-travelling-2' },
      { value: 4000, label: 'Cost day 3', name: 'price-travelling-3' },
      { value: 2000, label: 'Cost day 4', name: 'price-travelling-4' },
      { value: 2000, label: 'Cost day 5', name: 'price-travelling-5' }
    ];
    const result = calculateNewExpenseArray({ days: 3, expense, property: 'travelling' });
    expect(result.length).toEqual(3);
    expect(result[0]).toEqual({ value: 2000, label: 'Cost day 1', name: 'price-travelling-1' });
    expect(result[1]).toEqual({ value: 3000, label: 'Cost day 2', name: 'price-travelling-2' });
    expect(result[2]).toEqual({ value: 4000, label: 'Cost day 3', name: 'price-travelling-3' });
  });

  it('returns the same traveling if traveling.lenth and days are equal', () => {
    const expense = [
      { value: 2000, label: 'Cost day 1', name: 'price-travelling-1' },
      { value: 3000, label: 'Cost day 2', name: 'price-travelling-2' },
      { value: 4000, label: 'Cost day 3', name: 'price-travelling-3' }
    ];
    const result = calculateNewExpenseArray({ days: 3, expense, property: 'travelling' });

    expect(result.length).toEqual(3);
    expect(result[0]).toEqual({ value: 2000, label: 'Cost day 1', name: 'price-travelling-1' });
    expect(result[1]).toEqual({ value: 3000, label: 'Cost day 2', name: 'price-travelling-2' });
    expect(result[2]).toEqual({ value: 4000, label: 'Cost day 3', name: 'price-travelling-3' });
  });
});

describe('Tests for calculateTags', () => {
  it('returns a label', () => {
    const expense = 'travelling', index = 3, type = 'label';
    const label = calculateTags({ expense, index, type });
    expect(label).toEqual('Cost day 4');
  });

  it('returns a name', () => {
    const expense = 'travelling', index = 3, type = 'name';
    const label = calculateTags({ expense, index, type });
    expect(label).toEqual('price-travelling-4');
  });
});

describe('Tests for getPriceOrAmount', () => {
  it('returns price when expense is travelling', () => {
    const price = getPriceOrQuantity({ expense: 'travelling' });
    expect(price).toEqual(DEFAULT_PRICELIST.travelling);
  });

  it('returns quantity when expense is videoCamera', () => {
    const quantity = getPriceOrQuantity({ expense: 'videoCamera' });
    expect(quantity).toEqual(0);
  });
});
