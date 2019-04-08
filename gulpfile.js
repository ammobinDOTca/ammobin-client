var gulp = require('gulp')
var imageResize = require('gulp-image-resize')
const imagemin = require('gulp-imagemin');

gulp.task('default', function () {
  gulp
    .src('static/logos/*')
    .pipe(
      imageResize({
        height: 88,
        upscale: false,
      })
    )
    .pipe(imagemin())
    .pipe(gulp.dest('static/logos/'))
})
