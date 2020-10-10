export type Arrayish<T> = T[] | readonly T[];

export type NonEmptyArray<T> = [T, ...T[]];

export type OneOrMore<T> = T | Arrayish<T>;

export type ArrayElemType<T extends Arrayish<any>> = T[0];
