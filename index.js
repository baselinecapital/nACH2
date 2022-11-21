module.exports.Entry = require('./lib/entry');
module.exports.Batch = require('./lib/batch');
module.exports.File  = require('./lib/file');
module.exports.Utils  = require('./lib/utils');
module.exports.Validate  = require('./lib/validate');

const holidayUtils = require('./lib/bank-holidays/utils');

module.exports.isBankHoliday = holidayUtils.isBankHoliday;
module.exports.isBankWorkingDay = holidayUtils.isBankWorkingDay;
module.exports.addBusinessDays = holidayUtils.addBusinessDays;
