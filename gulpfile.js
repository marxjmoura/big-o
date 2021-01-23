const gulp = require('gulp')
const connect = require('gulp-connect')
const rename = require("gulp-rename")
const handlebars = require('./handlebars')

gulp.task('build-html', () => {
  return gulp.src('index.hbs')
    .pipe(handlebars())
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest('.'))
})

gulp.task('build', gulp.parallel('build-html'))

gulp.task('watch', done => {
  gulp.watch('./**/*.hbs', gulp.series('build-html'))
  done()
})

gulp.task('serve', done => {
  connect.server({ root: '.', port: 8888 })
  connect.serverClose()

  done()
})

gulp.task('start', gulp.series('serve', 'watch', 'build'))
