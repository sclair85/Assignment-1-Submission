const {src, dest, parallel, series, watch, prefix} = require('gulp');
const concat = require('gulp-concat');
const eslint = require('gulp-eslint');
const htmlReplace = require('gulp-html-replace');
const cleanCss = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

function htmlTask() {
  return src('src/*.html')
  .pipe(htmlReplace({
    css: 'styles/all-styles.css',
    js: 'scripts/bundle.js',
  }))
  .pipe(dest('dist'))
}

function prefixTask() {
  return src('src/css/global.css')
  .pipe(autoprefixer())
  .pipe(dest('dist/css'))
}

function stylesTask() {
  return src(['src/css/style.css', 'src/css/*.css'])
  .pipe(sourcemaps.init())
  .pipe(autoprefixer())
  .pipe(concat('all-styles.css'))
  .pipe(cleanCss())
  .pipe(sourcemaps.write())
  .pipe(dest('dist/css'))
}

function lintTask() {
  return src('src/js/test.js')
  .pipe(eslint({}))
  .pipe(eslint.format());
}

function scriptsTask() {
  return src('src/js/app.js')
  .pipe(sourcemaps.init())
  .pipe(sourcemaps.write())
  .pipe(dest('dist/js'))
}

function watchFiles() {
  watch('src/*.html', stylesTask);
  watch('src/styles/*.css', stylesTask);
  watch('src/script/*.js', stylesTask);
  watch('src/img/*.js', stylesTask);
}


exports.lint = lintTask;
exports.prefix = prefixTask;
exports.htmlTask = htmlTask;
exports.stylesTask = stylesTask;
exports.scriptsTask = scriptsTask;
exports.watch = parallel(watchFiles);
exports.dev = series(parallel(htmlTask, scriptsTask, stylesTask), parallel(watchFiles));
exports.default = parallel(htmlTask, stylesTask, scriptsTask);
