import { 
  getNewTravelingArray, calculateTotalCost, calculateExternalCost
} from './functions';

describe('Tests for getNewTravelingArray', () => {
  it('returns an array with length 3 when days = 2', () => {
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
  it('returns correct camera expense', () => {
    const days = 3, number = 3, cost = 5000;
    const result = calculateExternalCost({ days, number, cost });
    expect(result).toEqual(45000);
  });
});