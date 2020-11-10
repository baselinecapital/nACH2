var chai     = require('chai')
    , _        = require('lodash')
    , expect   = chai.expect
    , File  = require('../lib/file');

describe('Batch', function() {

    describe('Create File', function () {
        it('should create a file successfully', function () {
            const file = new File({
                immediateDestination: '110000000', 
                immediateOrigin: '110000000',
                immediateDestinationName: 'SOME BANK',
                immediateOriginName: 'SOME COMPANY',
                referenceCode: 'ABCD',
                priorityCode: '1',
                fileIdModifier: 'A'
            });
            file.generateFile(function(string) {
                console.log(string);
            });
        });

        it('should overide fileCreationDate and fileCreationTime successfully', function () {
            const file = new File({
                immediateDestination: '110000000',
                immediateOrigin: '110000000',
                immediateDestinationName: 'SOME BANK',
                immediateOriginName: 'SOME COMPANY',
                referenceCode: 'ABCD',
                priorityCode: '1',
                fileIdModifier: 'A',
                fileCreationDate: '190301',
                fileCreationTime: '1212'
            });
            file.generateFile(function(string) {
                console.log(string);
                const lines = string.split('\n');
                expect(lines[0]).contain('1903011212')
            });
        });
    })
})

        
