export type Comparator<T> = (a: T, b: T) => boolean;

export type OptionalComparator<T> = Comparator<T | undefined>;

export type NullableComparator<T> = Comparator<T | null>;

export type NullishComparator<T> = Comparator<T | null | undefined>;
