export type Retype<O extends object, T> = {
  [K in keyof O]: T;
};
