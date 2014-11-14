var gulp = require('gulp'),
  smoosher = require('gulp-smoosher');

gulp.task('smoosh', function () {
  gulp.src('src/demos/snowflake/snowflake.html')
    .pipe(smoosher())
//    .pipe(base64())
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function () {
  gulp.src('src/demos/snowflake/snowflake.png')
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['smoosh', 'images']);
