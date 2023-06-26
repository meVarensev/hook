import { useCallback, useState } from "react";
import { localStorageWrapper, sessionStorageWrapper } from "./storage";
import { useLatest } from "./use-latest";

type AnyFunction = (...args: any[]) => any;

function isFunction(val: unknown): val is AnyFunction {
  return typeof val === "function";
}

export function useLocalStorageState<T>(
  key: string,
  initalValue: T | (() => T)
) {
  const [value, setValue] = useState(() => {
    const savedValue = localStorageWrapper.get<T>(key);

    if (typeof savedValue !== "undefined") {
      return savedValue;
    }

    return isFunction(initalValue) ? initalValue() : initalValue;
  });

  const latestValue = useLatest(value);

  const updateValue = useCallback(
    (newValue: React.SetStateAction<T>) => {
      setValue(newValue);

      const actualValue = isFunction(newValue)
        ? newValue(latestValue.current)
        : newValue;

      localStorageWrapper.set(key, actualValue);
    },
    [key, latestValue]
  );

  return [value, updateValue] as const;
}

export function useSessionStorageState<T>(
  key: string,
  initalValue: T | (() => T)
) {
  const [value, setValue] = useState(() => {
    const savedValue = sessionStorageWrapper.get<T>(key);

    if (typeof savedValue !== "undefined") {
      return savedValue;
    }

    return isFunction(initalValue) ? initalValue() : initalValue;
  });

  const latestValue = useLatest(value);

  const updateValue = useCallback(
    (newValue: React.SetStateAction<T>) => {
      setValue(newValue);

      const actualValue = isFunction(newValue)
        ? newValue(latestValue.current)
        : newValue;

      sessionStorageWrapper.set(key, actualValue);
    },
    [key, latestValue]
  );

  return [value, updateValue] as const;
}
