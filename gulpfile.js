'use strict';
 
var gulp = require('gulp');
var gp_sass = require('gulp-sass');
var gp_uglifycss = require('gulp-uglifycss');
var gp_uglifyjs = require('gulp-uglify');
var gp_cleancss = require('gulp-clean-css');
var gp_autoprefixer = require('gulp-autoprefixer');
var gp_include = require("gulp-include");
var gp_rename = require("gulp-rename");
var gp_stripdebug = require("gulp-strip-debug");
var gp_browserSync = require('browser-sync').create();
var gp_runsequence = require('run-sequence');

var APP_NAME = require('./package.json').filename;


gulp.task('default', ['build-dev', 'app'], function(){});


/* build sass/js */
gulp.task('build-dev', function(done) {
    gp_runsequence(
        'sass',
        'dist-css',
        'js',
        'dist-js',
        done);
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

    /* utk updated */
    gulp.watch(['./utk/sass/*.scss','./utk/js/*.js'], ['build-dev']);

    /* app updated */
    gulp.watch('app/*.*').on('change', gp_browserSync.reload);
});


gulp.task('sass', function () {
  return gulp.src('./utk/sass/' + APP_NAME + '.scss')
    .pipe(gp_sass().on('error', gp_sass.logError))
    .pipe(gp_autoprefixer())
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


gulp.task('js', function () {
  return gulp.src('./utk/js/' + APP_NAME + '.js')
    .pipe(gp_include())
    .pipe(gp_uglifyjs())
    .pipe(gp_rename('./utk/js.min/' + APP_NAME + '.min.js'))
      .on('error', console.log)
	.pipe(gulp.dest('./'));
});


gulp.task('dist-js', function(){
	gulp.src('./utk/js.min/' + APP_NAME + '.min.js')
    .pipe(gp_stripdebug())
    .pipe(gulp.dest('./dist/js/'))
    .pipe(gp_browserSync.stream());
}); 



/* phase out */

gulp.task('updatebrowsers', function() {
	gp_browserSync.reload
});

gulp.task('sass:watch', function () {
  gulp.watch('./utk/sass/' + APP_NAME + '.scss', ['sass']);
});


