'use strict'

// Packages
const gulp = require('gulp')
const archiver = require('gulp-archiver')
const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync').create()
const cssnano = require('gulp-cssnano')
const concat = require('gulp-concat')
const del = require('del')
const imagemin = require('gulp-imagemin')
const notify = require('gulp-notify')
const nunjucks = require('gulp-nunjucks-render')
const pkg = require('./package.json')
const plumber = require('gulp-plumber')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const surge = require('gulp-surge')
const uglify = require('gulp-uglify')

// Paths
const paths = {
  archive: {
    input: 'dist/**',
    output: 'build/'
  },
  deploy: {
    root: 'dist/'
  },
  images: {
    input: 'src/images/**/*.{gif,jpg,png,svg}',
    output: 'dist/images/',
    watch: 'src/images/**/*.{gif,jpg,png,svg}'
  },
  server: {
    root: 'dist/'
  },
  scripts: {
    input: 'src/scripts/*.js',
    output: 'dist/js/',
    watch: 'src/scripts/**/*.js'
  },
  styles: {
    input: 'src/styles/*.scss',
    output: 'dist/css/',
    watch: 'src/styles/**/*.scss'
  },
  templates: {
    input: ['src/templates/*.njk', '!src/templates/_*.njk'],
    output: 'dist/',
    watch: 'src/templates/**/*.njk'
  }
}

// Get Timestamp
const getTimestamp = () => {
  let date = new Date()

  let dateYear = date.getFullYear().toString()
  let dateMonth = ('0' + (date.getMonth() + 1)).slice(-2)
  let dateDay = ('0' + date.getDate()).slice(-2)
  let timeHour = date.getHours().toString()
  let timeMinute = date.getMinutes().toString()
  let timeSecond = date.getSeconds().toString()

  return (
    dateYear + dateMonth + dateDay + '-' + timeHour + timeMinute + timeSecond
  )
}

// On Error Configuration
const onError = err => {
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
 * Task: 'archive'
 *
 * Archive pre-existing content from output folders
 */
gulp.task(
  'archive',
  gulp.series(done => {
    gulp
      .src(paths.archive.input)
      .pipe(archiver(pkg.name + '_build_' + getTimestamp() + '.zip'))
      .pipe(gulp.dest(paths.archive.output))
      .pipe(
        notify({
          message: 'TASK: "archive" Completed! 💯',
          onLast: true
        })
      )

    // Signal completion
    done()
  })
)

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
 * Task: 'deploy'
 *
 * Publish your project to Surge.sh
 * For more information: https://surge.sh
 */
gulp.task(
  'deploy',
  gulp.series(done => {
    surge({
      project: paths.deploy.root,
      domain: pkg.name + '.surge.sh'
    })

    // Signal completion
    done()
  })
)

/**
 * Task: 'images'
 *
 * Optimise GIF, JPEG, PNG and SVG images
 */
gulp.task(
  'images',
  gulp.series(done => {
    gulp
      .src(paths.images.input)
      .pipe(
        imagemin({
          interlaced: true,
          progressive: true,
          optimizationLevel: 5,
          svgoPlugins: [
            {
              removeViewBox: true
            }
          ]
        })
      )
      .pipe(gulp.dest(paths.images.output))
      .pipe(browserSync.reload({ stream: true }))
      .pipe(
        notify({
          message: 'TASK: "images" Completed! 💯',
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
      .pipe(browserSync.reload({ stream: true }))
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
 * Task: 'styles'
 *
 * Compile, autoprefix & minify SASS files
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
      .pipe(browserSync.reload({ stream: true }))
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
      .pipe(browserSync.reload({ stream: true }))
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

/**
 * Task: 'build'
 *
 * Run all tasks
 */
gulp.task('build', gulp.series(['images', 'styles', 'scripts', 'templates']))

/**
 * Task: 'serve'
 *
 * Watch for changes to the `src` directory
 */
gulp.task(
  'serve',
  gulp.series(done => {
    browserSync.init({
      server: {
        baseDir: paths.server.root
      }
    })

    // Signal completion
    done()
  })
)

/**
 * Task: 'watch'
 *
 * Watch all file changes
 */
gulp.task('watch', () => {
  gulp.watch(paths.styles.watch, gulp.series('styles'))
  gulp.watch(paths.scripts.watch, gulp.series('scripts'))
  gulp.watch(paths.templates.watch, gulp.series('templates'))
})

// Default
gulp.task(
  'default',
  gulp.series(['clean', 'build', gulp.parallel('watch', 'serve')])
)
