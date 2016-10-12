var gulp = require('gulp'),
	concatCss = require('gulp-concat-css'),
	watch = require('gulp-watch'),
	livereload = require('gulp-livereload'),
	connect = require('gulp-connect'),
	rigger = require('gulp-rigger'),
  path = require('path'),
  less = require('gulp-less'),
  autoprefixer = require('gulp-autoprefixer');


gulp.task('less', function () {
  return gulp.src('less/style.less')
    .pipe(less())
    .pipe(gulp.dest('css/'));
});

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

gulp.task('prefix', () =>
    gulp.src('app/css/style.css')
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/css'))
);



gulp.task('html', function () {
	return gulp.src('index.html')
    .pipe(rigger())
    .pipe(gulp.dest('app/'))
    .pipe(livereload())
    .pipe(connect.reload());
});


gulp.task('watch', function () {
	gulp.watch('css/*.css', ['concat']);
  gulp.watch('index.html', ['html']);
  gulp.watch('less/style.less', ['less']);
  gulp.watch('style.css', ['prefix']);

});

gulp.task('default', [ 'connect','less', 'concat', 'prefix', 'html', 'watch']);


