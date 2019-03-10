'use strict'

// Packages
const gulp = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const cssnano = require('gulp-cssnano')
const notify = require('gulp-notify')
const plumber = require('gulp-plumber')
const rename = require('gulp-rename')
const sass = require('gulp-sass')

// Paths
const paths = {
  styles: {
    input: 'src/styles/style.scss',
    output: 'dist/css/style.css',
    watch: 'src/styles/**/*.scss'
  }
}

// On Error Configuration
const onError = function(err) {
  notify.onError({
    title: 'Gulp',
    subtitle: 'Failure!',
    message: 'Error: <%= error.message %>',
    sound: 'Beep'
  })(err)
  this.emit('end')
}

//
// TASKS
//

// Styles
gulp.task('styles', done => {
  gulp
    .src(paths.styles.input)
    .pipe(
      plumber({
        errorHandler: onError
      })
    )
    .pipe(
      sass({
        outputStyle: 'expanded'
      })
    )
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      })
    )
    .pipe(gulp.dest(paths.styles.output))
    .pipe(cssnano())
    .pipe(
      rename({
        suffix: '.min'
      })
    )
    .pipe(gulp.dest(paths.styles.output))

  // Signal completion
  done()
})

// Build
gulp.task('build', gulp.series('styles'))

// Watch
gulp.task('watch', () => {
  gulp.watch(paths.styles.watch, gulp.series('styles'))
})

// Default
gulp.task('default', gulp.series(['build', 'watch']))
