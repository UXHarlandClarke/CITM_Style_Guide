'use strict';
 
var gulp = require('gulp');
var gp_sass = require('gulp-sass');
var gp_uglifycss = require('gulp-uglifycss');
var gp_uglifyjs = require('gulp-uglify');
var gp_cleancss = require('gulp-clean-css');
var gp_autoprefixer = require('gulp-autoprefixer');
var gp_include = require("gulp-include");
var gp_rename = require("gulp-rename");
var gp_html_replace = require("gulp-html-replace");
var gp_stripdebug = require("gulp-strip-debug");
var gp_github_pages = require("gulp-gh-pages");
var gp_browserSync = require('browser-sync').create();
var gp_runsequence = require('run-sequence');

var APP_NAME = require('./package.json').filename;

var options = {};
options.sass = {
  errLogToConsole: true,
  sourceMap: 'sass',
  sourceComments: 'map',
  precision: 10,
  imagePath: 'assets/img',
  includePaths: [
    'bower_components/bootstrap-sass/assets/stylesheets'
  ]
};
options.autoprefixer = {
  map: true,
  from: 'asset',
  to: 'asrp.min.css'
};


gulp.task('default', ['build-dev', 'app'], function(){});

gulp.task('deploybuild', function(done) {
    gp_runsequence(
        'build-dev',
        'buildstatic',
        done);
});


gulp.task('buildstatic', function(done) {
    gp_runsequence(
        'build-static-utk',
        'build-static-index',
        done);
});


/* build sass/js */
gulp.task('build-dev', function(done) {
    return gp_runsequence(
        'sass',
        'dist-css',
        'js',
        'dist-js',
        'dist-fonts',
        done);
});




/* build static app */
gulp.task('build-static-utk', function(done) {
    return gulp.src(['./app/**/*', './dist/**/*', '!./dist/app', '!./dist/app/**/*'])
        .pipe(gulp.dest('./dist/app/'));   
});

gulp.task('build-static-index', function(done) {
    return gulp.src('./app/index.html')
        .pipe(gp_html_replace({
              css: {
                src: [['css/citm.css']],
                tpl: '<link rel="stylesheet" href="%s">'
              },
              js: {
                src: [['js/citm.min.js']],
                tpl: '<script src="%s"></script>'
              }

        }))
        .pipe(gulp.dest('./dist/app/'));
});


gulp.task('deploy-utk', function() {
  return gulp.src('./dist/app/**/*')
    .pipe(gp_github_pages());
});


/* run tests */
gulp.task('build-test', function(done) {
    gp_runsequence(
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
    .pipe(gp_sass(options.sass).on('error', gp_sass.logError))
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

gulp.task('dist-fonts', function(){
    gulp.src(['bower_components/bootstrap-sass/assets/fonts/**/*'])
    .pipe(gulp.dest('./dist/fonts/'));
}); 

/* phase out */

gulp.task('updatebrowsers', function() {
	gp_browserSync.reload
});

gulp.task('sass:watch', function () {
  gulp.watch('./utk/sass/' + APP_NAME + '.scss', ['sass']);
});


