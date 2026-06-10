import { useEffect, useState } from "react";

/**
 * Returns `value` after it has remained unchanged for `delay` ms.
 * Useful for debouncing fast-changing inputs (e.g. search boxes)
 * before triggering expensive side-effects like API calls.
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
};
