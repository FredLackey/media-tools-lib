var _       = require('../utils');
var async   = require('async');
var ff      = require('ffmetadata');

module.exports = {
    process : process
};

var results = {
    found   : [],
    success : [],
    skipped : [],
    failures : {
        invalidName : [],
        metaEmpty   : [],
        metaRead    : [],
        metaWrite   : []
    }
};

function process(root, extensions, done) {
    _.primatives.files.find(root, extensions, function(err, files){
        if (err) { return done(err); }
        if (files.length < 1) { return done(); }

        async.each(files, processFile, function(){
            return done(null, results);
        });
    });
}

function processFile (fileInfo, done) {
    
    results.found.push(fileInfo);

    var nameDetails = _.metaData.fromFileName(fileInfo.name);
    if (!nameDetails) { 
        results.failures.invalidName.push(fileInfo);
        return done();
    }

    ff.read(fileInfo.fullPath, function(err, old){
        if (err) { 
            results.failures.metaRead.push(fileInfo);
            return done(); 
        }
        if (!old) { 
            results.failures.metaEmpty.push(fileInfo);
            return done(); 
        }
        if (!old.artist && !old.title) { 
            results.skipped.push(fileInfo);
            return done(); 
        }

        var meta = {
            artist: '',
            title : ''
        };

        ff.write(fileInfo.fullPath, meta, function(err){
            if (err) {
                results.failure.metaWrite.push(fileInfo);
            } else { 
                results.success.push(fileInfo);
            }

            return done();
        });
    });
}