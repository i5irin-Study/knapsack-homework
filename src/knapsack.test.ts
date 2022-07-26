import 'regenerator-runtime/runtime';
import { integerValuesKnapsack } from '@problem-solving/knapsack';
import knapsackFactory, {
  KnapsackError,
  KnapsackErrorType,
  Product,
} from './knapsack';

const createProduct = (index: number): Product => ({
  weight: index + 1,
  value: index + 1,
});

type TestCaseSource = {
  products: Product[];
  weightLimit: number;
  expectedValue: number;
};

const createTestCase = (
  productCount: number,
  weightLimit: number,
  edgeCaseProduct: Product,
): TestCaseSource => {
  const products = [
    edgeCaseProduct,
    ...[...Array(productCount - 1).keys()].map(createProduct),
  ];
  return {
    products,
    weightLimit,
    expectedValue: integerValuesKnapsack(
      products.map((product) => product.value),
      products.map((product) => product.weight),
      products.length,
      weightLimit,
    ),
  };
};

type ErrorTestCaseSource = {
  products: Product[];
  weightLimit: number;
  errorMessage: KnapsackErrorType;
};

const createErrorTestCase = (
  productCount: number,
  weightLimit: number,
  edgeCaseProduct: Product,
  errorMessage: KnapsackErrorType,
): ErrorTestCaseSource => ({
  products: [
    edgeCaseProduct,
    ...[...Array(productCount - 1).keys()].map(createProduct),
  ],
  weightLimit,
  errorMessage,
});

/**
 * PICT Source
 *
 * N:      1,2,3,99,100,101
 * Weight: 0,1,2,999,1000,1001
 * Value:  0,1,2,999,1000,1001
 * W:      0,1,2,9999,10000,10001
 */

