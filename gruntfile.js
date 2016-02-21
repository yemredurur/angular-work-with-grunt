
module.exports = function(grunt) {
    var config = {
        sourceJS: 'source/js',
        sourceCSS: 'source/css'
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: config,

        cssmin: {
            my_target: {
                options: {
                    preserveComments: true
                },
                files: [{
                    expand: true,
                    cwd:  '<%= config.sourceCSS %>',
                    src: ['*.css', '!*.min.css'],
                    dest: '<%= config.sourceCSS %>',
                    ext: '.min.css'
                }]
            }
        },

        uglify: {
            options: {
                manage: false
            /*preserveComments: true*/
            },
            my_target: {
                files: {
                    '<%= config.sourceJS %>/test.min.js': ['js/app/app-add-user.js','js/app/app-user-list.js'],
                    '<%= config.sourceJS %>/lib.min.js': ['js/lib/jquery.min.js','js/lib/angular.min.js','js/lib/angular-messages.js','js/lib/firebase.js','js/lib/angularfire.min.js','js/lib/bootstrap.min.js']
                }
            }

        },

        concat: {
            options: {
                seperator: ';',
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<% pkg.version %> -' + '<%= grunt.template.today("dd-mm-yyyy") %> */'
            },
            dist: {
                src : ['css/base.css', 'css/bootstrap.min.css', 'css/bootstrap-grunt theme.min.css'],
                dest: '<%= config.sourceCSS %>/base.css'
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('dev',['concat','uglify','cssmin']);

};
