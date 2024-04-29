import { useDebounceFn } from "@vueuse/core";

export function useTryMany(fn: () => any, delay = 500, limit = 5) {
  let count = 0;
  const resetCount = useDebounceFn(() => {
    count = 0;
  }, delay);
  function trytodo() {
    if (count >= limit) {
      fn();
      resetCount();
      return;
    }
    count++;
    resetCount();
  }
  return {
    trytodo,
  };
}
