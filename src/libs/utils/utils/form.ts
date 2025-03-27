import _ from 'lodash';
import { deepKeys } from '..';

export const getErrorMessage = (
  fieldName: string,
  { touched, errors }: { touched: any; errors: any },
) => {
  if (!fieldName || !touched || !errors) return '';

  const error = _.get(errors, fieldName);

  return _.get(touched, fieldName) && error ? error : '';
};

export const deepKeysHookFormErrors = (t: unknown, path: string[] = []) => {
  const res: string[] = deepKeys(t, path);

  const filteredRes = res.reduce((output: string[], item) => {
    if (/\d$/.test(item)) {
      return output;
    }

    const replacedItem = item.replace(/(\.type|\.message|\d)$/, '');

    output.push(replacedItem);

    return output;
  }, []);

  return [...new Set(filteredRes)];
};

export const formatOptionalField = <T>(
  field: T | undefined | null,
  defaultValue?: any,
): T | null => {
  return field || defaultValue;
};

export const processOptionalFields = <T = any>(
  obj: Record<string, any>,
  defaultValue?: any,
  byPassKeys?: string[],
): T => {
  return Object.keys(obj).reduce((acc, key) => {
    const isByPass = byPassKeys?.includes(key);
    acc[key] = isByPass ? obj[key] : formatOptionalField(obj[key], defaultValue);
    return acc;
  }, {} as Record<string, any>) as T;
};

export const getChangedFormKeys = <T extends Record<string, any>>(
  defaultValues: T,
  formValues: T,
  parentKey = '',
): string[] => {
  const keys: string[] = [];

  Object.keys(defaultValues).forEach((field) => {
    const defaultValue = defaultValues[field];
    const formValue = formValues[field];
    const newKey = parentKey ? `${parentKey}.${field}` : field;

    if (typeof defaultValue === 'object' && defaultValue !== null && !Array.isArray(defaultValue)) {
      keys.push(...getChangedFormKeys(defaultValue, formValue, newKey));
    } else if (defaultValue !== formValue) {
      keys.push(newKey);
    }
  });

  return keys;
};
