#!/bin/bash

# This script is executed with PROCESSVALUE extracted from .env in $1
# This script is usually executed by start.sh through make

set -e
set -x

THISFILE=${BASH_SOURCE[0]}
DIR="$( cd "$( dirname "${THISFILE}" )" && pwd -P )"

source "$DIR/bash/libs/colours.sh";

FLAG="$1"

if [ "$#" -lt 1 ]; then

    { red "$0 error: not enought parameters specified"; } 2>&3

    exit 1
fi

if [ "$1" = "" ]; then

    { red "$0 error: flag parameter is empty"; } 2>&3

    exit 1
fi

# load tools
source "$DIR/bash/proc/test-timer.sh"

# create log dir and file path
LOGDIR="$DIR/var/logs/$(_date)"
mkdir -p "$LOGDIR"
LOGFILE="$LOGDIR/$(_time).log"



echo -e "\n\n\n-----v $(_datetime) v----->>>\n" >> $LOGFILE

cd react

node servers/index.js --flag $FLAG-main 1>> $LOGFILE 2>> $LOGFILE

echo -e "<<<\nstopped with status code: $?\n-----^-----\n" >> $LOGFILE



