import knapsackFactory, { Product } from './knapsack';

function main() {
  const products: Product[] = [
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
  ];
  const knapsack = knapsackFactory(products);
  const maxValue = knapsack(0, 20);
  // eslint-disable-next-line no-console
  console.log(maxValue);
}

main();
