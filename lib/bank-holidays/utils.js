const BANK_HOLIDAYS = require('./index');

const BANK_TIMEZONE = 'America/Los_Angeles';

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
 * @return {boolean}
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

module.exports = {
    isBankHoliday,
    isWeekend
}
