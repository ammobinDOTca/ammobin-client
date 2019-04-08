var gulp = require('gulp');
var imageResize = require('gulp-image-resize');

gulp.task('default', function () {
  gulp.src('static/logos/*')
    .pipe(imageResize({
      height: 88,
      upscale: false
    }))
    .pipe(gulp.dest('static/logos/'));
});
