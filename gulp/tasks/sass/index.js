// Libraries
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
// Configuration
import {getAbsolutePath} from '../../config';


export default function sassFn(isDev) {
  return () => {
    const src = getAbsolutePath('src/scss/**/*.scss');
    const dest = getAbsolutePath('dist/css');

    return gulp.src(src)
               .pipe(sass()) // TODO: Minify if !isDev
               .pipe(autoprefixer({browsers: ['last 2 version', 'Firefox < 20', '> 5%']}))
               .pipe(gulp.dest(dest));
               //.pipe(bsInstance.stream());
  };
}
