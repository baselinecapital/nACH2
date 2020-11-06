var chai     = require('chai')
  , _        = require('lodash')
  , expect   = chai.expect
  , Entry  = require('../lib/entry')
  , EntryAddenda  = require('../lib/entry-addenda')
  , Batch  = require('../lib/batch')
  , File   = require('../lib/file');

describe('Batch', function(){
  
  describe('Create Batch', function(){
    
    it('should create a batch successfully', function(){
      var batch = new Batch({
        serviceClassCode: '225',
        companyName: 'Test Firm',
        standardEntryClassCode: 'CCD',
        companyIdentification: '110000000',
        companyEntryDescription: 'OP PAYYOUT',
        companyDescriptiveDate: '12345',
        effectiveEntryDate: new Date(), // Date
        originatingDFI: '110000000',
        originatorStatusCode: '1'
      });
      batch.generateString(function(string) {
        console.log(string);
      });
    });

    it('should create batch with effectiveEntryDate as a string successfully', function(){
      var batch = new Batch({
        serviceClassCode: '225',
        companyName: 'Test Firm',
        standardEntryClassCode: 'CCD',
        companyIdentification: '110000000',
        companyEntryDescription: 'OP PAYYOUT',
        companyDescriptiveDate: '12345',
        effectiveEntryDate: '200907', // string with 6 characters
        originatingDFI: '110000000',
        originatorStatusCode: '1'
      });
      batch.generateString(function(string) {
        console.log(string);
      });
    });

    it('should NOT create batch with invalid effectiveEntryDate', function(){
      let error;
      
      try {
        var batch = new Batch({
          serviceClassCode: '225',
          companyName: 'Test Firm',
          standardEntryClassCode: 'CCD',
          companyIdentification: '110000000',
          companyEntryDescription: 'OP PAYYOUT',
          companyDescriptiveDate: '12345',
          effectiveEntryDate: '2009079', // 6 characters
          originatingDFI: '110000000',
          originatorStatusCode: '1'
        });
      } catch (err) {
        error = err;
      }
      
      expect(error.message).equal('Invalid effectiveEntryDate, should be YYMMDD: 2009079');
    });

    it('should NOT create batch with invalid effectiveEntryDate', function(){
      let error;

      try {
        var batch = new Batch({
          serviceClassCode: '225',
          companyName: 'Test Firm',
          standardEntryClassCode: 'CCD',
          companyIdentification: '110000000',
          companyEntryDescription: 'OP PAYYOUT',
          companyDescriptiveDate: '12345',
          effectiveEntryDate: '121314', // not a valid date
          originatingDFI: '110000000',
          originatorStatusCode: '1'
        });
      } catch (err) {
        error = err;
      }

      expect(error.message).equal('Invalid effectiveEntryDate, should be YYMMDD: 121314');
    });
    
    
  });
});
