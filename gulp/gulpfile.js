var gulp = require("gulp");
var sass = require("gulp-sass");


gulp.task('scss',function () {
    gulp.src('../scss/posi.scss')
    .pipe(sass())
    .pipe(gulp.dest('../css/'));
});

gulp.task('Sass',function () {
    gulp.watch('../scss/posi.scss',['scss']);
});