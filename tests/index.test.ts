import { describe, it, expect, vi } from "vitest";
import { renderHook } from '@testing-library/react';
import { useMemoized } from '../src/index';

describe('useMemoized', () => {
  it('should return the memoized value if dependencies are unchanged', () => {
    const factoryFn = vi.fn(() => 'result');
    const deps = [1, 2];

    const { result, rerender } = renderHook(({ fn, deps }) => useMemoized(fn, deps), {
      initialProps: { fn: factoryFn, deps },
    });

    // Initially calls the factory function and stores the result
    expect(result.current).toBe('result');
    expect(factoryFn).toHaveBeenCalledTimes(1);

    // Rerender with the same dependencies, should not call the factory again
    rerender({ fn: factoryFn, deps });
    expect(result.current).toBe('result');
    expect(factoryFn).toHaveBeenCalledTimes(1);
  });

  it('should compute a new value when dependencies change', () => {
    const factoryFn = vi.fn(() => 'new result');
    const deps = [1, 2];

    const { result, rerender } = renderHook(({ fn, deps }) => useMemoized(fn, deps), {
      initialProps: { fn: factoryFn, deps },
    });

    expect(result.current).toBe('new result');
    expect(factoryFn).toHaveBeenCalledTimes(1);

    // Change dependencies
    rerender({ fn: factoryFn, deps: [3, 4] });
    expect(result.current).toBe('new result');
    expect(factoryFn).toHaveBeenCalledTimes(2);
  });
});