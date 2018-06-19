
[![npm version](https://badge.fury.io/js/bash-make-lifecycle@2x.png)](https://badge.fury.io/js/bash-make-lifecycle)
[![Build Status](https://travis-ci.org/stopsopa/bash-make-lifecycle.svg?branch=master)](https://travis-ci.org/stopsopa/bash-make-lifecycle)



# Purpose of this library

Provide tested set of bash script to run, stop, and keep running any script.

# requirements

- [forever](https://www.npmjs.com/package/forever) - [version](https://github.com/stopsopa/bash-make-lifecycle/blob/master/package.json#L3)

# npx usage

    npx bash-make-lifecycle
    
    or 
    
    npx bash-make-lifecycle target-dir

# about "forever"

- [--spinSleepTime](https://stackoverflow.com/a/37166482/5560682)

# Docker
 
 
to test in docker/linux

    docker build -t node:bash-make-lifecycle .
    docker run -it -v "$PWD":/usr/src/myapp -w "/usr/src/myapp" -e TRAVIS=true --cap-add=SYS_TIME node:bash-make-lifecycle make t


- [more about --cap-add=SYS_TIME](https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities)

 
 