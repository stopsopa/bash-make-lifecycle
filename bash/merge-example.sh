
set -e
set -x

# start
/bin/bash bash/git/is-commited.sh

/bin/bash bash/git/is-this-branch.sh master

# lib
/bin/bash bash/git/change-branch-to.sh lib

/bin/bash bash/git/merge.sh master

/bin/bash bash/git/pull-and-push-branch.sh origin lib master

/bin/bash bash/git/is-commited.sh

# company
/bin/bash bash/git/change-branch-to.sh company

/bin/bash bash/git/merge.sh master

/bin/bash bash/git/pull-and-push-branch.sh company company master

/bin/bash bash/git/is-commited.sh

# back to master
/bin/bash bash/git/change-branch-to.sh master








