
module.exports = function(grunt) {
    var config = {
        sourceJS: 'source/js',
        sourceCSS: 'source/css',
        sourceSASS: 'source/sass'
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: config,

        notify: {
            options: {
                enabled: true,
                max_jshint_notifications: 5,
                title: " <%= pkg.name %> - v<% pkg.version %>",
                success: false,
                duration: 3
            },
            sass: {
                options: {
                    title: 'Sass task has an error',
                    message: 'Please check the sass options'
                }
            }
        },

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
        },

        sass: {
            dist: {
                files: {
                    '<%= config.sourceSASS %>/sass-test.css': 'sass/test.scss'
                }
            }
        },

        watch: {
            sass: {
                files: ['sass/*.scss'],
                tasks: ['sass']
            }
        },

        uncss: {
            dist: {
                files: {
                    'css/bootstrap.min.css': 'app/index.html'
                }
            }
        }


    });

    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-uncss');

    grunt.task.run('notify');

    grunt.registerTask('dev',['uncss','concat','uglify','cssmin','sass','watch']);

};
