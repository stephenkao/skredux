/*global require */

'use strict';

var gulp = require('gulp'),
    gulpUtil = require('gulp-util'),
    plugins = require('gulp-load-plugins')({
        lazy: false
    });

gulpUtil.log('');
gulpUtil.log('Loading the following dependencies:');
for (var pluginName in plugins) {
    if (plugins.hasOwnProperty(pluginName)) {
        gulpUtil.log('-\t' + pluginName);
    }
}
gulpUtil.log('');

////////// Development tasks
gulp.task('css:dev', function () {
    gulp.src('public/scss/**/*.scss')
        .pipe(plugins.sass())
        .pipe(plugins.autoprefixer({ browsers: ['last 2 version', 'Firefox < 20', '> 5%'] }))
        .pipe(gulp.dest('target/css/'))
        .pipe(plugins.notify({
            title: 'css:dev',
            message: 'CSS compiled successfully',
            wait: true
        }));

    gulp.src('public/scss/**/*.scss')
        .pipe(plugins.scssLint({
            config: '.scss-lint.yml',
            filePipeOutput: 'scssReport.json',
            maxBuffer: Infinity,
            verbose: true
        }));
});

gulp.task('javascript:dev', function () {
    gulp.start('jshint:dev');
});

////////// Deployment tasks
gulp.task('css:deploy', function () {
    gulp.src('public/scss/**/*.scss')
        .pipe(plugins.sass({
            outputStyle: 'compressed'
        }))
        .pipe(plugins.autoprefixer({ browsers: ['last 2 version', 'Firefox < 20', '> 5%'] }))
        .pipe(gulp.dest('target/css/'));
});

gulp.task('javascript:deploy', function () {});

// configure the jshint task
gulp.task('jshint:dev', function() {
    return gulp.src(['public/javascript/**/*.js', '!public/javascript/lib/**/*.js'])
        .pipe(plugins.jshint({
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish'),
                ignores: [
                    'public/javascript/lib/**/*.js'
                ],
                force: true
            }
        }))
        .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('dev', function () {
    gulp.watch(['public/javascript/**/*.js'], ['javascript:dev']);
    gulp.watch(['public/scss/**/*.scss'], ['css:dev']);
});

gulp.task('deploy', function () {
    gulp.start('css:deploy');
});
