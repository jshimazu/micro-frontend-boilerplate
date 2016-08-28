var gulp = require('gulp');
var pug = require('gulp-pug');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');

const SRC_DIR     = "./src"; // コンパイル元
const DIST_DIR    = "./public"; // コンパイル先
const ROOT_DIR = "./public"; // サーバールート

// server & browsersync
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      //アプリケーションルートのディレクトリ
      baseDir: ROOT_DIR
    }
  });
  gulp.watch(SRC_DIR + '/**/*', ['build', browserSync.reload]);
});

// pug to html
gulp.task('html', function(){
  return gulp.src(SRC_DIR + '/views/*.pug')
    .pipe(pug({
      pretty: true,
    }))
    .pipe(gulp.dest(DIST_DIR));
})

// scss to css
gulp.task('css', function(){
  return gulp.src(SRC_DIR + '/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest(DIST_DIR + '/css'));
});

// js to js
gulp.task('js', function(){
  return gulp.src(SRC_DIR + '/js/**/*.js')
    .pipe(gulp.dest(DIST_DIR + '/js'));
});

// build all
gulp.task('build', ['html', 'css', 'js'])

gulp.task('watch', ['browser-sync']);

gulp.task('default', ['watch', 'build']);
