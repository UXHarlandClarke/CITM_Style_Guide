'use strict';
 
var gulp = require('gulp');
var gp_sass = require('gulp-sass');
var gp_uglifycss = require('gulp-uglifycss');
var gp_cleancss = require('gulp-clean-css');

gulp.task('sass', function () {
  return gulp.src('./sass/*.scss')
    .pipe(gp_sass().on('error', gp_sass.logError))
    .pipe(gulp.dest('./css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./sass/*.scss', ['sass']);
});

gulp.task('dist', function(){
	gulp.src('./css/*.css')
    .pipe(gp_uglifycss({
      "maxLineLen": 80,
      "uglyComments": true
     }))
    .pipe(gp_cleancss({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['sass', 'dist'], function(){});