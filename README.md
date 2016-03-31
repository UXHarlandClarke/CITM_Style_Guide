# CITM Style Guide

## Setup
* OPTIONAL: [brew](http://brew.sh/) (for Mac, an installer)
* [Node](http://nodejs.org) for build tools (or for Mac: `sudo brew install node`)
* [bower](http://bower.io/) for build tools (install via: `sudo npm install -g bower`)
* [gulp](http://gulpjs.org) for build tools (install via: `sudo npm install -g gulp`)

  ```zsh
  # Do this once upon initial install and again when package.json updates.
  npm install

  # Do this once upon initial install and again when bower.json updates.
  bower install
  ```

## Performing Development

  ```zsh
  # One time compile:
  gulp sass

  or 

  # Update Sass on file change:
  gulp sass:watch

  ```

## All resources will be compiled to /css
