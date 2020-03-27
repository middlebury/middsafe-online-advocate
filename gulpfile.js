var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var gulpIf = require('gulp-if');
var autoprefixer = require('gulp-autoprefixer');
var babelify = require('babelify');
var cssnano = require('gulp-cssnano');
// var cmq = require("gulp-combine-mq");
var browserSync = require('browser-sync');
var cp = require('child_process');
var beeper = require('beeper');
var args = require('yargs').argv;
var del = require('del');

const production = !!args.production;

const jekyllOpts = ['build'];

if (!production) {
  jekyllOpts.push('--config', '_config.dev.yml');
}

const clean = () => del('./_site');
const jekyll = done => {
  return cp
    .spawn('jekyll', jekyllOpts, {
      stdio: 'inherit'
    })
    .on('close', done);
};

const rebuild = () =>
  gulp.series(jekyll, function() {
    browserSync.reload();
  });

const server = () =>
  browserSync({
    open: false,
    server: {
      baseDir: '_site'
    }
  });

const scripts = () => {
  var b = browserify({
    entries: './_js/main.js',
    debug: true,
    transform: [[babelify, { presets: ['@babel/preset-env'] }]]
  });

  return b
    .bundle()
    .on('error', function(err) {
      console.error(err.message);
      beeper();
      this.emit('end');
    })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulpIf(!production, sourcemaps.init({ loadMaps: true })))
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(gulpIf(!production, sourcemaps.write('./')))
    .pipe(gulp.dest('./_site/js'))
    .pipe(browserSync.stream())
    .pipe(gulp.dest('./js'));
};

const images = () => {
  return gulp.src('./_img/**/*.{jpg,png,svg}').pipe(gulp.dest('./img')); // TODO: compress images
};

// TODO: get styles to beep on sass error
const styles = () => {
  return (
    gulp
      .src('./_scss/main.scss')
      .pipe(gulpIf(!production, sourcemaps.init({ loadMaps: true })))
      .pipe(
        sass({
          includePaths: ['scss'],
          onError: browserSync.notify
        })
      )
      .on('error', sass.logError)
      .pipe(
        autoprefixer(['last 3 versions', '> 2%', 'ie 10'], { cascade: true })
      )
      .pipe(gulpIf(!production, sourcemaps.write('./')))
      // .pipe(gulpIf(production, cmq()))
      .pipe(gulpIf(production, cssnano({ zIndex: false })))
      .pipe(gulp.dest('./_site/css'))
      .pipe(browserSync.stream())
      .pipe(gulp.dest('./css'))
  );
};

const watch = () => {
  gulp.watch('_js/**/*.js', scripts);
  gulp.watch('_scss/*.scss', styles);
  gulp.watch('_img/**/*.{jpg,png,svg}', images);
  gulp.watch(
    [
      './_layouts/*.html',
      './_includes/*.html',
      './**/*.md',
      './_data/*',
      // HACK: some reason if we try to generically target these folders
      // it causes an infinite rebuild loop
      './{discovery,about,resources}/*.{md,html}'
    ],
    rebuild
  );
};

const build = gulp.series(clean, jekyll, scripts, styles, images);

const dev = gulp.parallel(build, server, watch);

module.exports = {
  dev,
  build
};
