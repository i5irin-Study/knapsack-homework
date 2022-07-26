export type Product = {
  weight: number;
  value: number;
};

export const KnapsackError = {
  OutOfProductsCount: 'n out of range.',
  OutOfProductValue: 'value out of range.',
  OutOfProductWeight: 'weight out of range.',
  OutOfWeghtLimit: 'W out of range.',
} as const;
export type KnapsackErrorType =
  typeof KnapsackError[keyof typeof KnapsackError];

export default function knapsackFactory(weights: number[], values: number[]) {
  const products: Product[] = weights.map((weight, index) => ({
    weight,
    value: values[index],
  }));
  if (products.length <= 1 || products.length > 100) {
    throw new Error(KnapsackError.OutOfProductsCount);
  }
  const cache: number[][] = [...Array(products.length)].map(() => []);
  // Returns the value if the item was selected or not selected, whichever is more expensive.
  return function knapsack(depth: number, space: number): number {
    if (depth === 0 && (space < 1 || space > 10000)) {
      throw new Error(KnapsackError.OutOfWeghtLimit);
    }
    // No products exist to select
    if (depth >= products.length) {
      return 0;
    }
    if (cache[depth][space] !== undefined) {
      return cache[depth][space];
    }
    const { weight, value } = products[depth];
    if (weight < 1 || weight > 1000) {
      throw new Error(KnapsackError.OutOfProductWeight);
    }
    if (value < 1 || value > 1000) {
      throw new Error(KnapsackError.OutOfProductValue);
    }
    if (space < weight) {
      // This product is not selected because it is overweight
      const overweightResult = knapsack(depth + 1, space);
      cache[depth][space] = overweightResult;
      return overweightResult;
    }
    // Whether to choose this product or not
    const result = Math.max(
      knapsack(depth + 1, space - weight) + value,
      knapsack(depth + 1, space),
    );
    cache[depth][space] = result;
    return result;
  };
}
