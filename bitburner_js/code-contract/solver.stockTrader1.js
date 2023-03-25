import {getMaxGain} from './solver.stockTrader4.js';

export const name='Algorithmic Stock Trader I';
export const slug='stockTrader1';

/** @arg {number[]} input */
export function solve(input) {
  return getMaxGain(input,1);
}

/** @arg {string[]} lines */
export function textSolve(lines) {
  const input=lines[2].trim();
  const parsed=JSON.parse(`[${input}]`);
  const res=solve(parsed);
  return res;
}

export const tests=[
  // See stockTrader4.js
];
