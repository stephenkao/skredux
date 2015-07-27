/*global require */

'use strict';

var gulp = require('gulp'),
    gulpUtil = require('gulp-util'),
    plugins = require('gulp-load-plugins')({
        lazy: false
  });


////////// Development tasks
gulp.task('css:dev', function () {
    var sourceFiles,
        lintSourceFiles;

    sourceFiles = 'source/scss/**/*.scss';
    gulp.src(sourceFiles)
        .pipe(plugins.sass())
        .pipe(plugins.autoprefixer({ browsers: ['last 2 version', 'Firefox < 20', '> 5%'] }))
        .pipe(gulp.dest('target/css/'))
        .pipe(plugins.notify({
            title: 'css:dev',
            message: 'CSS compiled successfully',
            wait: true
        }));

    lintSourceFiles = [
        'source/scss/**/*.scss',
        '!source/scss/**/_reset.scss',
        '!source/scss/**/_fonts.scss'
    ];
    gulp.src(lintSourceFiles)
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

gulp.task('jshint:dev', function() {
    var sourceFiles = [
        'source/javascript/**/*.js',
        '!source/javascript/lib/**/*.js'
    ];

    return gulp.src(sourceFiles)
        .pipe(plugins.jshint({
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish'),
                ignores: [
                    'source/javascript/lib/**/*.js'
                ],
                force: true
            }
        }))
        .pipe(plugins.jshint.reporter('jshint-stylish'));
});

////////// Deployment tasks
gulp.task('css:deploy', function () {
    gulp.src('source/scss/**/*.scss')
        .pipe(plugins.sass({
            outputStyle: 'compressed'
        }))
        .pipe(plugins.autoprefixer({ browsers: ['last 2 version', 'Firefox < 20', '> 5%'] }))
        .pipe(gulp.dest('target/css/'));
});

gulp.task('javascript:deploy', function () {});

gulp.task('dev', function () {
    gulp.watch(['source/javascript/**/*.js'], [
        'javascript:dev'
    ]);

    // Initial SCSS compilation
    gulp.run('css:dev');
    gulp.watch(['source/scss/**/*.scss'], [
        'css:dev'
    ]);
});

gulp.task('deploy', function () {
    gulp.start('css:deploy');
});
