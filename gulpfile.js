const gulp = require('gulp')
const connect = require('gulp-connect')
const rename = require("gulp-rename")
const handlebars = require('./handlebars')

gulp.task('build', () => {
  return gulp.src('index.hbs')
    .pipe(handlebars())
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest('.'))
})

gulp.task('test', function(done) {
  karma.start({
    configFile: `${__dirname}/karma.conf.js`,
    singleRun: true
  }, done);
});

gulp.task('watch', done => {
  gulp.watch('./**/*.{css,js,hbs}', gulp.series('build'))
  done()
})

gulp.task('serve', done => {
  connect.server({ root: '.', port: 8888 })
  connect.serverClose()

  done()
})

gulp.task('start', gulp.series('serve', 'watch', 'build'))
