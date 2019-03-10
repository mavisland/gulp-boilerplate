# gulp-boilerplate

A boilerplate for building web projects with [Gulp](https://gulpjs.com/) 4.x.

## Getting Started

### Features

- Compile, minify, autoprefix SASS files.
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

## Options

### Paths

Adjust the `input`, `output`, `watch` paths for all of the Gulp tasks under the `paths` variable. Paths are relative to the root project folder.

```js
/**
 * Paths to project folders
 */
// Paths
const paths = {
  styles: {
    input: 'src/styles/style.scss',
    output: 'dist/css/style.css',
    watch: 'src/styles/**/*.scss'
  }
}
```

## License

The code is available under the [MIT License](LICENSE.md).
