import { add } from './example';

describe('add function', () => {
  it('should add two numbers correctly', () => {
    expect(add(1, 2)).toBe(3);
  });

  it('should return zero when adding zero to zero', () => {
    expect(add(0, 0)).toBe(0);
  });

  it('should handle negative numbers correctly', () => {
    expect(add(-1, 1)).toBe(0);
    expect(add(-5, -5)).toBe(-10);
  });
});
