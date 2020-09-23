/** Base closeable type */
export interface BaseCloseable {

  /**
   * @see {@link Closeable}
   * @see {@link AsyncCloseable}
   */
  readonly closed: boolean;
}

/** Indicates that the object has synchronous cleanup operations to perform. */
export interface Closeable extends BaseCloseable {

  /**
   * Close any resources associated with this instance. Noop if already closed.
   * @return true if it wasn't closed prior to calling this method, false if it was
   */
  close(): boolean;
}

/** Indicates that the object has asynchronous cleanup operations to perform. */
export interface AsyncCloseable extends BaseCloseable {

  /**
   * Close any resources associated with this instance. Noop if already closed.
   * @return A promise resolving to true if it wasn't closed prior to calling this method, false if it was.
   */
  close(): Promise<boolean>;
}
