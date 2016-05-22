// Libraries
import gulp from 'gulp';
// Configuration
import {getAbsolutePath} from '../../config';


export default function esLintFn() {
  return () => {
    const src = [
      getAbsolutePath('src/javascript/**/*.js'),
      getAbsolutePath('src/javascript/**/*.jsx'),
      getAbsolutePath('server/javascript/**/*.js'),
      getAbsolutePath('server/javascript/**/*.jsx')
    ];

    return gulp.src(src)
               .pipe(eslint())
               .pipe(eslint.format());
  };
};
