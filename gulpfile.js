'use strict';
 
var gulp = require('gulp');
var gp_sass = require('gulp-sass');
var gp_uglifycss = require('gulp-uglifycss');
var gp_uglifyjs = require('gulp-uglify');
var gp_cleancss = require('gulp-clean-css');
var gp_autoprefixer = require('gulp-autoprefixer');
var gp_include_socket = require("gulp-include");
var gp_rename = require("gulp-rename");
var gp_html_replace = require("gulp-html-replace");
var gp_stripdebug = require("gulp-strip-debug");
var gp_github_pages = require("gulp-gh-pages");
var gp_browserSync = require('browser-sync').create();
var gp_runsequence = require('run-sequence');
var gp_util = require("gulp-util");
var gp_print = require("gulp-print");
var gp_include_ssi = require('gulp-html-ssi');
var gp_browserSync_ssi = require('browsersync-ssi');


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
options.oldprefixer = {
  map: true,
  from: 'asset',
  to: 'asrp.min.css'
};
options.autoprefixer = {
  browsers: ['> 1%', 'IE 9', 'IE 10'], 
  cascade: true 
};


gulp.task('default', function(done){
  console.log("\nUTK for ... \n");
  console.log(gp_util.colors.cyan("      ___                                   ___      "));
  console.log(gp_util.colors.cyan("     /  /\\        ___           ___        /__/\\     "));
  console.log(gp_util.colors.cyan("    /  /:/       /  /\\         /  /\\      |  |::\\    "));
  console.log(gp_util.colors.cyan("   /  /:/       /  /:/        /  /:/      |  |:|:\\   "));
  console.log(gp_util.colors.cyan("  /  /:/  ___  /__/::\\       /  /:/     __|__|:|\\:\\  "));
  console.log(gp_util.colors.cyan(" /__/:/  /  /\\ \\__\\/\\:\\__   /  /::\\    /__/::::| \\:\\ "));
  console.log(gp_util.colors.cyan(" \\  \\:\\ /  /:/    \\  \\:\\/\\ /__/:/\\:\\   \\  \\:\\~~\\__\\/ "));
  console.log(gp_util.colors.cyan("  \\  \\:\\  /:/      \\__\\::/ \\__\\/  \\:\\   \\  \\:\\       "));
  console.log(gp_util.colors.cyan("   \\  \\:\\/:/       /__/:/       \\  \\:\\   \\  \\:\\      "));
  console.log(gp_util.colors.cyan("    \\  \\::/        \\__\\/         \\__\\/    \\  \\:\\     "));
  console.log(gp_util.colors.cyan("     \\__\\/                                 \\__\\/     "));
  console.log("\n\n\n");
  console.log(gp_util.colors.cyan(APP_NAME + " > gulp commands"));
  console.log(gp_util.colors.blue("---------------"));
  console.log(gp_util.colors.yellow("gulp help [none] (return list of commands)"));
  console.log(gp_util.colors.yellow("gulp local (build app and run local webservice)"));
  console.log(gp_util.colors.yellow("--------------------------"));
  console.log(gp_util.colors.yellow("gulp build (build app for deployment and run tests)"));
  console.log(gp_util.colors.yellow("gulp publish (build app for deployment and run tests)"));
  console.log("\n\n\n");
  return true;
});

gulp.task('help', ['default'], function(){});

gulp.task('build', function(done) {
    gp_runsequence(
        'build-dev',
        'buildstatic',
        done);
});

gulp.task('local', function(done) {
    gp_runsequence(
        'build-dev',
        'app',
        done);
});




gulp.task('buildstatic', function(done) {
    return gp_runsequence(
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
        'images',
        'dist-images',
        'dist-fonts',
        done);
});




/* build static app */
gulp.task('build-static-utk', function(done) {
    console.log(gp_util.colors.cyan("Moving DIST UTK resources (js,css,images,fonts)"));
    return gulp.src(['./app/**/*', './dist/**/*', '!./app/**/_*.html', '!./dist/app', '!./dist/app/**/*']) 
        .pipe(gulp.dest('./dist/app/'));   
});

gulp.task('build-static-index', function(done) {
    console.log(gp_util.colors.cyan("Building Static App Pages"));
    return gulp.src('./app/*.html')
        .pipe(gp_print())
        .pipe(gp_include_ssi())
        .pipe(gp_html_replace({
              citmcss: {
                src: [['utk/css/citm.css']],
                tpl: '<link rel="stylesheet" href="%s">'
              },
              citmjs: {
                src: [['utk/js/citm.min.js']],
                tpl: '<script src="%s"></script>'
              }

        }))
        .pipe(gulp.dest('./dist/app/'));
});


