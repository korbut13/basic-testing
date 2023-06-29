// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: -5, b: -5, action: Action.Subtract, expected: 0 },
  { a: 0, b: 2, action: Action.Subtract, expected: -2 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 15, b: 3, action: Action.Divide, expected: 5 },
  { a: 1, b: 1, action: Action.Multiply, expected: 1 },
  { a: 0, b: 1, action: Action.Multiply, expected: 0 },
  { a: 10, b: 10, action: Action.Multiply, expected: 100 },
  { a: 10, b: 1, action: Action.Exponentiate, expected: 10 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 5, b: 5, action: Action.Exponentiate, expected: 3125 },
  { a: 5, b: 5, action: Action.Exponentiate, expected: 3125 },
  { a: 5, b: 5, action: '5', expected: null },
  { a: 'hello', b: 'world', action: Action.Add, expected: null },

];

describe('simpleCalculator', () => {
  test.each(testCases)('simpleCalculator($a, $b, $action)', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});
