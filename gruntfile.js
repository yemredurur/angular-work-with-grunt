
module.exports = function(grunt) {
    var config = {
        app: 'app',
        source: 'source/app/',
        sourceJS: 'source/app/js',
        sourceCSS: 'source/app/css',
        sourceSASS: 'source/app/sass'
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: config,

        notify: {

            custom:{
                options:{
                    enabled:true,
                    title: '<%= pkg.name %> - v<% pkg.version %>',
                    message:'Start',
                    max_jshint_notifications: 5,
                    success: false,
                    duration: 3
                }
            },
            sass: {
                options: {
                    title: '<%= pkg.name %> - v<% pkg.version %>',
                    message: 'Sass task running'
                }
            },
            cssmin: {
                options: {
                    title: '<%= pkg.name %> - v<% pkg.version %>',
                    message: 'Cssmin task running'
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
                    '<%= config.sourceCSS %>/*.css': 'app/index.html'
                }
            }
        },

        injector: {
            options: {
                addRootSlash: '../',
                ignorePath:'',
                template: '<%= config.source %>',
                templateString: '<%= config.source %>'
            },
            local_dependencies: {
                files: {
                    '<%= config.source %>/*': ['<%= config.sourceJS %>/*.js', '<%= config.sourceCSS %>/*.css']
                }
            }
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        '<%= config.sourceCSS %>/*.css',
                        '<%= config.sourceJS %>/*.js',
                        '<%= config.source %>/app/*.html'
                    ]
                },
                options: {
                    watchTask: true,
                    server: './<%= config.source %>'
                }
            }
        },

        copy: {
            /*html: {
                src: '<%= config.app %>/*.html',
                dest: '<%= config.source %>/index.html'
            },*/
            main: {
                files: [
                    {expand: true, src: ['<%= config.app %>/*'], dest: 'source/', filter: 'isFile'},
                ]
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
    grunt.loadNpmTasks('grunt-injector');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-copy');


    grunt.registerTask('dev',['concat','uglify','cssmin','sass','copy:main','injector','browserSync','watch']);

    grunt.task.run('notify');

};
