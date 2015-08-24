
/*global require */

'use strict';

var gulp = require('gulp'),
    gulpUtil = require('gulp-util'),
    webpack = require('webpack'),
    notifier = require('node-notifier'),
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
            notifier.notify({
                title: '[css:dev] ERROR',
                message: 'CSS processing failed'
            });
        })
        .pipe(plugins.autoprefixer({ browsers: ['last 2 version', 'Firefox < 20', '> 5%'] }))
        .pipe(gulp.dest('target/css/'));

    notifier.notify({
        title: 'css:dev',
        message: 'CSS processed successfully',
        wait: true
    });
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

gulp.task('eslint:server', function () {
    var sourceFiles = ['server/**/*.js'];

    return gulp.src(sourceFiles)
        .pipe(plugins.eslint())
        .on('error', function () {
            notifier.notify({
                title: '[eslint:server] WARNING',
                message: 'ESLint server warnings',
                wait: true
            });
        })
        .pipe(plugins.eslint.format())
        .pipe(plugins.eslint.failOnError());
});

gulp.task('eslint:client', function () {
    var sourceFiles = ['source/javascript/**/*.js'];

    return gulp.src(sourceFiles)
        .pipe(plugins.eslint())
        .on('error', function () {
            notifier.notify({
                title: '[eslint:client] WARNING',
                message: 'ESLint client warnings',
                wait: true
            });
        })
        .pipe(plugins.eslint.format())
        .pipe(plugins.eslint.failOnError());
});

gulp.task('webpack:dev', function (callback) {
    var myConfig = Object.create(require('./webpack.config.js'));

    webpack(myConfig, function (err, stats) {
        if (err) {
            notifier.notify({
                title: 'webpack:dev',
                message: err,
                wait: true
            });

            throw new gulpUtil.PluginError('webpack:build-dev', err);
        }

        gulpUtil.log('[webpack:dev]: SUCCESS');

        /*
        gulpUtil.log('[webpack:dev]', stats.toString({
            colors: true
        }));
         */

        notifier.notify({
            title: 'webpack:dev',
            message: 'webpacking completed successfully',
            wait: true
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
    gulp.watch(['server/**/*.js'], [
        'eslint:server'
    ]);

    gulp.watch(['source/javascript/**/*.js'], [
        'eslint:client',
        'webpack:dev'
    ]);

    // Initial compilation/packing
    gulp.run('css:dev');
    gulp.watch(['source/scss/**/*.scss'], [
        'css:dev',
        'scsslint'
    ]);
    gulp.run('webpack:dev');

    plugins.nodemon({
        script: './server/app.js',
        watch: './server/**/*.js',
        env: {
            NODE_ENV: 'development'
        }
    })
        .on('error', function () {
            console.log('what');
        });

    gulpUtil.log('READY');
});

gulp.task('deploy', function () {
    gulp.start('css:deploy');
    gulp.start('webpack:deploy');
});
