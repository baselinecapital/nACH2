const moment = require('moment');
const BANK_HOLIDAYS = require('./index');

const BANK_TIMEZONE = 'America/Los_Angeles';
const BANK_START_OF_DAY = '08:00:00';

/**
 * This function accepts a Date, timestamp, or ISO8601 string
 * and returns true if given datetime represents a bank holiday
 *
 * This function DOES NOT accept date in YYYY-MM-DD format IN PURPOSE
 * because date 2020-07-04 in UTC is NOT a bank holiday yet in America/Los_Angeles
 * because 2020-07-04 00:00 UTC it is 2020-07-03 16:00 PDT (previous day)
 * to avoid confusion and misunderstanding only FULL date is accepted (date and time)
 *
 * @param {Date|number|string} value - Date, timestamp or ISO8601 string
 * @return {string} YYYY-MM-DD representaton of the date in BANK_TIMEZONE
 */
function getBankDate(value) {
    if (!(isDate(value) || isTimestamp(value) || isISO8601String(value))) {
        throw new Error(`isHoliday function expects a Date object, but got ${value} (${typeof value})`)
    }

    const options = {
        timeZone: BANK_TIMEZONE,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    };

    // formatted date will be in mm/dd/yyyy format
    const formatted = new Intl.DateTimeFormat('en-US', options).format(value);
    const [m, d, y] = formatted.split('/');

    // we need bankDate in yyyy-mm-dd format
    return `${y}-${m}-${d}`;
}

function isDate(value) {
    return value instanceof Date;
}

function isTimestamp(value) {
    try {
        return typeof value === 'number' && new Date(value).valueOf() === value;
    } catch (err) {
        return false;
    }
}

function isISO8601String(value) {
    try {
        return typeof value === 'string' && new Date(value).toISOString() === value;
    } catch (err) {
        return false;
    }
}

function isBankHoliday(value) {
    const bankDate = getBankDate(value);

    return BANK_HOLIDAYS.hasOwnProperty(bankDate);
}

function isWeekend(value) {
    const bankDate = getBankDate(value);

    if (new Date(bankDate).getDay() === 6) return true; // Saturday
    if (new Date(bankDate).getDay() === 0) return true; // Sunday

    return false;
}

function isBankWorkingDay(value) {
    return !isWeekend(value) && !isBankHoliday(value);
}

/**
 * Adds @cnt_business_days_to_add to the given @date
 *
 * For example
 *
 * if cnt_business_days_to_add is 1
 * then:
 * - monday + 1 business day = tuesday
 * - tuesday + 1 business day = wednesday
 * - wednesday + 1 business day = thursday
 * - thursday + 1 business day = friday
 * - friday + 1 business day = monday
 * - saturday + 1 business day = tuesday
 * - sunday + 1 business day = tuesday
 *
 * if cnt_business_days_to_add is 2
 * then:
 * - monday + 2 business days = wednesday
 * - tuesday + 2 business days = thursday
 * - wednesday + 2 business days = friday
 * - thursday + 2 business days = monday
 * - friday + 2 business days = tuesday
 * - saturday + 2 business days = wednesday
 * - sunday + 2 business days = wednesday
 *
 * if cnt_business_days_to_add is 3
 * then:
 * - monday + 3 business days = thursday
 * - tuesday + 3 business days = friday
 * - wednesday + 3 business days = monday
 * - thursday + 3 business days = tuesday
 * - friday + 3 business days = wednesday
 * - saturday + 3 business days = thursday
 * - sunday + 3 business days = thursday
 *
 * @param {string|Date|timestamp} date as ISO8601 string
 * @param {number} cnt_business_days_to_add
 * @return {string} date as ISO8601 string
 */
function addBusinessDays(date, cnt_business_days_to_add) {
    let result = moment.utc(date);

    // if @date is a weekend or holiday
    // we should start counting from beginning of next working day
    if (!isBankWorkingDay(result.toDate())) {
        result = moment.utc(getStartOfNextWorkday(date))
    }

    // add @cnt_business_days_to_add to that date
    while (cnt_business_days_to_add > 0) {
        result.add(1, 'day');
        if (isBankWorkingDay(result.toDate())) {
            cnt_business_days_to_add--;
        }
    }

    return result.toISOString();
}

/**
 * If today is a holiday or weekend, this function returns beginning of the next closest business day
 * For example, if now is saturday or sunday it returns 8AM of monday
 *
 * @param date as ISO8601 string
 * @return date as ISO8601 string
 */
function getStartOfNextWorkday(date) {
    const result = moment.utc(date);
    const [ hour, minute, second ] = BANK_START_OF_DAY.split(':')

    // add 1 day until working day is found
    while (!isBankWorkingDay(result.toDate())) {
        result.add(1, 'day').set({ hour: 8, minute, second, 'millisecond': 0 });
    }

    return result.toISOString();
}

module.exports = {
    isBankHoliday,
    isBankWorkingDay,
    addBusinessDays
}
