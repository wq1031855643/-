var gulp = require('gulp');
var srever = require('browser-sync').create();
var load = require('gulp-load-plugins')();

gulp.task('scss',function(){
    gulp.src('./scss/*.scss')
    .pipe(load.sass())
    .pipe(gulp.dest('./css/'))
})
gulp.task('comp',function(){
    gulp.watch('./scss/JobMessage.scss',['scss'])
})



gulp.task('default',['comp'])
