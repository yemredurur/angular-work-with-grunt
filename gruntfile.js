
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        cssmin: {
            my_target: {
                /*combine: {
                    files: {
                        'css/base.css' : ['css/base.css', 'css/bootstrap.min.css','css/bootstrap-theme.min.css']
                    }
                },*/
                files: [{
                    expand: true,
                    cwd:  'css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'css/',
                    ext: '.min.css'
                }]
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
};
