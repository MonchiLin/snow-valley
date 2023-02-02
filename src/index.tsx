export * from './country-input';
export * from './phone-number-input';
export * from './context/theme-provider';
export function multiply(a: number, b: number): Promise<number> {
  return Promise.resolve(a * b);
}
