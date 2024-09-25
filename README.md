# React useMemoized
`useMemoized` is a React hook designed for cases where heavy computations rely on complex dependency arrays. Unlike `useMemo`, it caches and returns values based on the memoized state of dependency arrays, making it ideal for scenarios where you need to avoid recalculating expensive results.

## Features
- Memoizes results based on the exact state of dependency arrays.
- Lightweight, no dependecies

## When Not to Use
Avoid using `useMemoized` for simple calculations, as it can increase memory usage unnecessarily due to caching. Use it only when the performance benefits outweigh the additional memory overhead.

## Installation
Install via pnpm, npm, or yarn:
```
npm i react-use-memoized
```


## Usage
```jsx
import { useMemoized } from 'react-use-memoized';

const MyComponent = () => {
  const memoizedValue = useMemoized(() => {
    // Your heavy calculation here
  }, [dependency1, dependency2]);

  return <div>{memoizedValue}</div>;
};

```