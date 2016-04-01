'use strict';
 
var gulp = require('gulp');
var gp_sass = require('gulp-sass');
var gp_uglifycss = require('gulp-uglifycss');
var gp_cleancss = require('gulp-clean-css');
var gp_browserSync = require('browser-sync').create();
var gp_runsequence = require('run-sequence');

var APP_NAME = require('./package.json').filename;

gulp.task('build-dev', function(done) {
    gp_runsequence(
        'sass',
        'dist-css',
        done);
});

gulp.task('updatebrowsers', function() {
	gp_browserSync.reload
});
gulp.task('sass:watch', function () {
  gulp.watch('./utk/sass/' + APP_NAME + '.scss', ['sass']);
});




gulp.task('sass', function () {
  return gulp.src('./utk/sass/' + APP_NAME + '.scss')
    .pipe(gp_sass().on('error', gp_sass.logError))
    .pipe(gulp.dest('./utk/css'));
});
 

gulp.task('dist-css', function(){
	gulp.src('./utk/css/' + APP_NAME + '.css')
    .pipe(gp_uglifycss({
      "maxLineLen": 80,
      "uglyComments": true
     }))
    .pipe(gp_cleancss({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(gp_browserSync.stream());
});


gulp.task('app', ['sass'], function() {
    gp_browserSync.init({
		server: {
		    baseDir: "app",
		    routes: {
		        "/dist": "dist"
		    }
		}
    });

    gulp.watch(['./utk/sass/*.scss','./utk/js/*.js'], ['build-dev']);
    gulp.watch('app/*.html').on('change', gp_browserSync.reload);
});




gulp.task('default', ['build-dev', 'app'], function(){});
