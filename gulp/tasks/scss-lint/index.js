// Libraries
import gulp from 'gulp';
import scssLint from 'gulp-scss-lint';
// Configuration
import {getAbsolutePath} from '../../config';


const scssLintOpts = {
  config: getAbsolutePath('.scss-lint.yml'),
  filePipeOutput: getAbsolutePath('scssReport.json'),
  maxBuffer: Infinity,
  verbose: true
};
export default function scssLintFn() {
  return () => {
    var src = [
      getAbsolutePath('src/scss/**/*.scss'),
      `!${getAbsolutePath('src/scss/**/_reset.scss')}`,
      `!${getAbsolutePath('src/scss/**/_fonts.scss')}`,
    ];

    return gulp.src(src)
               .pipe(scssLint(scssLintOpts));
  };
}
