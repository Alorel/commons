export type Nullish = null | undefined;

export function isNullish(v: any): v is Nullish {
  return v == null;
}
