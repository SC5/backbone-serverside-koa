# Backbone Serverside, KOA example

This is an example on how to build, package and run an isomorphic Backbone application. It is
based on [Gulp BoBrSASS Boilerplate](https://github.com/SC5/gulp-bobrsass-boilerplate) and
demonstrates the use of [Backbone Server-side Adapters](https://github.com/SC5/backbone-serverside-adapters).

## How does it work?

Node.js can execute JavaScript in a sandbox that does not pollute node.js global scope.
This sandbox has no node.js globals or anything, so it is a perfect clean slate for
executing isomorphic apps in a sandbox. The isomorphic app is compiled, and when a
HTTP request arrives, the application script is executed in a new context in its own
sandbox. This permits the

Browserify creates self-contained application bundles which fits to the idea of running
applications in isolation. In theory, this permits storing the contexts between requests,
so contrary to several earlier approaches, we could simulate stateful browsing between pages
using this approach.

## Installation

If you don't already have node.js 0.11.9 or later, fetch it from
[nodejs.org](http://www.nodejs.org/). In addition we need a few dependencies
you may have.

    > npm install -g gulp

In addition, you will need [Ruby](https://www.ruby-lang.org/en/downloads/) to use
Compass framework for compiling SASS stylesheets into CSS and sprite sheets:

    > gem update --system
    > gem install sass
    > gem install compass

Note that you may need to first uninstall other SASS versions than (3.2.x).

Installing the project itself is easy. Both build system dependencies and app dependencies are
triggered by

    > npm install

It actually performs a release build, too (to verify that everything is ok).

## Building

The build is based on BoBrSASS, so the same commands apply. What you will need here to get started is:

    > npm install     # to install & update dependencies
    > gulp            # for builds
    > gulp clean      # for cleanup
    > gulp watch      # to monitor source code changes
    > npm start       # to start the server

## Running the Service

To start the service, you need to first need to have a successful build. Then start the service:

    > npm start

You are perfectly able to run 'gulp watch', the server will listen to modifications in 'index.html'
and 'bundle-server.js'. You may want to turn off server-side or client-side processing by using
the query string parameters

    http://localhost:8080/?browser=off
    http://localhost:8080/?server=off

##  Extending & Hacking

###  Project layout

#### App

    src/                    The client-side source code
    src/index.html          The HTML entry point, stub page
    src/app                 Application source code
    src/app/main.js         The browser app JS entry point
    src/app/main-server.js  The server app JS entry point
    src/app/app.js          The common root- dependency pulled by both entry points
    src/components          The 3rd party JS dependencies
    src/css                 The CSS templates

####  Build System

    gulpfile.js             The Gulp build configuration
    bower.json              The Bower components
    .bowerrc                The Bower directory overrides
    package.json            The build level dependencies

### Build Results

    dist/bundle-server      The build results (browser and server bundles)
    dist/index.html         The HTML stub that is transformed by the server
    dist/assets/            Static assets (everything that browser loads except html

## TODO

* Source map support for the server-side bundles. Now debugging is real hard!
* Demonstrate user sessions, e.g. how the app state is stored between requests

## Release History

* 2014/03/07 - v0.1.0 - Initial commit (a working example)

## License

Copyright (c) 2014 [SC5 Online](http://sc5.io/), licensed for users and contributors under
[MIT license](http://opensource.org/licenses/MIT).


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/SC5/backbone-serverside-koa/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
