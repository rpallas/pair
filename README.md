[![Build Status](http://192.81.221.113/github.com/rpallas/pair/status.png?branch=develop)](http://192.81.221.113/github.com/rpallas/pair)
[![Code Climate](https://codeclimate.com/repos/532a604be30ba013f80018a5/badges/e2434002976dab0f711d/gpa.png)](https://codeclimate.com/repos/532a604be30ba013f80018a5/feed)
pair
====

A social app you can use to find a pairing buddy

Check the [wiki](https://github.com/rpallas/pair/wiki)

> **Live site**: http://paired.herokuapp.com

> **Dev site**: http://paired-dev.herokuapp.com

> **Staging site**: http://paired-stage.herokuapp.com

Go look at the [huboard](https://huboard.com/rpallas/pair) to pick up [issues](https://github.com/rpallas/pair/issues) or add new ones.

Development Guide
=================

### Requirements

 * npm install -g grunt-cli
 * npm install -g karma-cli
 * npm install -g nodemon

### Details

    git clone https://github.com/rpallas/pair.git
    cd pair
    npm install
    nodemon server.js
    grunt watch

### Contributing

Please branch and use [pull requests](https://help.github.com/articles/using-pull-requests) when contributing.

### CI (drone)

There is a drone server running [here](http://192.81.221.113/github.com/rpallas/pair).
It runs `npm install` and `grunt` for each github push and deploys to the paired-dev
environment (see below) if the build succeeds.

Deployment Guide
=================

### Requirements

 * [Heroku Toolbelt](https://toolbelt.heroku.com/)
 * [Enable Heroku Pipelines](https://devcenter.heroku.com/articles/labs-pipelines#enable-pipelines) labs feature

### Details

The code is deployed to 3 separate heroku apps:

 * [paired](http://paired.herokuapp.com/) (live)
 * [paired-dev](http://paired-dev.herokuapp.com/)
 * [paired-stage](http://paired-stage.herokuapp.com/)

[Heroku Pipelines](https://devcenter.heroku.com/articles/labs-pipelines) are used to control flow between the environments.

    Pipeline: paired-dev ---> paired-stage ---> paired

The following commands are used to view the pipeline and promote environments downstream

    $ heroku pipeline --app paired-dev
    Pipeline: paired-dev ---> paired-stage ---> paired

    $ heroku pipeline:promote --app paired-dev
    Promoting paired-dev to paired-stage......done, v8

    $ heroku pipeline:promote --app paired-stage
    Promoting paired-stage to paired.....done, v28