describe('without library', () => {
  // manual test cases
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
  // Error testing
  // NOTE: Error Priority N => W => product weight => product value
  it.each([
    // KnapsackError.OutOfProductsCount
    createErrorTestCase(
      1,
      10000,
      {
        weight: 1001,
        value: 1,
      },
      KnapsackError.OutOfProductsCount,
    ),
    createErrorTestCase(
      101,
      2,
      {
        weight: 999,
        value: 0,
      },
      KnapsackError.OutOfProductsCount,
    ),
    createErrorTestCase(
      1,
      0,
      {
        weight: 1,
        value: 999,
      },
      KnapsackError.OutOfProductsCount,
    ),
    createErrorTestCase(
      101,
      9999,
      {
        weight: 1001,
        value: 2,
      },
      KnapsackError.OutOfProductsCount,
    ),
    createErrorTestCase(
      101,
      10000,
      {
        weight: 2,
        value: 1001,
      },
      KnapsackError.OutOfProductsCount,
    ),
    createErrorTestCase(
      1,
      10001,
      {
        weight: 1000,
        value: 1001,
      },
      KnapsackError.OutOfProductsCount,
    ),
    createErrorTestCase(
      101,
      10001,
      {
        weight: 1,
        value: 999,
      },
      KnapsackError.OutOfProductsCount,
    ),
    createErrorTestCase(
      1,
      9999,
      {
        weight: 0,
        value: 0,
      },
      KnapsackError.OutOfProductsCount,
    ),
    createErrorTestCase(
      101,
      1,
      {
        weight: 2,
        value: 1,
      },
      KnapsackError.OutOfProductsCount,
    ),
    createErrorTestCase(
      1,
      2,
      {
        weight: 2,
        value: 2,
      },
      KnapsackError.OutOfProductsCount,
    ),
    createErrorTestCase(
      1,
      2,
      {
        weight: 1,
        value: 1000,
      },
      KnapsackError.OutOfProductsCount,
    ),
    createErrorTestCase(
      101,
      10001,
      {
        weight: 0,
        value: 1000,
      },
      KnapsackError.OutOfProductsCount,
    ),
    createErrorTestCase(
      101,
      9999,
      {
        weight: 1000,
        value: 1000,
      },
      KnapsackError.OutOfProductsCount,
    ),
    createErrorTestCase(
      1,
      1,
      {
        weight: 999,
        value: 2,
      },
      KnapsackError.OutOfProductsCount,
    ),
    createErrorTestCase(
      101,
      0,
      {
        weight: 0,
        value: 0,
      },
      KnapsackError.OutOfProductsCount,
    ),
    // KnapsackError.OutOfWeghtLimit
    createErrorTestCase(
      100,
      10001,
      {
        weight: 1001,
        value: 1000,
      },
      KnapsackError.OutOfWeghtLimit,
    ),
    createErrorTestCase(
      99,
      0,
      {
        weight: 2,
        value: 2,
      },
      KnapsackError.OutOfWeghtLimit,
    ),
    createErrorTestCase(
      3,
      10001,
      {
        weight: 2,
        value: 0,
      },
      KnapsackError.OutOfWeghtLimit,
    ),
    createErrorTestCase(
      100,
      0,
      {
        weight: 1000,
        value: 1,
      },
      KnapsackError.OutOfWeghtLimit,
    ),
    createErrorTestCase(
      3,
      0,
      {
        weight: 1001,
        value: 1001,
      },
      KnapsackError.OutOfWeghtLimit,
    ),
    createErrorTestCase(
      99,
      10001,
      {
        weight: 999,
        value: 2,
      },
      KnapsackError.OutOfWeghtLimit,
    ),
    createErrorTestCase(
      2,
      0,
      {
        weight: 999,
        value: 1000,
      },
      KnapsackError.OutOfWeghtLimit,
    ),
    createErrorTestCase(
      2,
      10001,
      {
        weight: 1000,
        value: 999,
      },
      KnapsackError.OutOfWeghtLimit,
    ),
    createErrorTestCase(
      3,
      10001,
      {
        weight: 999,
        value: 1,
      },
      KnapsackError.OutOfWeghtLimit,
    ),
    createErrorTestCase(
      2,
      0,
      {
        weight: 0,
        value: 1001,
      },
      KnapsackError.OutOfWeghtLimit,
    ),
    // KnapsackError.OutOfProductWeight
    createErrorTestCase(
      2,
      2,
      {
        weight: 0,
        value: 1,
      },
      KnapsackError.OutOfProductWeight,
    ),
    createErrorTestCase(
      3,
      10000,
      {
        weight: 0,
        value: 999,
      },
      KnapsackError.OutOfProductWeight,
    ),
    createErrorTestCase(
      2,
      1,
      {
        weight: 1001,
        value: 0,
      },
      KnapsackError.OutOfProductWeight,
    ),
    createErrorTestCase(
      99,
      2,
      {
        weight: 1001,
        value: 1001,
      },
      KnapsackError.OutOfProductWeight,
    ),
    createErrorTestCase(
      99,
      1,
      {
        weight: 0,
        value: 1000,
      },
      KnapsackError.OutOfProductWeight,
    ),
    createErrorTestCase(
      3,
      9999,
      {
        weight: 1001,
        value: 999,
      },
      KnapsackError.OutOfProductWeight,
    ),
    createErrorTestCase(
      100,
      10000,
      {
        weight: 0,
        value: 2,
      },
      KnapsackError.OutOfProductWeight,
    ),
    // KnapsackError.OutOfProductValue
    createErrorTestCase(
      3,
      1,
      {
        weight: 1,
        value: 1001,
      },
      KnapsackError.OutOfProductValue,
    ),
    createErrorTestCase(
      100,
      9999,
      {
        weight: 999,
        value: 1001,
      },
      KnapsackError.OutOfProductValue,
    ),
    createErrorTestCase(
      100,
      10000,
      {
        weight: 1,
        value: 0,
      },
      KnapsackError.OutOfProductValue,
    ),
    createErrorTestCase(
      99,
      10000,
      {
        weight: 1000,
        value: 0,
      },
      KnapsackError.OutOfProductValue,
    ),
  ])(
    'should throw an expected exception',
    ({ products, weightLimit, errorMessage }) => {
      expect.assertions(1);
      expect(() => {
        const knapsack = knapsackFactory(products);
        knapsack(0, weightLimit);
      }).toThrow(errorMessage);
    },
  );
});

describe('with library', () => {
  it.each([
    createTestCase(99, 9999, { weight: 1, value: 1 }),
    createTestCase(99, 2, { weight: 1000, value: 999 }),
    createTestCase(100, 1, { weight: 999, value: 999 }),
    createTestCase(2, 10000, { weight: 1, value: 2 }),
    createTestCase(2, 9999, { weight: 2, value: 1000 }),
    createTestCase(3, 2, { weight: 999, value: 1000 }),
    createTestCase(3, 1, { weight: 1000, value: 2 }),
    createTestCase(100, 2, { weight: 2, value: 999 }),
    createTestCase(100, 10000, { weight: 999, value: 1000 }),
  ])(
    'should match the expected value as a result of the knapsack problem',
    ({ products, weightLimit, expectedValue }) => {
      expect.assertions(1);
      const knapsack = knapsackFactory(products);
      expect(knapsack(0, weightLimit)).toStrictEqual(expectedValue);
    },
  );
});
