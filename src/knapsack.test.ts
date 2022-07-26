import knapsackFactory from './knapsack';

describe('knapsack', () => {
  it.each([
    [
      // weightLimit < each weight
      [
        {
          weight: 100,
          value: 50,
        },
        {
          weight: 120,
          value: 60,
        },
      ],
      10,
      0,
    ],
    // weightLimit = min weight
    [
      [
        {
          weight: 20,
          value: 100,
        },
        {
          weight: 10,
          value: 50,
        },
      ],
      10,
      50,
    ],
    // weightLimit > total weight
    [
      [
        {
          weight: 10,
          value: 35,
        },
        {
          weight: 5,
          value: 20,
        },
        {
          weight: 7,
          value: 15,
        },
      ],
      30,
      70,
    ],
    // weightLimit = total weight
    [
      [
        {
          weight: 10,
          value: 35,
        },
        {
          weight: 25,
          value: 20,
        },
        {
          weight: 25,
          value: 25,
        },
      ],
      60,
      80,
    ],
    // random
    [
      [
        {
          weight: 1,
          value: 1,
        },
        {
          weight: 20,
          value: 15,
        },
        {
          weight: 35,
          value: 20,
        },
        {
          weight: 55,
          value: 50,
        },
        {
          weight: 15,
          value: 20,
        },
      ],
      60,
      51,
    ],
  ])(
    'should match the expected value as a result of the knapsack problem',
    (products, weightLimit, maxValueExpected) => {
      expect.assertions(1);
      const knapsack = knapsackFactory(products);
      expect(knapsack(0, weightLimit)).toStrictEqual(maxValueExpected);
    },
  );
});
