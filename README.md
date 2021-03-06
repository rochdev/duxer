# Duxer

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Build Status](https://travis-ci.org/rochdev/duxer.svg?branch=master)](https://travis-ci.org/rochdev/duxer)
[![Dependency Status](https://gemnasium.com/badges/github.com/rochdev/duxer.svg)](https://gemnasium.com/github.com/rochdev/duxer)

The missing react/redux framework.

The goal of this project is to provide a framework for building, testing and bootstrapping React/Redux applications so
you can focus on coding instead of spending hours (or days) creating your own build process or customizing a starter
kit.

## Requirements

* node `^4.2.0`
* npm `^3.0.0`

## Features

* CSS modules
* SASS/SCSS
* PostCSS
* Babel compilation (with `es2015`, `react` and `stage-0` presets built-in)
* Unit testing using Mocha
* Lightweight Koa server
* Hot module reloading

#### Coming soon

* Universal application support
* Flow support
* Linting
* Redux store with support for lazy loading reducers
* Asynchronous route loading
* Code generation
* Command-line interface

## Usage

#### Installation

```bash
npm install --save rochdev/duxer
```

#### Commands

These are commands that you can use in any of your scripts in `package.json`:

* `duxer start` start a server serving files in `dist`
* `duxer dev` start a development server with hot module reloading
* `duxer test` run unit tests
* `duxer build` build the application and output to `dist`

## Configuration

The configuration is based on [node-config](https://github.com/lorenwest/node-config).

#### Options

* `language`

  The language to use for your project. Valid values are: `es5`, `es2015`, `stage-0`, `stage-1`, `stage-2`, `stage-3`.
  See the [babel documentation](https://babeljs.io/docs/plugins/) for the meaning of each stage.

  *Coming soon: `ts`*

* `chunks`

  Lists of dependencies to split into chunks. Anything else will go into the `app` default chunk.
  If one or more additional chunks are specified, any common dependencies will automatically be extracted to a `vendor`
  chunk.

#### Defaults

```json
{
  "language": "es5"
}
```

#### Example

```json
{
  "language": "stage-0",
  "chunks": {
    "vendor": [
      "history",
      "react",
      "react-redux",
      "react-router",
      "react-router-redux",
      "redux"
    ]
  }
}
```

## Credits

This project is based on the excellent [React Redux Starter Kit](https://github.com/davezuko/react-redux-starter-kit)
