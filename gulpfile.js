var gulp = require('gulp');

var bower = require('main-bower-files');

var htmlhint = require('gulp-htmlhint');

var less = require('gulp-less');
var imagemin = require('gulp-imagemin');
var del = require('del');
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var ejs = require('gulp-ejs');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var ftp = require('gulp-ftp');
var jshint = require('gulp-jshint');
var please = require('gulp-pleeease');
var coffee = require('gulp-coffee');
// var jasmine = require('gulp-jasmine');

// init /////////////////////////////////////////////////////////////////////////////////////
gulp.task('bower', function() {
  return gulp.src(bower({
      includeDev: true
    }))
    .pipe(gulp.dest('dev/assets/js/libs/'));
});

gulp.task('init', ['bower']);

// dev //////////////////////////////////////////////////////////////////////////////////////
// html /////////////////////////////////////////////////////////////////////////////////////
gulp.task('html', function() {
  return gulp.src('dev/**/*.html')
    .pipe(gulp.dest('preview/'));
});

gulp.task('validateHTML', ['html'], function() {
  return gulp.src('preview/**/*.html')
    .pipe(htmlhint())
    .pipe(htmlhint.reporter());
});

// css //////////////////////////////////////////////////////////////////////////////////////
gulp.task('css', ['less'], function() {
  return gulp.src('preview/**/*.css')
    .pipe(plumber())
    .pipe(please({
      'minifier': false,
      'autoprefixer': {
        'browsers': ['last 4 version', 'ie 8', 'iOS 4', 'Android 2.3']
      }
    }))
    .pipe(gulp.dest('preview/'));
});

gulp.task('less', function() {
  return gulp.src(['dev/assets/styles/*.less'])
    .pipe(plumber())
    .pipe(less())
    .pipe(gulp.dest('preview/assets/styles/'));
});

// js ///////////////////////////////////////////////////////////////////////////////////////
gulp.task('js', function() {
  return gulp.src('dev/**/*.js')
    .pipe(gulp.dest('preview/'));
});

gulp.task('validateJS', ['js'], function() {
  return gulp.src(['preview/**/*.js', '!preview/shared/js/libs/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter());
});

// gulp.task('coffee', function() {
//   return gulp.src(['dev/**/*.coffee'])
//     .pipe(coffee())
//     .pipe(gulp.dest('preview/'));
// });

// files ///////////////////////////////////////////////////////////////////////////////////////
gulp.task('files', function() {
  return gulp.src(['dev/**/*.png', 'dev/**/*.jpg', 'dev/**/*.gif', 'dev/**/*.csv', 'dev/**/*.json'])
    .pipe(plumber())
    .pipe(gulp.dest('preview/'));
});

// other ///////////////////////////////////////////////////////////////////////////////////////
gulp.task('browserSync', ['watch', 'html', 'css', 'js', 'files'], function() {
  return browserSync.init(null, {
    server: {
      baseDir: 'preview/'
    }
  });
});

gulp.task('liveReloadCSS', ['css'], function() {
  return browserSync.reload();
});
gulp.task('liveReloadHTML', ['html'], function() {
  return browserSync.reload();
});
gulp.task('liveReloadJS', ['js'], function() {
  return browserSync.reload();
});
gulp.task('liveReloadFiles', ['files'], function() {
  return browserSync.reload();
});

gulp.task('watch', function() {
  gulp.watch(['dev/**/*.less'], ['liveReloadCSS']);
  gulp.watch(['dev/**/*.html'], ['liveReloadHTML']);
  gulp.watch(['dev/**/*.js'], ['liveReloadJS']);
  gulp.watch(['dev/**/*.png', 'dev/**/*.jpg', 'dev/**/*.gif', 'dev/**/*.csv', 'dev/**/*.json'], ['liveReloadFiles']);
});

gulp.task('default', ['browserSync']);



// build //////////////////////////////////////////////////////////////////////////////////////
gulp.task('imagemin', function() {
  return gulp.src(['preview/**/*.png', 'preview/**/*.jpg', 'preview/**/*.gif'])
    .pipe(imagemin())
    .pipe(gulp.dest('pub/'));
});

gulp.task('compressHTML', function() {
  return gulp.src('preview/**/*.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('pub/'));
});

gulp.task('compressCSS', function() {
  return gulp.src('preview/**/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('pub/'));
});

gulp.task('compressJS', function() {
  return gulp.src('preview/**/*.js')
    .pipe(uglify({
      preserveComments: 'some'
    }))
    .pipe(gulp.dest('pub/'));
});

gulp.task('clean', ['imagemin', 'compressHTML', 'compressCSS', 'compressJS'], function(cb) {
  return del([], cb);
});

gulp.task('build', ['clean']);
