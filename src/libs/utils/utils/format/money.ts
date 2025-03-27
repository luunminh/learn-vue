export type FormatMoneyOptionsType = {
  defaultValue: string;
  style: string;
  currency: string;
  maximumFractionDigits: number;
  minimumFractionDigits: number;
};

export const moneyReg = /[\d,]+\.{0,1}\d{0,}/;

export const isMoneyInputFormat = (value: number | string) => `${value}`.match(moneyReg)?.[0] || '';

export const convertCurrencyInputToString = (value: string) => value.replace(/[^0-9.-]+/g, '');

export const formatMoney = (value: number, options?: Partial<FormatMoneyOptionsType>) => {
  const {
    defaultValue = '',
    currency = 'USD',
    maximumFractionDigits = 2,
    minimumFractionDigits = 2,
    style = 'currency',
  } = options || {};

  if (isNaN(value)) return defaultValue;

  return value.toLocaleString('en-US', {
    style: style as any,
    currency,
    maximumFractionDigits,
    minimumFractionDigits,
  });
};

/**
 * Parses a currency input string and returns the numeric value.
 *
 * @example
 * parseCurrencyInput('$1,000.00'); // returns 1000
 *
 * @param {string} value - The currency string to parse.
 * @returns {number} The numeric value of the currency input.
 */
export const parseCurrencyInput = (value: string) => {
  const cleanedValue = value.replace('$', '').replace(/,/g, '').trim();
  return parseFloat(cleanedValue || '0');
};
