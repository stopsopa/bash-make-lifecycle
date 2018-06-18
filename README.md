
[![Build Status](https://travis-ci.org/stopsopa/bash-make-lifecycle.svg?branch=master)](https://travis-ci.org/stopsopa/bash-make-lifecycle)

# about "forever"

- [--spinSleepTime](https://stackoverflow.com/a/37166482/5560682)

# Docker


 
 
to test in docker/linux

    docker build -t node:bash-make-lifecycle .
    docker run -it -v "$PWD":/usr/src/myapp -w "/usr/src/myapp" -e TRAVIS=true --cap-add=SYS_TIME node:bash-make-lifecycle make t


- [more about --cap-add=SYS_TIME](https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities)

 
 