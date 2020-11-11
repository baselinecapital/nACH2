const holidays_2018 = require('./2018');
const holidays_2019 = require('./2019');
const holidays_2020 = require('./2020');
const holidays_2021 = require('./2021');
const holidays_2022 = require('./2022');
const holidays_2023 = require('./2023');
const holidays_2024 = require('./2024');

module.exports = {
    ...holidays_2018,
    ...holidays_2019,
    ...holidays_2020,
    ...holidays_2021,
    ...holidays_2022,
    ...holidays_2023,
    ...holidays_2024
}
