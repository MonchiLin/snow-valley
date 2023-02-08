/**
 * 用正则表达式判断某个数是否为整数
 * @param num
 */
export const isInteger = (num: string) => {
  return /^-?\d+$/.test(num);
};

/**
 * 用正则表达式判断某个字符串是否是数字
 * 这个数字可以包含负号和小数, 但是不能包含正数
 * 允许最后以小数点结尾
 * @param num
 */
export const isNumberAllowDotEnd = (num: string) => {
  return /^-?\d+(\.\d+)?$/.test(num) || /^-?\d+\.$/.test(num);
};

/**
 * 用正则表达式判断某个字符串是否是数字这个数字可以包含负号和小数
 * 并且还允许接受一个参数来表示验证小数位多长, 这个参数默认为 4
 * @param num
 * @param decimalLength
 */
export const isNumber = (num: string, decimalLength = 4) => {
  return new RegExp(`^-?\\d+(\\.\\d{1,${decimalLength}})?$`).test(num);
};
