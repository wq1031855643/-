var gulp = require("gulp");
var load = require("gulp-load-plugins")();
// var gutil = require("gulp-util");

gulp.task('minifyJS', function () {
    gulp.src('./js/headMod.js') // 要压缩的js文件
    .pipe(load.uglify()) //使用uglify进行压缩
    .pipe(gulp.dest('./dist/js/'));//写入js文件夹
});

gulp.task('minifyCss', function () {
    gulp.src('./css/*.css') // 要压缩的css文件
    .pipe(load.minifyCss()) //压缩css
    .pipe(gulp.dest('./dist/css'));//写入dist文件夹
});

gulp.task('minifyHtml', function () {
    gulp.src('./index.html') //要压缩的html文件
    .pipe(load.minifyHtml()) //压缩html
    .pipe(gulp.dest('./dist/'));//写入dist文件夹
});