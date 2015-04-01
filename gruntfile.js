/*jslint white:true*/
module.exports = function(grunt) {
    'use strict';
    
    var options = {
        // path for load-grunt-configs
        config: { src: 'tasks/autoload/*.js' },
    };
    
    // read the package.json and load all npm tasks
    pkg: grunt.file.readJSON('package.json');
    require('load-grunt-tasks')(grunt);
    
    // load local tasks
    grunt.loadTasks('tasks/');
    
    // load local autoload tasks
    grunt.initConfig(require('load-grunt-configs')(grunt, options));
    
    // define default and ci tasks
    grunt.registerTask('default', 'The target that is invoked if grunt is called without specific target', function() {
        grunt.log.writeln('default target is not defined');
    });
    
    grunt.registerTask('ci', 'The target that is invoked during continous integration builds', function() {
        grunt.fatal('ci target is not defined');
    });
};
