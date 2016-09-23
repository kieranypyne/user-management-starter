const gulp = require('gulp');
const babel = require('babelify');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const nodemon = require('gulp-nodemon');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

// Bundle our Javascript files
gulp.task('bundle:dev', function() {
  var browserifyOptions = {
    entries: ['./client/js/app.js'],
    debug: true
  };

  console.log('fuck');

  return browserify(browserifyOptions)
    .transform(babel)
    .bundle()
    .on('error', function(err) {
      console.log(err);
      this.emit('end');
    })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/dist/js'));
});

// Bundle our scss files
gulp.task('sass', function() {
    const processors = [
        autoprefixer({browsers: ['last 1 version']})
    ];
    return gulp.src('./client/scss/app.scss')
        .pipe(sass())
        .pipe(postcss(processors))
        .on('error', function(err) {
          console.log(err);
          this.emit('end');
        })
        .pipe(gulp.dest('./public/dist/css'));
});

gulp.task('watch', function() {
  gulp.watch('./client/**/*.js', ['bundle:dev']);
  gulp.watch('./client/**/*.scss', ['sass']);
});

gulp.task('start', function () {
  nodemon({
    script: './bin/www'
  , ext: 'js html'
  , env: { 'NODE_ENV': 'development' }
  })
});

gulp.task('default', ['bundle:dev', 'sass', 'start', 'watch']);
