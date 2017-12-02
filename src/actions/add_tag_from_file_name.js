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
        if (_.primatives.strings.isValid(old.artist) && _.primatives.strings.isValid(old.title)) { 
            results.skipped.push(fileInfo);
            return done(); 
        }

        var meta = JSON.parse(JSON.stringify(old));
        meta.title  = _.metaData.isValidName(meta.title) ? _.metaData.cleanName(meta.title) : (nameDetails.fullTitle || nameDetails.title);
        meta.artist = _.metaData.isValidName(meta.artist) ? _.metaData.cleanName(meta.artist) : nameDetails.artist;

        if (typeof meta.title === 'undefined' || meta.title === 'undefined') {
            console.log('----------');
            console.log(JSON.stringify(fileInfo, null, 2));
            console.log(JSON.stringify(old, null, 2));
            console.log(JSON.stringify(meta, null, 2));
        }

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