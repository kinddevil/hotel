'use strict';
module.exports = function(grunt) {
    grunt.initConfig({
        uglify: {
            build: {
                src: ['public/src/js/*.js'],
                dest: 'public/build/trazigo.min.js'
            }
        },
        watch: {
            js: {
                files: '<%= uglify.build.src %>',
                tasks: ['uglify']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', [
        'uglify',
    ]);
    grunt.registerTask('dev', [
        'watch'
    ]);
};