export interface LazyValueFactory<T> {

  /** Reset the computed value */
  reset(): void;

  /** Compute the value */
  (): T;
}

/** Compute a value lazily */
export function lazyValue<T>(factory: () => T): LazyValueFactory<T> {
  let computed = false;
  let output: T;

  function lazyValueExecutor(): T {
    if (computed) {
      return output;
    }

    output = factory();
    computed = true;

    return output;
  }

  lazyValueExecutor.reset = (): void => {
    computed = false;
    output = null as any;
  };

  return lazyValueExecutor;
}
