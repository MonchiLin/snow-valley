import { isInteger, isNumber, isNumberAllowDotEnd } from './regex';
describe('isInteger', () => {
  it('123 is an integer', () => {
    expect(isInteger('123')).toBe(true);
  });

  it('-456 is an integer', () => {
    expect(isInteger('-456')).toBe(true);
  });

  it('0 is an integer', () => {
    expect(isInteger('0')).toBe(true);
  });

  it('1.23 is not an integer', () => {
    expect(isInteger('1.23')).toBe(false);
  });

  it('abc is not an integer', () => {
    expect(isInteger('abc')).toBe(false);
  });
});

describe('isNumberAllowDotEnd', () => {
  it('123 is a number', () => {
    expect(isNumberAllowDotEnd('123')).toBe(true);
  });

  it('-456 is a number', () => {
    expect(isNumberAllowDotEnd('-456')).toBe(true);
  });

  it('1.23 is a number', () => {
    expect(isNumberAllowDotEnd('1.23')).toBe(true);
  });

  it('1. is a number', () => {
    expect(isNumberAllowDotEnd('1.')).toBe(true);
  });

  it('abc is not a number', () => {
    expect(isNumberAllowDotEnd('abc')).toBe(false);
  });
});

describe('isNumber', () => {
  it('123 is a number', () => {
    expect(isNumber('123')).toBe(true);
  });

  it('-456 is a number', () => {
    expect(isNumber('-456')).toBe(true);
  });

  it('1.23 is a number', () => {
    expect(isNumber('1.23')).toBe(true);
  });

  it('1.1111 is a number', () => {
    expect(isNumber('1.1111')).toBe(true);
  });

  it('abc is not a number', () => {
    expect(isNumber('abc')).toBe(false);
  });
});
