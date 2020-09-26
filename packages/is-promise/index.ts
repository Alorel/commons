export function isPromise<T = any>(v: any): v is Promise<T> {
  return !!v && typeof v.then === 'function' && typeof v.catch === 'function';
}
