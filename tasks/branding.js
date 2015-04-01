/*jslint white:true*/
module.exports = function(grunt) {
    'use strict';
    
    var spawn = require('child_process').spawn,
        async = require('async'),
        properties = require('java-properties'),
        fs = require('fs'),
        path = require('path');
    
    
    function applyBrandProperties(props, mappingfile, codefile, cb) {
        grunt.log.writeln('props: ' + props);
        grunt.log.writeln('mappingfile: ' + mappingfile);
        grunt.log.writeln('codefile: ' + codefile);
        
        var mapps = null,
            data = null,
            keys = null;
        
        if (!fs.existsSync(mappingfile)) {
            grunt.fatal('unable to find mapping file ' + mappingfile);
            cb(false);
        }
        
        if (!fs.existsSync(codefile)) {
            grunt.fatal('unable to find code file ' + codefile);
            cb(false);
        }
        
        mapps = properties.of(mappingfile);
        keys = mapps.getKeys();
        data = grunt.file.read(codefile, {encoding: 'utf8'});
        
        for(var key in keys) {
            // get the mapping identifier
            var mapping = mapps.get(keys[key]);
            // compose the regex pattern to find the mapping identifier
            var pattern = new RegExp('(/\\*' + mapping + '\\*/").*("/\\*' + mapping + '\\*/)');
            // compose the replacement string containing the new property and the mapping identifier
            var replace = '$1' + props.get(keys[key]) + '$2';
            // apply the regex and its replacement to data
            data = data.replace(pattern, replace);
        }
        grunt.file.write(codefile, data, {encoding: 'utf8'});
        
        cb();
    }
    
    grunt.registerMultiTask('branding', 'Handles branding information and applies it to the sources', function() {
        
        var options = this.options({
            name: null,
            propertiesfile: 'branding.properties',
            mappingfiles: ['mapping.branding.cs.properties', 'mapping.branding.h.properties'],
            codefiles: ['Branding.cs', 'Branding.h'],
            force: false
        }),
            asyncCallback = this.async(),
            functions = [],
            sourcePath = null,
            propertiesfile = null,
            props = null,
            i = 0;
        
        grunt.log.debug('options: ' + JSON.stringify(options, null, 4));
        
        if (!options.name) {
            grunt.fatal('Brand name must be specified');
            asyncCallback(false);
        }
        
        if (options.mappingfiles.length !== options.codefiles.length) {
            grunt.fatal('Each code file requires its according mapping file.');
            asyncCallback(false);
        }
        
        if (this.filesSrc.length !== 1) {
            grunt.fatal('Only one branding directory might be specified');
            asyncCallback(false);
        }
        sourcePath = this.filesSrc[0];
        grunt.log.debug('src: ' + sourcePath);
        
        propertiesfile = path.join(sourcePath, options.name, options.propertiesfile);
        if (!fs.existsSync(propertiesfile)) {
            grunt.fatal('Unable to find properties file ' + propertiesfile);
            asyncCallback(false);
        }
        grunt.log.debug('loading branding properties from ' + propertiesfile);
        props = properties.of(propertiesfile);

        options.mappingfiles.map(function(mappingfile, ordinal) {
            functions.push(function(cb) {
               applyBrandProperties(props, 
                                    path.join(sourcePath, mappingfile),
                                    options.codefiles[ordinal],
                                    cb);
            });
        });
        
        async.series(functions, function() {
            asyncCallback();
        });
        
    });
    
    
    
    /*
    unused
    
    function applyProperties(src, options, cb) {
        // sanity check and load the specified properties file
        var propertiesPath = null,
            mappingPath = null,
            codePath = null,
            props = null,
            mapps = null,
            keys = null,
            data = null,
            i = 0;
        
        if (options.mappingfiles.length !== options.codefiles.length) {
            grunt.fatal('Each code file requires its accroding mapping file.');
            cb(false);
        }
        
        propertiesPath = path.join(src, options.name, options.propertiesfile);
        if (!fs.existsSync(propertiesPath)) {
            grunt.fatal('Unable to find properties file ' + propertiesPath);
            cb(false);
        }
        
        grunt.log.debug('try to load ' + propertiesPath);
        props = properties.of(propertiesPath);
        
        for(i = 0; i < options.mappingfiles.length; i++) {
            
            mappingPath = path.join(src, options.mappingfiles[i]);
            if (!fs.existsSync(mappingPath)) {
                grunt.fatal('unable to find mapping file ' + mappingPath);
                cb(false);
            }
            
            codePath = options.codefiles[i];
            if (!fs.existsSync(codePath)) {
                grunt.fatal('unable to find code file ' + codePath);
                cb(false);
            }
            
            grunt.log.debug('try to load ' + mappingPath);
            mapps = properties.of(mappingPath);

            keys = mapps.getKeys();
            if (keys.length > props.getKeys().length) {
                grunt.fatal('Not all mapping keys are satisfied by the specified properties file');
                cb(false);
            }
            
            grunt.log.debug('about to load file ' + codePath + ' with encoding UTF-8');
            data = grunt.file.read(codePath, {encoding: 'utf8'});
            
            for(var key in keys) {
                // original code grabbed from ant build file...
                // <replaceregexp file="${file.branding.h}"
				//		match="(/\*${mapping.h.@{property}}\* /&quot;).*(&quot;/\*${mapping.h.@{property}}\* /)"
				//		replace="\1${branding.@{property}}\2" />

                // get the mapping identifier
                
                var mapping = mapps.get(keys[key]);
                // compose the regex pattern to find the mapping identifier
                var pattern = new RegExp('(/\\*' + mapping + '\\* /").*("/\\*' + mapping + '\\* /)');
                // compose the replacement string containing the new property and the mapping identifier
                var replace = '$1' + props.get(keys[key]) + '$2';
                
                // apply the regex and its replacement to data
                data = data.replace(pattern, replace);
            }
            
            //  finally write the altered content back to the file
            grunt.file.write(codePath, data, {encoding: 'utf8'});
        }
        cb();
    }

    */
};
