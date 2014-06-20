module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            grunt: {
                files: ["Gruntfile.js", "package.json", ".jshintrc", "karma.conf.js"],
                tasks: "default"
            },
            javascript: {
                files: ["public/app/**/*.js", "server/**/*.js", "test/tests/**/*Spec.js"],
                tasks: "default"
            }
        },
        // Client-side angular tests
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },
        // Server-side node.js tests
        mochaTest: {
            server: {
                options: {
                    reporter: 'dot'
                },
                src: ['test/tests/server/**/*Spec.js']
            }
        },
        jshint: {
            all: ["public/app/**/*.js", "server/**/*.js", "test/tests/**/*Spec.js"],
            options: {
                jshintrc: ".jshintrc"
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                compress: {
                    drop_console: true
                }
            },
            build: {
                src: 'public/app/**/*.js',
                dest: 'public/build/<%= pkg.name %>.min.js'
            }
        }
    });


    // Load the plugins.
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks('grunt-karma');
    grunt.registerTask("test", ["karma", "mochaTest"]);
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-mocha-test');

    // Default task(s).
    grunt.registerTask('default', ['test', 'jshint', 'uglify']);

};