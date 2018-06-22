#!/bin/bash

# set -e

# set -o xtrace

trim() {
    local var="$*"
    # remove leading whitespace characters
    var="${var#"${var%%[![:space:]]*}"}"
    # remove trailing whitespace characters
    var="${var%"${var##*[![:space:]]}"}"
    echo -n "$var"
}

DIFF="$(git diff --numstat)"

DIFF="$(trim "$DIFF")"

if [ "$DIFF" != "" ]; then

    printf "\n\n    Error: First commit changes ...\n\n";

    exit 1
fi

DIFF="$(git diff --numstat master origin/master)"

DIFF="$(trim "$DIFF")"

if [ "$DIFF" != "" ]; then

    npm version patch

echo 'stop...'

    exit 1

    git push origin master

    npm publish

else
    printf "\n\n    Nothing new to publish\n\n";
fi


