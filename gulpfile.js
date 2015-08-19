
/*global require */

'use strict';

var gulp = require('gulp'),
    gulpUtil = require('gulp-util'),
    webpack = require('webpack'),
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
        .on('error', function (err) {
            plugins.notify({
                title: 'css:dev',
                message: 'CSS FAILED'
            });
        })
        .pipe(plugins.autoprefixer({ browsers: ['last 2 version', 'Firefox < 20', '> 5%'] }))
        .pipe(gulp.dest('target/css/'))
        .pipe(plugins.notify({
            title: 'css:dev',
            message: 'CSS compiled successfully',
            wait: true
        }));
});

gulp.task('scsslint', function () {
    var lintSourceFiles = [
        'source/scss/**/*.scss',
        '!source/scss/**/_reset.scss',
        '!source/scss/**/_fonts.scss'
    ];

    return gulp.src(lintSourceFiles)
        .pipe(plugins.scssLint({
            config: '.scss-lint.yml',
            filePipeOutput: 'scssReport.json',
            maxBuffer: Infinity,
            verbose: true
        }))
        .on('error', function (err) {
            console.log(err);
        });
});

gulp.task('jshint', function () {
    var sourceFiles = [
        'source/javascript/**/*.js'
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

gulp.task('eslint', function () {
    var sourceFiles = ['server/**/*.js'];

    return gulp.src(sourceFiles)
        .pipe(plugins.eslint())
        .pipe(plugins.eslint.format())
        .pipe(plugins.eslint.failOnError());

    // sourceFiles = ['source/javascript/**/*.js'];

    // gulp.src(sourceFiles)
    //     .pipe(plugins.eslint({
    //         env: 'browser'
    //     }))
    //     .pipe(plugins.eslint.format())
    //     .pipe(plugins.eslint.failOnError());
});

gulp.task('webpack:dev', function (callback) {
    var myConfig = Object.create(require('./webpack.config.js'));

    webpack(myConfig, function (err, stats) {
        if (err) throw new gulpUtil.PluginError('webpack:build-dev', err);
        gulpUtil.log('[webpack:build-dev]', stats.toString({
            colors: true
        }));

        plugins.notify({
            title: 'webpack:dev',
            message: 'webpack processing completed'//,
//            wait: true
        });
    });
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

gulp.task('webpack:deploy', function () {
    var myConfig = Object.create(require('./webpack.config.js'));

    myConfig.plugins = myConfig.plugins.concat(
        new webpack.DefinePlugin({
            'process.env': {
                // This has effect on the react lib size
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    );

    webpack(myConfig, function (err, stats) {
        if (err) throw new gulpUtil.PluginError('webpack:build-dev', err);
        gulpUtil.log('[webpack:build-dev]', stats.toString({
            colors: true
        }));
    });
});

gulp.task('dev', function () {
    gulp.watch(['source/javascript/**/*.js'], [
        'jshint',
        'eslint',
        'webpack:dev'
    ]);

    // Initial SCSS compilation
    gulp.run('css:dev');
    gulp.watch(['source/scss/**/*.scss'], [
        'css:dev',
        'scsslint'
    ]);
});

gulp.task('deploy', function () {
    gulp.start('css:deploy');
    gulp.start('webpack:deploy');
});
