'use client';

import { useCallback, useSyncExternalStore } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const getSnapshot = useCallback(() => {
    if (typeof window === 'undefined') {
      return JSON.stringify(initialValue);
    }

    const storedValue = window.localStorage.getItem(key);

    return storedValue ?? JSON.stringify(initialValue);
  }, [key, initialValue]);

  const getServerSnapshot = useCallback(
    () => JSON.stringify(initialValue),
    [initialValue]
  );

  const value = useSyncExternalStore(
    (onStoreChange) => {
      const handleStorageChange = (event: StorageEvent) => {
        if (event.key === key) {
          onStoreChange();
        }
      };

      window.addEventListener('storage', handleStorageChange);

      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    },
    getSnapshot,
    getServerSnapshot
  );

  const setValue = useCallback(
    (newValue: T | ((prevValue: T) => T)) => {
      const currentValue = JSON.parse(getSnapshot()) as T;

      const valueToStore =
        newValue instanceof Function
          ? newValue(currentValue)
          : newValue;

      window.localStorage.setItem(key, JSON.stringify(valueToStore));

      window.dispatchEvent(new StorageEvent('storage', { key }));
    },
    [key, getSnapshot]
  );

  const parsedValue = JSON.parse(value) as T;

  return [parsedValue, setValue] as const;
}