var chai     = require('chai'),
    expect   = chai.expect,
    { addBusinessDays }  = require('../lib/bank-holidays/utils');

describe('addBusinessDays', function() {

    const TIME = `16:00:00.000Z`
    const START_OF_DAY = `08:00:00.000Z`

    describe('if cnt_business_days_to_add is 0', function() {
        describe('if today is a working day', function() {
            it('should return today', function () {
                // Nov 8 -> Nov 8
                expect(addBusinessDays(`2022-11-08T${TIME}`, 0)).to.equal(`2022-11-08T${TIME}`);
                // Nov 9 -> Nov 9
                expect(addBusinessDays(`2022-11-09T${TIME}`, 0)).to.equal(`2022-11-09T${TIME}`);
                // Nov 10 -> Nov 10
                expect(addBusinessDays(`2022-11-10T${TIME}`, 0)).to.equal(`2022-11-10T${TIME}`);
                // Nov 14 -> Nov 14
                expect(addBusinessDays(`2022-11-14T${TIME}`, 0)).to.equal(`2022-11-14T${TIME}`);
                // Nov 15 -> Nov 15
                expect(addBusinessDays(`2022-11-15T${TIME}`, 0)).to.equal(`2022-11-15T${TIME}`);
            })
        })
        describe('if today is NOT a working day', function() {
            it('should return "start of the next working day"', function () {
                // Nov 11 (bank holiday) -> Nov 14, start of day
                expect(addBusinessDays(`2022-11-11T${TIME}`, 0)).to.equal(`2022-11-14T${START_OF_DAY}`);
                // Nov 12 (weekend) -> Nov 14, start of day
                expect(addBusinessDays(`2022-11-12T${TIME}`, 0)).to.equal(`2022-11-14T${START_OF_DAY}`);
                // Nov 13 (weekend) -> Nov 14, start of day
                expect(addBusinessDays(`2022-11-13T${TIME}`, 0)).to.equal(`2022-11-14T${START_OF_DAY}`);
            });
        })
    })

    describe('if cnt_business_days_to_add is 1', function() {
        describe('if today is a working day', function() {
            describe('and tomorrow is a working day', function() {
                it('should return +24 hours from now', function () {
                    // Nov 7 -> Nov 8
                    expect(addBusinessDays(`2022-11-07T${TIME}`, 1)).to.equal(`2022-11-08T${TIME}`);
                    // Nov 8 -> Nov 9
                    expect(addBusinessDays(`2022-11-08T${TIME}`, 1)).to.equal(`2022-11-09T${TIME}`);
                    // Nov 9 -> Nov 10
                    expect(addBusinessDays(`2022-11-09T${TIME}`, 1)).to.equal(`2022-11-10T${TIME}`);
                    // Nov 14 -> Nov 15
                    expect(addBusinessDays(`2022-11-14T${TIME}`, 1)).to.equal(`2022-11-15T${TIME}`);
                    // Nov 15 -> Nov 16
                    expect(addBusinessDays(`2022-11-15T${TIME}`, 1)).to.equal(`2022-11-16T${TIME}`);
                })
            })

            describe('but tomorrow is NOT a working day', function() {
                it('should return "same time on the next working day"', function () {
                    // Nov 10 -> next business day Nov 14 (Nov 11, 12, 13 are not working days)
                    expect(addBusinessDays(`2022-11-10T${TIME}`, 1)).to.equal(`2022-11-14T${TIME}`);
                })
            })
        })

        describe('if today is NOT a working day', function() {
            describe('and tomorrow is a working day', function() {
                it('should return "start of the next working day" + 1 business day', function () {
                    // Nov 13 -> next business day Nov14 -> +1 day = Nov 15 (because Nov 11, 12, 13 are not working days)
                    expect(addBusinessDays(`2022-11-13T${TIME}`, 1)).to.equal(`2022-11-15T${START_OF_DAY}`);
                });
            })

            describe('and tomorrow is NOT a working day', function() {
                it('should return "start of the next working day" + 1 business day', function () {
                    // Nov 11 -> next business day Nov14 -> +1 day = Nov 15 (because Nov 11, 12, 13 are not working days)
                    expect(addBusinessDays(`2022-11-11T${TIME}`, 1)).to.equal(`2022-11-15T${START_OF_DAY}`);
                    // Nov 12 -> next business day Nov14 -> +1 day = Nov 15 (because Nov 11, 12, 13 are not working days)
                    expect(addBusinessDays(`2022-11-12T${TIME}`, 1)).to.equal(`2022-11-15T${START_OF_DAY}`);
                });
            })
        })
    })

    describe('if cnt_business_days_to_add is 2', function() {

        describe('if today is a working day', function() {
            describe('and next 2 days are working days', function() {
                it('should return +36 hours from now', function () {
                    // Nov 7 -> Nov 9
                    expect(addBusinessDays(`2022-11-07T${TIME}`, 2)).to.equal(`2022-11-09T${TIME}`);
                    // Nov 8 -> Nov 10
                    expect(addBusinessDays(`2022-11-08T${TIME}`, 2)).to.equal(`2022-11-10T${TIME}`);
                })
            })
            describe('but tomorrow is NOT a working day', function() {
                it('should return "same time on the next working day"', function () {
                    // Nov 10 -> next business day Nov 14 + 2 days = Nov 16
                    expect(addBusinessDays(`2022-11-10T${TIME}`, 2)).to.equal(`2022-11-15T${TIME}`);
                })
            })
        })

        describe('if today is NOT a working day', function() {
            describe('and tomorrow is a working day', function() {
                it('should return "start of the next working day" + 2 business days', function () {
                    // Nov 13 -> next business day Nov14 -> +2 days = Nov 16 morning
                    expect(addBusinessDays(`2022-11-13T${TIME}`, 2)).to.equal(`2022-11-16T${START_OF_DAY}`);
                });
            })
            describe('and tomorrow is NOT a working day', function() {
                it('should return "start of the next working day" + 1 business day', function () {
                    // Nov 11 -> next business day Nov14 -> +2 days = Nov 16 morning
                    expect(addBusinessDays(`2022-11-11T${TIME}`, 2)).to.equal(`2022-11-16T${START_OF_DAY}`);
                    // Nov 12 -> next business day Nov14 -> +2 days = Nov 16
                    expect(addBusinessDays(`2022-11-12T${TIME}`, 2)).to.equal(`2022-11-16T${START_OF_DAY}`);
                });
            })
        })
    })
})
