module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            grunt: {
                files: ["Gruntfile.js", "package.json"],
                tasks: "default"
            },
            javascript: {
                files: ["public/**/*.js", "server/**/*.js", "test/tests/**/*Spec.js"],
                tasks: "default"
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },
        mochacli: {
            options: {
                reporter: "nyan",
                ui: "tdd"
            },
            all: ["test/tests/**/*Spec.js"]
        },
        jshint: {
            all: ["public/app/**/*.js", "server/**/*.js", "test/tests/**/*Spec.js"],
            options: {
                jshintrc: ".jshintrc"
            }
        }
//        uglify: {
//            options: {
//                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
//            },
//            build: {
//                src: 'src/<%= pkg.name %>.js',
//                dest: 'build/<%= pkg.name %>.min.js'
//            }
//        }
    });

    // Load the plugins.
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks('grunt-karma');
    grunt.registerTask("test", ["karma"]);
//    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['test', 'jshint']);

};