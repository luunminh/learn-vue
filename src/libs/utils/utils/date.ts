import dayjs, { Dayjs, OpUnitType, QUnitType } from 'dayjs';
import { isEmpty } from './validations';

export interface GetFromNowOptions {
  thresholdUnit?: QUnitType | OpUnitType;
  thresholdValue?: number;
  format?: string;
}

export const DateFormat = {
  DEFAULT: 'MM/DD/YYYY',
  MONTH_LONG_DATE_YEAR: 'MMMM DD, YYYY',
  YEAR_MONTH_DATE: 'YYYY-MM-DD',
  MONTH_DATE_YEAR: 'MMM DD, YYYY',
  MONTH_DATE_YEAR_TIME_24: 'MM/DD/YYYY HH:mm',
  MONTH_DATE_YEAR_TIME_12: 'MM/DD/YYYY hh:mm A',
  MONTH_YEAR: 'MM/YY',

  TIME_24: 'HH:mm',
  TIME_12: 'hh:mm A',
  TIME_24_SECOND: 'HH:mm:ss',
  HST_TIMEZONE: 'Pacific/Honolulu',

  TIME_SECOND_12_MONTH_LONG_DATE_YEAR: 'h:mm:ss A, MMMM DD, YYYY',
  MONTH_DATE_YEAR_TIME_SECOND_12: 'MM/DD/YYYY HH:mm:ss A',
  MONTH_DATE_YEAR_TIME_SECOND_24: 'MM/DD/YYYY HH:mm:ss',
  TIME_12_MONTH_DATE_YEAR: 'HH:mm MM-DD-YYYY',
  ISO_FORMAT_WITHOUT_TIMEZONE: 'YYYY-MM-DDTHH:mm:ss.sss',
};

export enum WeekDateEnum {
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
  SUNDAY = 0,
}

export const CURRENT_DATE = dayjs(new Date());

/**
 * Get date display
 * @param {string|date|Dayjs} value
 * @param {string} languageCode
 */
export const getDateDisplay = (value: string, format: string = DateFormat.DEFAULT) =>
  value ? dayjs(value).format(format) : null;

/**
 * Get date display
 * @param {string|date|Dayjs} value
 * @param {string} languageCode
 */
export const getTimeDisplay = (value: string) => dayjs(value).format(DateFormat.TIME_24);

export const formatDate = (
  value: string | number | Date | dayjs.Dayjs,
  format = 'MM/DD/YYYY',
  { initValueFormat = '' } = {},
) => {
  if (isEmpty(value) || (typeof value === 'string' && value === 'null')) return '--';
  if (!isEmpty(initValueFormat)) {
    return dayjs(value, initValueFormat).format(format);
  }

  return dayjs(value).format(format);
};

export const getTimeDisplayFromNow = (value: string) => dayjs(value).fromNow();

/// dayjs has many cases incorrect format with timezone so using moment-timezone for this case
/// Reference issues : https://github.com/iamkun/dayjs/issues/1827
export const localTimeToHawaii = (
  dateTime: Dayjs | Date,
  format = DateFormat.MONTH_DATE_YEAR_TIME_24,
) => {
  if (!dateTime) return null;

  const date = dayjs(dateTime).format(DateFormat.MONTH_DATE_YEAR_TIME_24);
  return dayjs(date, DateFormat.MONTH_DATE_YEAR_TIME_24).tz(DateFormat.HST_TIMEZONE).format(format);
};

export const localTimeToHawaiiTz = (dateTime?: Date | string | Dayjs | undefined) => {
  dayjs.tz.setDefault(DateFormat.HST_TIMEZONE);
  const date = dayjs(dateTime).set('hour', 0).set('minute', 0).set('second', 0);
  return dayjs(date).tz();
};

export const formatDateUtc = (value: Date | string, format = DateFormat.DEFAULT) => {
  if (!value || (typeof value === 'string' && isEmpty(value))) {
    return null;
  }
  return dayjs(value).utc().format(format);
};

export const formatSecondToTimer = (seconds: number, format = DateFormat.TIME_24_SECOND) => {
  if (!seconds) return `${format}`;
  const durationObject = dayjs.duration(seconds, 'seconds');
  const formattedTime = durationObject.format(format);
  return formattedTime;
};

