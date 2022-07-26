import knapsackFactory from './knapsack';

function main() {
  const knapsack = knapsackFactory([10, 5, 7], [35, 20, 15]);
  const maxValue = knapsack(0, 20);
  // eslint-disable-next-line no-console
  console.log(maxValue);
}

main();
