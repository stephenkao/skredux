// Modules
import gulp from 'gulp';
import gulpUtil from 'gulp-util';
import eslint from 'gulp-eslint';
import scssLint from 'gulp-scss-lint';
import sass from 'gulp-sass';
import nodemon from 'gulp-nodemon';
import autoprefixer from 'gulp-autoprefixer';
import webpack from 'gulp-webpack';
import browserSync from 'browser-sync';
// Configuration
import webpackConfig from './webpack.config';
// Tasks
//import sassFn from './gulp/tasks/sass';
//import webpackFn from './gulp/tasks/webpack';


const bsInstance = browserSync.create();
////////// CSS tasks
gulp.task('css:lint', () => {
  var src = [
    './source/scss/**/*.scss',
    '!./source/scss/**/_reset.scss',
    '!./source/scss/**/_fonts.scss'
  ];

  return gulp.src(src)
    .pipe(scssLint({
      config: '.scss-lint.yml',
      filePipeOutput: 'scssReport.json',
      maxBuffer: Infinity,
      verbose: true
    }));
});

gulp.task('css:dev', () => {
  const src = './source/scss/**/*.scss';
  const dest = './dist/css';

  return gulp.src(src)
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 version', 'Firefox < 20', '> 5%']
    }))
    .pipe(gulp.dest(dest))
    .pipe(bsInstance.stream());
});

gulp.task('webpack:dev', (cb) => {
  const src = [
    './source/javascript/**/*.js',
    './source/javascript/**/*.jsx'
  ];

  return gulp.src(src)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('./dist/'))
    .pipe(bsInstance.stream());
});


////////// JavaScript
gulp.task('js:lint', () => {
  var src = ['./source/javascript/**/*.js'];

  return gulp.src(src)
    .pipe(eslint())
    .pipe(eslint.format());
});

////////// Development tasks
gulp.task('watch', () => {
  gulp.run('css:lint');
  gulp.watch(['./source/scss/**/*.js'], [
    'css:lint',
    'css:dev'
  ]);

  //gulp.watch(['./server/**/*.js'], ['js:lint']);
  gulp.watch(['./source/**/*.js'], [
    'js:lint',
    'webpack:dev'
  ]);

  bsInstance.init({
    proxy: 'stephenkao.dev'
  });
});

////////// Production tasks
gulp.task('build', () => {
});