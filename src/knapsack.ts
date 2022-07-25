export type Product = {
  weight: number;
  value: number;
};

export default function knapsackFactory(products: Product[]) {
  // Returns the value if the item was selected or not selected, whichever is more expensive.
  return function knapsack(depth: number, space: number): number {
    // No products exist to select
    if (depth >= products.length) {
      return 0;
    }
    const { weight, value } = products[depth];
    if (space < weight) {
      // This product is not selected because it is overweight
      return knapsack(depth + 1, space);
    }
    // Whether to choose this product or not
    return Math.max(
      knapsack(depth + 1, space - weight) + value,
      knapsack(depth + 1, space),
    );
  };
}