gulp.task('publish', function() {
  console.log(gp_util.colors.cyan("Publishing to Github Pages"));
  return gulp.src('./dist/app/**/*')
    .pipe(gp_print())
    .pipe(gp_github_pages());
});


/* run tests */
gulp.task('build-test', function(done) {
    gp_runsequence(
        done);
});

gulp.task('app', function(done) {

    console.log(gp_util.colors.cyan("Starting LIVE APP web service"));
    
    gp_browserSync.init({
		server: {
		    baseDir: "./app/",
        middleware: [  
          gp_browserSync_ssi({  
             baseDir: __dirname + "/app",  
             ext: ".html"  
          })  
        ], 
		    routes: {
		        "/dist": "dist/utk/"
		    }
		}
    });

    /* utk updated */
    gulp.watch(['./utk/sass/*.scss','./utk/js/*.js','./utk/img/**/*'], function(event) {
        console.log(gp_util.colors.cyan("UTK scss/js/img change detected"));
        gulp.start('build-dev');
    });


    /* app updated */
    gulp.watch('app/*.*').on('change', function(event) {
      console.log(gp_util.colors.cyan("App change detected"));
      gp_browserSync.reload()
    });

});


gulp.task('sass', function () {
  console.log(gp_util.colors.cyan("Building UTK SASS files"));
  return gulp.src('./utk/sass/' + APP_NAME + '.scss')
    .pipe(gp_print())
    .pipe(gp_sass(options.sass).on('error', gp_sass.logError))
    .pipe(gp_autoprefixer(options.autoprefixer))
    .pipe(gulp.dest('./dev/css')); // move the concat to dev
});
 

gulp.task('dist-css', function(){
  console.log(gp_util.colors.cyan("Building UTK SASS files for Dist"));
	return gulp.src('./dev/css/' + APP_NAME + '.css')
    .pipe(gp_print())
    .pipe(gp_uglifycss({
      "maxLineLen": 80,
      "uglyComments": true
     }))
    .pipe(gp_cleancss({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist/utk/css/'))
    .pipe(gp_browserSync.stream());
});


gulp.task('js', function () {
  console.log(gp_util.colors.cyan("Building UTK JS Vendor files"));
  // TODO - rename this vendor.min.js and setup a new app specific JS build task
  return gulp.src('./utk/js/' + APP_NAME + '.js')
    .pipe(gp_print())
    .pipe(gp_include_socket())
    .pipe(gp_rename({
          suffix: '.min'
        }))
    .on('error', console.log)
	  .pipe(gulp.dest('./dev/js/'));
});



gulp.task('dist-js', function(){
  console.log(gp_util.colors.cyan("Building UTK JS files for Dist"));
	return gulp.src('./dev/js/' + APP_NAME + '.min.js')
    .pipe(gp_print())
    .pipe(gp_uglifyjs())
    .pipe(gp_stripdebug())
    .pipe(gulp.dest('./dist/utk/js/'))
    .pipe(gp_browserSync.stream());
}); 


gulp.task('images', function () {
  console.log(gp_util.colors.cyan("Gathering UTK Images Files"));
  return gulp.src('./utk/img/**/*')
    .pipe(gp_print());
  //.pipe(gulp.dest('./dist/utk/img/'));
});


gulp.task('dist-images', function(){
    console.log(gp_util.colors.cyan("Moving APP and UTK Image files to Dist"));
    return gulp.src(['./utk/img/**/*'])
    .pipe(gp_print())
    .pipe(gulp.dest('./dist/utk/img/'));
});


gulp.task('dist-fonts', function(){
    console.log(gp_util.colors.cyan("Moving UTK FONT files to Dist"));
    return gulp.src(['bower_components/bootstrap-sass/assets/fonts/**/*'])
    .pipe(gp_print())
    .pipe(gulp.dest('./dist/utk/fonts/'));
}); 

 


/* phase out */

gulp.task('updatebrowsers', function() {
	gp_browserSync.reload()
});

gulp.task('sass:watch', function () {
  gulp.watch('./utk/sass/' + APP_NAME + '.scss', ['sass']);
});


