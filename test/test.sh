#!/bin/bash

set -e

set -o xtrace

THISFILE=${BASH_SOURCE[0]}
DIR="$( cd "$( dirname "${THISFILE}" )" && pwd -P )"



# might be problem if $DIR will contain space :/
rm -rf $DIR/../var/logs/*
rm -rf $DIR/../make/tmp.counter
/bin/bash "$DIR/001.sh"
diff -r "$DIR/../var/logs/" "$DIR/../test/001/"


echo "All tests passed ..."




