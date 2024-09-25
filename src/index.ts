import { DependencyList, useMemo, useRef } from "react";

type FactoryFn<T> = () => T;

type MemoryEntry<T> = [DependencyList, T];

export function useMemoized<T>(fn: FactoryFn<T>, deps: DependencyList,): T {
    
  const memory = useRef<MemoryEntry<T>[]>([]);

  return useMemo(() => {
    const existingEntry = memory.current.find(
      ([storedDeps]) =>
        storedDeps.length === deps.length &&
        storedDeps.every((dep, index) => dep === deps[index])
    );

    if (existingEntry) {
      return existingEntry[1];
    }

    const result = fn();
    memory.current.push([deps, result]);

    return result;
  }, deps);
}
