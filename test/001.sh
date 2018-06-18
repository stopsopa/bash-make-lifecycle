#!/bin/bash

THISFILE=${BASH_SOURCE[0]}
DIR="$( cd "$( dirname "${THISFILE}" )" && pwd -P )"

DIR="$DIR/.."

cd $DIR

make start DIEAFTER="2500"

sleep 4;

make stop
