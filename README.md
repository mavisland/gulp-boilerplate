# gulp-boilerplate

A boilerplate for building web projects with [Gulp](https://gulpjs.com/) 4.x.

## Getting Started

### Features

- Compile, minify, autoprefix SASS files.
- Concatenate and minify JavaScript.
- Render Nunjucks templates.
- Watch for file changes, and automatically recompile build.

### Quick Start

```
# 1 Clone this repo
git clone https://github.com/mavisland/gulp-boilerplate.git

# 2 Navigate into the repo directory
cd gulp-boilerplate

# 3 Install all node packages
npm install

# 4 Get started
gulp
```

### Requirements

This project requires you have [nodejs](https://nodejs.org/en/) with [npm](https://www.npmjs.com/get-npm) installed.
This project requires you have a global installation of [gulp](http://gulpjs.com/).

```
# Install gulp globally
npm install -g gulp
npm install -g gulp-cli
```

## Documentation

Add your source files to the appropriate `src` subdirectories. Gulp will process and and compile them into `dist`.

### Styles

Files in the `src/styles` directory will be compiled to `dist/css`.

### Scripts

Put your JavaScript files in the `src/scripts` directory. Files placed directly in the `src/scripts` folder will compile directly to `dist/js` as both minified and unminified files.

### Templates

Put your Nunjucks templates in the `src/templates` directory. Files placed directly in the `src/templates` folder will compile directly to `dist`.

## Options

### Paths

Adjust the `input`, `output`, `watch` paths for all of the Gulp tasks under the `paths` variable. Paths are relative to the root project folder.

```js
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
```

## License

The code is available under the [MIT License](LICENSE.md).
