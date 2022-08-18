/// <reference lib="webworker" />

type FibMessage = {
  fibType: 'MEMOIZED' | 'RECURSIVE';
  position: number;
}

addEventListener('message', (ev: MessageEvent<FibMessage>) => {
  const { data } = ev;

  if (data.fibType === 'MEMOIZED') {
    postMessage(fibMemoized(data.position, {}))
  }
  
  if (data.fibType === 'RECURSIVE') {
    postMessage(fibRecursive(data.position));
  }
  
});

const fibRecursive = (n: number): number => {
  if (n <= 2) return 1;
  return fibRecursive(n - 1) + fibRecursive(n - 2);
};

const fibMemoized = (n: number, memo: { [key: number]: number }): number => {
  if (n in memo) return memo[n];
  if (n <= 2) return 1;
  memo[n] = fibMemoized(n - 1, memo) + fibMemoized(n - 2, memo);
  return memo[n];
};
