
[![npm version](https://badge.fury.io/js/bash-make-lifecycle.svg)](https://badge.fury.io/js/bash-make-lifecycle)
[![Build Status](https://travis-ci.org/stopsopa/bash-make-lifecycle.svg?branch=master)](https://travis-ci.org/stopsopa/bash-make-lifecycle)



# Purpose of this library

Provide tested set of bash scripts to run, keep running, and stop any script.

# requirements

- [forever](https://www.npmjs.com/package/forever) - [version](https://github.com/stopsopa/bash-make-lifecycle/blob/master/package.json#L3)

# npx usage

    npx bash-make-lifecycle
    
    or 
    
    npx bash-make-lifecycle target-dir
    
then follow Makefile

    yarn
    make start
    make status    
    # now visit localhost:1025
    make stop
    make status    

# about "forever"

- [--spinSleepTime](https://stackoverflow.com/a/37166482/5560682)

# Docker
 
 
to test in docker/linux

    docker build -t node:bash-make-lifecycle .
    docker run -it -v "$PWD":/usr/src/myapp -w "/usr/src/myapp" -e TRAVIS=true --cap-add=SYS_TIME node:bash-make-lifecycle make t


- [more about --cap-add=SYS_TIME](https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities)

 
# Dev notes

To update this lib after commit just run:

    /bin/bash update.sh 