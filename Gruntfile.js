/*global module, require */

/**
 * Marionette tutorial Gruntfile
 * DON'T TOUCH THIS, YOU DAMN, DIRTY APES!
 */
(function() {
	'use strict';

	module.exports = function (grunt) {
		grunt.initConfig({
			pkg: grunt.file.readJSON('package.json'),

			////////// JavaScript
			jshint: {
				options: {
					jshintrc: '.jshintrc',
					reporter: require('jshint-stylish'),
					ignores: [
						'public/javascript/lib'
					],
					force: true
				},
				dev: {
					src: ['public/javascripts']
				}
			},

			////////// CSS
			scsslint: {
				options: {
					bundleExec: false,
					config: '.scss-lint.yml',
					reporterOutput: 'output/scss-lint-report.xml',
					colorizeOutput: true,
					maxBuffer: Infinity,
					force: true
				},
				dev: {
					src: ['public/scss']
				}
			},
			compass: {
				dev: {
					options: {
						sassDir: 'public/scss',
						cssDir: 'target/css'
					}
				}
			},

			////////// Development cycle
			notify: {
				compass: {
					options: {
						title: 'Compass task complete',
						message: 'CSS files generated, no errors found'
					}
				}
			},
			watch: {
				options: {
					spawn: false,
					interval: 5007,
					debounceDelay: 2000
				},

				javascript: {
					files: [
						'public/javascripts/**/*.js',
						'!public/javascripts/lib/**/*.js',
						'!public/javascripts/**/.#*',
					],
					tasks: [
						'jshint'
					]
				},
				sass: {
					files: [
						'public/scss/**/*.scss',
						'!public/scss/**/.#*'
					],
					tasks: [
						'compass:dev'
					]
				}
			},
			concurrent: {
				options: {
					logConcurrentOutput: true
				},
				tasks: [
					'watch:javascript',
					'watch:sass',
					'nodemon:run'
				]
			},
			nodemon: {
				run: {
					script: 'server/app.js'
				}
			}
		});

		grunt.loadNpmTasks('grunt-contrib-requirejs');
		grunt.loadNpmTasks('grunt-contrib-compass');
		grunt.loadNpmTasks('grunt-contrib-watch');
		grunt.loadNpmTasks('grunt-contrib-jshint');
		grunt.loadNpmTasks('grunt-jscs');
		grunt.loadNpmTasks('grunt-concurrent');
		grunt.loadNpmTasks('grunt-notify');
		grunt.loadNpmTasks('grunt-nodemon');

		////////// 'Development' mode
		grunt.registerTask('run', function () {
			// Generate all existing assets
			grunt.task.run('production');
			grunt.task.run('concurrent');
		});

		////////// 'Production' mode
		grunt.registerTask('production', [
			'compass:dev',
			'jshint:dev'
		]);
	};
})();