export const getFromNow = (value: string, options?: GetFromNowOptions) => {
  if (!value) return null;

  const {
    thresholdUnit = 'hour',
    thresholdValue = 24,
    format = DateFormat.DEFAULT,
  } = options || {};
  const timeDifference = dayjs().diff(dayjs(value), thresholdUnit, true);
  if (timeDifference > thresholdValue) return dayjs(value).format(format);

  return dayjs(value).fromNow();
};

/**
 * Get timezone offset in minutes
 * @param timezone
 * @returns
 */
export const getTimezoneOffset = (timezone: string) => {
  // Set the timezone
  const now = dayjs().tz(timezone);

  // Get the timezone offset in minutes
  const offset = now.utcOffset();

  return offset;
};

export const isSameDate = (date1: string | Date | Dayjs, date2: string | Date | Dayjs) => {
  if (!date1 || !date2) return false;
  return dayjs(date1).isSame(dayjs(date2), 'day');
};

/**
 * Get week day
 * @param value - string
 * @returns dddd
 */
export const getWeekDay = (value: string) => {
  if (!value) return '';
  return dayjs(value).format('dddd');
};

export const getSpecificDayOfWeek = ({
  extendWeek = 1,
  weekDate = WeekDateEnum.MONDAY,
}: {
  extendWeek?: number;
  weekDate: WeekDateEnum;
}) => {
  // Get the current date
  const today = dayjs();

  // Get the next Monday
  return today.add(extendWeek, 'week').startOf('week').add(weekDate, 'day').startOf('day');
};

export const getSpecificDayOfMonth = ({
  extendMonths = 1,
  monthDate = 0,
}: {
  extendMonths?: number;
  monthDate: WeekDateEnum;
}) => {
  // Get the current date
  const today = dayjs();

  // Get the next Monday
  return today.add(extendMonths, 'month').startOf('month').add(monthDate, 'day').startOf('day');
};

export const getEndDateOfMonth = ({ extendMonths = 1 }: { extendMonths?: number }) => {
  // Get the current date
  const today = dayjs();

  // Get the next Monday
  return today.add(extendMonths, 'month').endOf('month').startOf('day');
};

export const getSpecificDayOfQuarter = ({
  extendQuarters = 1,
  date = 0,
}: {
  extendQuarters?: number;
  date: number;
}) => {
  const today = dayjs();

  const nextQuarter = Math.floor((today.month() + 3 * extendQuarters) / 3);

  return today
    .set('month', nextQuarter * 3)
    .startOf('month')
    .add(date, 'day')
    .startOf('day');
};

export const getDateWithoutTimeZone = (
  date: string | Date,
  formatDate = DateFormat.DEFAULT,
): string => {
  if (!date) return '';

  const utcDate = dayjs.tz(date).toISOString();
  return dayjs(utcDate).format(formatDate);
};

export const isValidDate = (date: Date) => {
  return !isNaN(date?.getTime());
};

export const getUTCDateDisplay = (value: string, format = DateFormat.DEFAULT) => {
  if (!value) return '';

  return dayjs.utc(value).format(format);
};

export const getDateTimeInHawaii = (dateTime?: string | Date) =>
  dayjs(dateTime).tz(DateFormat.HST_TIMEZONE);

export const formatDateTimeInHawaii = (dateTime: string | Date, format = DateFormat.DEFAULT) => {
  if (!dateTime) return null;
  return getDateTimeInHawaii(dateTime).format(format);
};

export const isInRange = ({
  date,
  startDate,
  endDate,
  unit = 'day',
}: {
  date: Date;
  startDate: Date;
  endDate: Date;
  unit?: dayjs.OpUnitType;
}) => dayjs(date).isBetween(startDate, endDate, unit, '[]');

export const getDate = (date: string, format?: dayjs.OptionType) => {
  if (!date) return null;

  const day = dayjs.utc(date).get('date'); // Day (1-based)
  const month = dayjs.utc(date).get('month'); // Month (0-based)
  const year = dayjs.utc(date).get('year'); // Year (4-digit)

  /**
   * Set the day last to prevent month overflow.
   * @example "2023-10-31T00:00:00.000Z" will become "01/10/2023" if the date is set first.
   *
   * Setting the date first can cause overflow if the day exceeds the days in the current month.
   * Setting the month and year after prevents this issue.
   */
  return dayjs().set('year', year).set('month', month).set('date', day).toDate();
};
