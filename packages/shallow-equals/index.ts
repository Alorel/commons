function compareArrays(a: any[], b: any[]): boolean {
  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
}

function isObject<T = any>(v: any): v is (object & { [k: string]: T }) {
  return v !== null && typeof v === 'object';
}

function compareObjectArrays<T extends PropertyKey>(
  a: any,
  b: any,
  arrA: T[],
  arrB: T[]
): boolean {
  if (arrA.length !== arrB.length) {
    return false;
  }

  for (let i = 0; i < arrA.length; i++) {
    if (a[arrA[i] as string] !== b[arrA[i] as string]) {
      return false;
    }
  }

  return true;
}

function compareObjects(a: any, b: any): boolean {
  return compareObjectArrays(a, b, Object.getOwnPropertyNames(a), Object.getOwnPropertyNames(b)) ?
    compareObjectArrays(a, b, Object.getOwnPropertySymbols(a), Object.getOwnPropertySymbols(b)) :
    false;
}

export function shallowEquals(a: any, b: any): boolean {
  if (a === b) {
    return true;
  }

  const aArray = Array.isArray(a);
  const bArray = Array.isArray(b);

  if (aArray && bArray) {
    return compareArrays(a, b);
  } else if ((aArray && !bArray) || (bArray && !aArray)) {
    return false;
  } else if (isObject(a) && isObject(b)) {
    return compareObjects(a, b);
  }

  return false;
}
