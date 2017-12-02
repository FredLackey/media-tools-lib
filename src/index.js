// var TEST_ROOT   = '/Volumes/ARK02/DJing/Curation/Glitter & Glowsticks/Tracks';
// var TEST_EXT    = [ '*.m4a', '*.mp3', '*.mp4' ];

var VALID_EXTENSIONS = [ 'asf', 'avi', 'flv', 'mp3', 'mp4', 'm4a', 'wma', 'wmv'  ];

var utils   = require('./utils');
var actions = require('./actions');

module.exports = {
    _       : utils,
    utils   : utils,
    actions : actions,

    VALID_EXTENSIONS : VALID_EXTENSIONS
};


// actions.addTagFromFileName.process(TEST_ROOT, TEST_EXT, function(err, results){
//     if (err) { throw err; }

//     console.log('Process complete.');   
    // console.log('  > ELIGIBLE: %s', results.found.length);

    // console.log('  > SKIPPED : %s (%s)', results.failures.invalidName.length, 'invalid name');
    // console.log('  > FAILED  : %s (%s)', results.failures.metaRead.length, 'err reading meta');
    // console.log('  > FAILED  : %s (%s)', results.failures.metaEmpty.length, 'no meta data');
    // console.log('  > FAILED  : %s (%s)', results.failures.metaWrite.length, 'meta data not written');
    // console.log('  > SKIPPED : %s (%s)', results.skipped.length, 'not needed');
    // console.log('  > SUCCESS : %s', results.success.length);

// });