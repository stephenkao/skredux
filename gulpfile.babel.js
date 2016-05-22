// Libraries
import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import browserSync from 'browser-sync';
// Configuration
import {getAbsolutePath} from './gulp/config';
// Tasks
import esLintFn from './gulp/tasks/es-lint';
import sassFn from './gulp/tasks/sass';
import scssLintFn from './gulp/tasks/scss-lint';
import webpackFn from './gulp/tasks/webpack';


gulp.task('es-lint', esLintFn);
gulp.task('sass', sassFn);
gulp.task('scss-lint', scssLintFn);
gulp.task('webpack', webpackFn);

gulp.task('watch', () => {
  gulp.watch([getAbsolutePath('src/scss/**/*.scss')], ['scss-lint', 'sass']);
  gulp.watch([getAbsolutePath('src/**/*.js')], ['es-lint', 'webpack']);

  const bsInstance = browserSync.create();
  bsInstance.init({proxy: 'stephenkao.dev:3000'});
});
