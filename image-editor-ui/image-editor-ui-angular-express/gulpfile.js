var gulp = require('gulp');
var run = require('gulp-run');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var runSeq = require('run-sequence');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var rename = require('gulp-rename');
var mocha = require('gulp-mocha');
var babel = require('gulp-babel');

// Live reload
gulp.task('reload', function() {
    livereload.reload();
})

// Default
gulp.task('default', function() {
    livereload.listen();
    gulp.start('build');

    gulp.watch(['client/pre-build/app.js', 'client/pre-build/**/*.js'], function() {
        runSeq('buildJS', 'reload');
    });

    gulp.watch(['client/pre-build/app.scss', 'client/pre-build/**/*.scss'], function() {
        runSeq('buildCSS', 'reload');
    });

    // Reload when a template (.html) file changes.
    gulp.watch(['client/**/*.html', 'server/*.html'], ['reload']);

    gulp.watch(['server/**/*.js'], ['testServerJS']);

});


// Database seed
gulp.task('seedDB', function() {
    run('node seed.js').exec();
});


// Build tasks
//// Build all
gulp.task('build', function() {
    runSeq(['buildJS', 'buildCSS']);
});

gulp.task('buildJS', function() {
    return gulp.src(['./client/pre-build/app.js', './client/pre-build/**/*.js'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('build.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./client/build'));
});

gulp.task('buildCSS', function() {
    return gulp.src('./client/pre-build/app.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(rename('build.css'))
        .pipe(gulp.dest('./client/build'));
});


// Testing
gulp.task('testServerJS', function() {
    return gulp.src('./server/**/*.spec.js', {
            read: false
        })
        .pipe(mocha({
            reporter: 'spec'
        }));
});