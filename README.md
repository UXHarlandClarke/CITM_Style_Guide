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
  # in general, you will just want to run the local webservice that will watch all directories and auto-build
  gulp

```

## All resources will be compiled to /dist for deployment


## Travis

Travis-CI is our build system and is responsible for making the /dist build for auto-deployment

Make sure Ruby is installed:

```
	$ brew install ruby
	$ gem update --system
```

Install the travis cli

`sudo gem install travis -v 1.8.2 --no-rdoc --no-ri`

Use travis to test builds, manage travis.yml