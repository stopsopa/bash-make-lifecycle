#!/bin/bash

# set -e

# set -o xtrace

ORIGIN="origin"
LOCALBRANCH="master"
REMOTEBRANCH="master"

trim() {
    local var="$*"
    # remove leading whitespace characters
    var="${var#"${var%%[![:space:]]*}"}"
    # remove trailing whitespace characters
    var="${var%"${var##*[![:space:]]}"}"
    echo -n "$var"
}

function red {
    printf "\e[31m$1\e[0m\n"
}

function green {
    printf "\e[32m$1\e[0m\n"
}

if [ "$(git rev-parse --abbrev-ref HEAD)" != $LOCALBRANCH ]; then

    red "switch first branch to <$LOCALBRANCH>"

    exit 1
fi

green "\ncurrent branch: $LOCALBRANCH";

DIFF="$(git diff --numstat)"

DIFF="$(trim "$DIFF")"

if [ "$DIFF" != "" ]; then

    red "\n\n    Error: First commit changes ...\n\n";

    exit 1
fi

DIFF="$(git diff --numstat $LOCALBRANCH $ORIGIN/$REMOTEBRANCH)"

DIFF="$(trim "$DIFF")"

if [ "$DIFF" != "" ]; then

    npm version patch

    git push $ORIGIN $REMOTEBRANCH --tags

    if [ "$?" = "0" ]; then

        npm publish
    else

        red "\n\nCan't git push\n"
    fi


else

    red "\n\n    Nothing new to publish\n\n";
fi


