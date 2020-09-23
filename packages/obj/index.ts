export interface Obj<T = any> {
  [key: string]: T;
}

export interface NumObj<T = any> {
  [index: number]: T;
}

export type AnyObj<S = any, N = S> = Obj<S> & NumObj<N>;
