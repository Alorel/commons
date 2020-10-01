export function returnDefault<T>(input: { default: T }): T {
  return input.default;
}
