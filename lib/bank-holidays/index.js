const holidays_2018 = require('./2018');
const holidays_2019 = require('./2019');
const holidays_2020 = require('./2020');
const holidays_2021 = require('./2021');
const holidays_2022 = require('./2022');
const holidays_2023 = require('./2023');
const holidays_2024 = require('./2024');

const BANK_TIMEZONE = 'America/Los_Angeles';

const BANK_HOLIDAYS = {
    ...holidays_2018,
    ...holidays_2019,
    ...holidays_2020,
    ...holidays_2021,
    ...holidays_2022,
    ...holidays_2023,
    ...holidays_2024
}

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
function isBankHoliday(value) {
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
    const [ m, d, y ] = formatted.split('/');
    const bankDate = `${y}-${m}-${d}`;

    return BANK_HOLIDAYS.hasOwnProperty(bankDate);
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
    BANK_HOLIDAYS,
    isBankHoliday
}
