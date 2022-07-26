declare module '@problem-solving/knapsack' {
  // eslint-disable-next-line import/prefer-default-export
  export function integerValuesKnapsack(
    v: Array<number>,
    w: Array<number>,
    n: number,
    W: number,
    V?: number,
    m?: Array<Array<number>>,
  ): number;
}
