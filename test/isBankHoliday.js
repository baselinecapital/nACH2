var chai     = require('chai'),
    expect   = chai.expect,
    moment   = require('moment'),
    utils  = require('../lib/bank-holidays/utils');

describe('isBankHoliday', function() {

    it('should return TRUE if given Date object represents a bank holiday', function () {

        expect(utils.isBankHoliday(new Date('2020-07-04T06:59:59.999Z'))).to.equal(false);
        expect(utils.isBankHoliday(new Date('2020-07-04T07:00:00.000Z'))).to.equal(true);
        expect(utils.isBankHoliday(new Date('2020-07-05T06:59:59.999Z'))).to.equal(true);
        expect(utils.isBankHoliday(new Date('2020-07-05T07:00:00.000Z'))).to.equal(false);

        expect(utils.isBankHoliday(new Date('2020-11-11T07:59:59.999Z'))).to.equal(false);
        expect(utils.isBankHoliday(new Date('2020-11-11T08:00:00.000Z'))).to.equal(true);
        expect(utils.isBankHoliday(new Date('2020-11-12T07:59:59.999Z'))).to.equal(true);
        expect(utils.isBankHoliday(new Date('2020-11-12T08:00:00.000Z'))).to.equal(false);

        expect(utils.isBankHoliday(new Date('2020-11-26T08:00:00.000Z'))).to.equal(true);
        expect(utils.isBankHoliday(new Date('2020-11-27T07:59:59.999Z'))).to.equal(true);
        expect(utils.isBankHoliday(new Date('2020-11-27T08:00:00.000Z'))).to.equal(false);

        expect(utils.isBankHoliday(new Date('2020-12-25T08:00:00.000Z'))).to.equal(true);
        expect(utils.isBankHoliday(new Date('2020-12-26T07:59:59.999Z'))).to.equal(true);
        expect(utils.isBankHoliday(new Date('2020-12-26T08:00:00.000Z'))).to.equal(false);
    });

    it('should throw error if not a Date object is passed', function () {
        expect(function () {
            utils.isBankHoliday(null);
        }).to.throw(`isHoliday function expects a Date object, but got null (object)`);
    })

    it('should throw error if not a Date object is passed', function () {
        expect(function () {
            utils.isBankHoliday('somestring');
        }).to.throw(`isHoliday function expects a Date object, but got somestring (string)`);
    })
})
