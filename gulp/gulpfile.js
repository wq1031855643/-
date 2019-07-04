var gulp = require("gulp");
var sass = require("gulp-sass");
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('minifyCss', function () {
    gulp.src('../css/comdetails.css') // 要压缩的css文件
    .pipe(minifyCss()) //压缩css
    .pipe(rename('comdetails.min.css'))
    .pipe(gulp.dest('../dist/css/'));//写入dist文件夹
});


gulp.task('minifyJS', function () {
    gulp.src('../js/comdetails.js') // 要压缩的js文件
    .pipe(uglify()) //使用uglify进行压缩
    .pipe(rename('comdetails.min.css'))
    .pipe(gulp.dest('../dist/js'));//写入js文件夹
});

gulp.task('scss',function () {
    gulp.src('../scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('../css/'));
});

gulp.task('Sass',function () {
    gulp.watch('../scss/*.scss',['scss']);
});