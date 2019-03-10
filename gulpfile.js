'use strict'

// Packages
const gulp = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const cssnano = require('gulp-cssnano')
const concat = require('gulp-concat')
const del = require('del')
const notify = require('gulp-notify')
const nunjucks = require('gulp-nunjucks-render')
const plumber = require('gulp-plumber')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const uglify = require('gulp-uglify')

// Paths
const paths = {
  styles: {
    input: 'src/styles/*.scss',
    output: 'dist/css/',
    watch: 'src/styles/**/*.scss'
  },
  scripts: {
    input: 'src/scripts/*.js',
    output: 'dist/js/',
    watch: 'src/scripts/**/*.js'
  },
  templates: {
    input: ['src/templates/*.njk', '!src/templates/_*.njk'],
    output: 'dist/',
    watch: 'src/templates/**/*.njk'
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

/**
 * Task: 'clean'
 *
 * Remove pre-existing content from output folders
 */
gulp.task(
  'clean',
  gulp.series(done => {
    // Clean the dist folder
    del.sync(['dist/'])

    // Signal completion
    done()
  })
)

/**
 * Task: 'styles'
 *
 * Compile, autoprefix  & minify SASS files
 */
gulp.task(
  'styles',
  gulp.series(done => {
    gulp
      .src(paths.styles.input)
      .pipe(
        sass({
          outputStyle: 'expanded'
        }).on('error', onError)
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
      .pipe(
        notify({
          message: 'TASK: "styles" Completed! 💯',
          onLast: true
        })
      )

    // Signal completion
    done()
  })
)

/**
 * Task: 'scripts'
 *
 * Concanate & minify JavaScript files
 */
gulp.task(
  'scripts',
  gulp.series(done => {
    gulp
      .src(paths.scripts.input)
      .pipe(
        plumber({
          errorHandler: onError
        })
      )
      .pipe(concat('scripts.js'))
      .pipe(gulp.dest(paths.scripts.output))
      .pipe(uglify())
      .pipe(
        rename({
          suffix: '.min'
        })
      )
      .pipe(gulp.dest(paths.scripts.output))
      .pipe(
        notify({
          message: 'TASK: "scripts" Completed! 💯',
          onLast: true
        })
      )

    // Signal completion
    done()
  })
)

/**
 * Task: 'templates'
 *
 * Compile Nunjucks files to HTML
 */
gulp.task(
  'templates',
  gulp.series(done => {
    gulp
      .src(paths.templates.input)
      .pipe(
        nunjucks({
          path: ['src/templates']
        })
      )
      .pipe(gulp.dest(paths.templates.output))
      .pipe(
        notify({
          message: 'TASK: "templates" Completed! 💯',
          onLast: true
        })
      )

    // Signal completion
    done()
  })
)

// Build
gulp.task('build', gulp.series(['styles', 'scripts', 'templates']))

// Watch
gulp.task('watch', () => {
  gulp.watch(paths.styles.watch, gulp.series('styles'))
  gulp.watch(paths.scripts.watch, gulp.series('scripts'))
  gulp.watch(paths.templates.watch, gulp.series('templates'))
})

// Default
gulp.task('default', gulp.series(['clean', 'build', 'watch']))
