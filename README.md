# gulp-boilerplate

A boilerplate for building web projects with [Gulp](https://gulpjs.com/) 4.x.

## Getting Started

### Features

- Compile, minify, autoprefix SASS files.
- Concatenate and minify JavaScript.
- Render Nunjucks templates.
- Optimise GIF, JPEG, PNG and SVG images.
- Publish your project to [surge.sh](https://surge.sh/)
- Watch for file changes, and automatically recompile build and reload webpages.

### Quick Start

```
# 1 Clone this repo
git clone https://github.com/mavisland/gulp-boilerplate.git

# 2 Navigate into the repo directory
cd gulp-boilerplate

# 3 Install all node packages
npm install

# 4 Get started
npm run start
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

### Images

Place GIF, JPG, PNG and SVG images in the `src/images` directory. Images will be optimized with `imagemin` plugins and compiled into `dist/images`.

## Options

### Tasks

| Task Name | Task Decription                          |
| --------- | ---------------------------------------- |
| build     | Run all tasks                            |
| images    | Optimise GIF, JPEG, PNG and SVG images   |
| serve     | Watch for changes to the `src` directory |
| scripts   | Concanate & minify JavaScript files      |
| styles    | Compile, autoprefix & minify SASS files  |
| templates | Render Nunjucks templates                |
| watch     | Watch all file changes                   |

### Paths

Adjust the `input`, `output`, `watch` paths for all of the Gulp tasks under the `paths` variable. Paths are relative to the root project folder.

```js
// Paths
const paths = {
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
```

## License

The code is available under the [MIT License](LICENSE.md).
