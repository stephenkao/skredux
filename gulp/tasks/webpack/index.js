// Libraries
import gulp from 'gulp';
// Configuration
import webpackConfig from './config';
import {getAbsolutePath} from '../../config';


export default function webpackFn(isDev) {
  return () => {
    const src = [
      getAbsolutePath('src/javascript/**/*.js'),
      getAbsolutePath('src/javascript/**/*.jsx')
    ];
    const dest = getAbsolutePath('dist');

    return gulp.src(src)
               .pipe(webpack(webpackConfig))
               .pipe(gulp.dest(dest));
               //.pipe(bsInstance.stream());
  };
}
