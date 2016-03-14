var gulp = require('gulp');
var react = require('gulp-react');
var browserify = require('gulp-browserify');
gulp.task('default', function () {
	
    return gulp.src('public/views/reactViews/*.js')
        .pipe(react())
        .pipe(gulp.dest('public/templates'));
});
// Basic usage 
gulp.task('scripts', function() {
    // Single entry point to browserify 
    gulp.src('public/views/appMain.js')
        .pipe(browserify({
          insertGlobals : true,
          debug : !gulp.env.production
        }))
        .pipe(gulp.dest('public/bundle.js'))
});