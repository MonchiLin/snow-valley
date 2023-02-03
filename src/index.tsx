export * from './designs';
export * from './context';
export * from './base';
export * from './constants';
export * from './escape-hatch';
export * from './utilities';

export function multiply(a: number, b: number): Promise<number> {
  return Promise.resolve(a * b);
}
