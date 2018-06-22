#!/bin/bash

set -e

set -o xtrace

git push origin master

npm version patch

npm publish


