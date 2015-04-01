/*jslint white:true*/
module.exports = function(grunt, options) {
    'use strict';
    
    grunt.registerTask('compile', 'compiles the product', function(brand) {
        
        if (!brand) {
            brand = ['default'];
        }
        
        if (typeof brand === 'string') {
            brand = [brand];
        }
        
        brand.forEach(function(b) {
            var task = 'branding:' + b;
            /* this doesn't work (don't know why...)
            if (!grunt.task.exists(task)) {
                grunt.fatal('Invalid brand or missing configuration. branding:' + brand + ' not found');
                return false;
            }
            */
            grunt.task.run(task);
            
            /*
            grunt.task.run('msbuild:bin');
            grunt.task.run('msbuild:sex86');
            grunt.task.run('msbuild:sex64');
            */
            
        });
        
        
        grunt.log.debug('compile apply brand');
    });
    
    
    return {
        tasks: {
            branding: { 
                default: {
                    src: ['branding'],
                    options: {
                        name: 'default'
                    }
                }
            }
        }
    };
};
