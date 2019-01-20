
# Script to safely checkout to different branch
# /bin/bash pull-and-push-branch.sh origin local-branch remote-branch

# WARNING: changes doesn't have to be commited
# WARNING: changes doesn't have to be commited
# WARNING: changes doesn't have to be commited

# In order to make this script work you have to push first time manually:
# just checkout to desired local branch and run something like:
#     git checkout local-branch
#     git push remote1 master
#     git push remote2 master


remote="$1"
source="$2"
target="$3"

THISFILE=${BASH_SOURCE[0]}
DIR="$( cd "$( dirname "${THISFILE}" )" && pwd -P )"

source "$DIR/../libs/colours.sh";

if [ "$#" -lt 3 ] ; then

    { red "\n[error] At least two argument expected, like: \n\n    /bin/bash $0 \"origin\" \"local-branch-name\" \"remote-branch-name\" \n"; } 2>&3

    exit 1;
fi

THISFILE=${BASH_SOURCE[0]}
DIR="$( cd "$( dirname "${THISFILE}" )" && pwd -P )"
cd $DIR;

set -e
set -x

/bin/bash $DIR/is-this-branch.sh $source;

containsElement () {
    local e
    for e in "${@:2}"; do [[ "$e" == "$1" ]] && return 0; done
    return 1
}

function fetchbranches {
    giturl=$(git config --get remote.$remote.url)

    if [[ "$?" != 0 ]]; then

        exit 0;
    fi

    #yellow 'fetching remote branches:';

    # string with newline characters inside
        remotebranches=$(git ls-remote -h $giturl | awk '{print $2}' | cut -c 12-);

    # string with spaces inside
        remotebranches="$(echo $remotebranches)"

    { echo "$remotebranches"; } 2>&3
}

remotebranches="$(fetchbranches)"

if [ "$remotebranches" = "" ]; then

    { red "[error] can't extract remote branches from remote '$remote'"; } 2>&3

    exit 1
fi

# now convert to array
    IFS=' ' read -ra a <<<"$remotebranches";
    declare -p a 1> /dev/null 2> /dev/null;
    remotebranches=("${a[@]}")

set +e
containsElement "$target" "${remotebranches[@]}"
CONTAIN="$?"

if [[ $CONTAIN != 0 ]]; then

    { red "[error] branch '$target' DOES NOT exist remotely on '$remote'"; } 2>&3

    exit 1;
fi

git pull $remote $target --no-edit

if [[ $? != 0 ]]; then

    { red "[error] pull '$remote' '$target' to local branch '$source' - failure"; } 2>&3

    exit 1;
fi

git push $remote $target

if [[ $? != 0 ]]; then

    { red "[error] push from local branch '$source' to '$remote' '$target' - failure"; } 2>&3

    exit 1;
fi

{ green "[ok] pull from & push to local branch '$source' to '$remote' '$target' - success"; } 2>&3
