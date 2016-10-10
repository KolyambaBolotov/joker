var gulp = require('gulp'),
	concatCss = require('gulp-concat-css'),
	watch = require('gulp-watch'),
	livereload = require('gulp-livereload'),
	connect = require('gulp-connect'),
	rigger = require('gulp-rigger');


gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});


gulp.task('concat', function () {
  return gulp.src('css/*.css')
    .pipe(concatCss("style.css"))
    .pipe(gulp.dest('app/css'))
    .pipe(livereload())
    .pipe(connect.reload());
});

// html go
/*gulp.task('html', function () {
  return gulp.src('index.html')
    .pipe(gulp.dest('app'))
    
});*/


gulp.task('html', function () {
	return gulp.src('index.html')
    .pipe(rigger())
    .pipe(gulp.dest('app/'))
    .pipe(livereload())
    .pipe(connect.reload());
});


gulp.task('watch', function () {/*
	livereload.listen();*/
	gulp.watch('css/*.css', ['concat']);
	gulp.watch(['*.html', 'templates/*.html'], ['html']);
});

gulp.task('default', ['connect', 'concat', 'html', 'watch']);


