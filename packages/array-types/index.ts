export type Arrayish<T> = T[] | readonly T[];

export type NonEmptyArray<T> = [T, ...T[]];

export type OneOrMore<T> = T | Arrayish<T>;
