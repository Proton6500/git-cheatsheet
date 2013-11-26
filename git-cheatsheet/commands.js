
var canonize = function(k) {
  return k.replace(/\[.*\]/,'').replace(/<[^>]+>/g,'x').toLowerCase()
}

var commands = [

  { left: "workspace", right: "index", direction: "status",
    cmd: "status",
    tags: 'Basic Snapshotting'},
  { left: "workspace", right: "index", direction: "status",
    cmd: "diff",
    tags: 'Basic Snapshotting, Inspection and Comparison,Patching'},
  { left: "workspace", right: "local_repo", direction: "status",
    cmd: "diff <commit or branch>",
    tags: 'Basic Snapshotting,Inspection and Comparison,Patching'},

  { left: "workspace", right: "index", direction: "up",
    cmd: "add <file... or dir...>",
    tags: 'Basic Snapshotting'},
  { left: "workspace", right: "index", direction: "up",
    cmd: "add -u",
    tags: 'Basic Snapshotting'},
  { left: "workspace", right: "index", direction: "up",
    cmd: "rm <file...>",
    tags: 'Basic Snapshotting'},
  { left: "workspace", right: "index", direction: "up",
    cmd: "mv <file...>",
    tags: 'Basic Snapshotting'},

  { left: "workspace", right: "local_repo", direction: "up",
    cmd: "commit -a [-m 'msg']",
    tags: 'Basic Snapshotting'},

  { left: "workspace", right: "index", direction: "dn",
    cmd: "checkout <file(s)|dir>",
    tags: 'Branching and Merging'},

  { left: "index", right: "index", direction: "status",
    cmd: "reset HEAD <file(s)...>",
    tags: 'Basic Snapshotting'},

  { left: "index", right: "local_repo", direction: "dn",
    cmd: "reset --soft HEAD^",
    tags: 'Basic Snapshotting'},

  { left: "workspace", right: "local_repo", direction: "dn",
    cmd: "reset --hard",
    tags: 'Basic Snapshotting'},


  { left: "workspace", right: "local_repo", direction: "dn",
    cmd: "checkout <branch>",
    tags: 'Branching and Merging'},
  { left: "workspace", right: "local_repo", direction: "dn",
    cmd: "checkout -b <name of new branch>",
    tags: 'Branching and Merging'},

  { left: "workspace", right: "local_repo", direction: "dn",
    cmd: "merge <commit or branch>",
    tags: 'Branching and Merging'},

  { left: "workspace", right: "local_repo", direction: "dn",
    cmd: "rebase <upstream>",
    tags: 'Patching'},


  { left: "workspace", right: "local_repo", direction: "dn",
    cmd: "cherry-pick <commit>",
    tags: 'Patching'},
  { left: "workspace", right: "local_repo", direction: "dn",
    cmd: "revert <commit>"},

  { left: "index", right: "local_repo", direction: "status",
    cmd: "diff --cached [<commit>]",
    tags: 'Basic Snapshotting,Inspection and Comparison,Patching'},
  { left: "index", right: "local_repo", direction: "up",
    cmd: "commit [-m 'msg']",
    tags: 'Basic Snapshotting'},
  { left: "index", right: "local_repo", direction: "up",
    cmd: "commit --amend",
    tags: 'Basic Snapshotting'},

  { left: "local_repo", right: "local_repo", direction: "status",
    cmd: "log",
    tags: 'Branching and Merging, Inspection and Comparison'},
  { left: "local_repo", right: "local_repo", direction: "status",
    cmd: "diff <commit> <commit>",
    tags: 'Basic Snapshotting, Inspection and Comparison,Patching'},
  { left: "local_repo", right: "local_repo", direction: "status",
    cmd: "branch",
    tags: 'Branching and Merging'},
  { left: "local_repo", right: "local_repo", direction: "status",
    cmd: "branch -d <branch>",
    tags: 'Branching and Merging'},
  { left: 'local_repo', right: 'remote_repo', direction: 'dn',
    cmd: "branch --track <new> <remote/branch>",
    tags: 'Branching and Merging'},


  { left: "workspace", right: "remote_repo", direction: "dn",
    cmd: "clone <repo>",
    tags: 'Creating Projects'},
  { left: "workspace", right: "remote_repo", direction: "dn",
    cmd: "pull <remote> <refspec>",
    tags: 'Sharing and Updating'},
  { left: "workspace", right: "remote_repo", direction: "dn",
    cmd: "reset --hard <remote>/<branch>",
    tags: 'Basic Snapshotting'},
  { left: "local_repo", right: "remote_repo", direction: "dn",
    cmd: "fetch <remote> <refspec>",
    tags: 'Sharing and Updating'},
  { left: "local_repo", right: "remote_repo", direction: "up",
    cmd: "push",
    tags: 'Sharing and Updating'},
  { left: "local_repo", right: "remote_repo", direction: "up",
    cmd: "push <remote> <branch>",
    tags: 'Sharing and Updating'},
  { left: "local_repo", right: "remote_repo", direction: "up",
    cmd: "push <remote> <branch>:<branch>",
    tags: 'Sharing and Updating'},

  { left: "remote_repo", right: "remote_repo", direction: "status",
    cmd: "branch -r",
    tags: 'Branching and Merging'},

  { left: "remote_repo", right: "remote_repo", direction: "status",
    cmd: "push <remote> :<branch>",
    tags: 'Sharing and Updating'},

  { left: "workspace", right: "workspace", direction: "dn",
    cmd: "clean",
    tags: 'Administration' },

  { left: "stash", right: "workspace", direction: "dn",
    cmd: "stash save [<msg>]",
    tags: 'Branching and Merging' },
  { left: "stash", right: "workspace", direction: "up",
    cmd: "stash apply [<name>]",
    tags: 'Branching and Merging'},
  { left: "stash", right: "workspace", direction: "up",
    cmd: "stash pop",
    tags: 'Branching and Merging'},
  { left: "stash", right: "stash", direction: "status",
    cmd: "stash list",
    tags: 'Branching and Merging'},
  { left: "stash", right: "stash", direction: "status",
    cmd: "stash show [<stash>]",
    tags: 'Branching and Merging'},
  { left: "stash", right: "stash", direction: "status",
    cmd: "stash drop [<name>]",
    tags: 'Branching and Merging'},
  { left: "stash", right: "stash", direction: "status",
    cmd: "stash clear",
    tags: 'Branching and Merging'},
  { left: "stash", right: "local_repo", direction: "up",
    cmd: "stash branch <branchname> [<stash>]",
    tags: 'Branching and Merging'}

];


en = {
  commands: {
    "status": "status",
    "diff": "diff",
    "diff x": "diff <commit or branch>",
    "add x": "add <file... or dir...>",
    "add -u": "add -u",
    "rm x": "rm <file...>",
    "mv x": "mv <file...>",
    "commit -a ": "commit -a [-m 'msg']",
    "checkout x": "checkout <branch>",
    "reset HEAD x": "reset HEAD <file(s)...>",
    "reset --soft HEAD^": "reset --soft HEAD^",
    "reset --hard": "reset --hard",
    "checkout -b x": "checkout -b <name of new branch>",
    "merge x": "merge <commit or branch>",
    "rebase x": "rebase <upstream>",
    "cherry-pick x": "cherry-pick <commit>",
    "revert x": "revert <commit>",
    "diff --cached ": "diff --cached [<commit>]",
    "commit ": "commit [-m 'msg']",
    "commit --amend": "commit --amend",
    "log": "log",
    "diff x commit": "diff <commit> <commit>",
    "branch": "branch",
    "branch -d x": "branch -d <branch>",
    "branch --track x remote/branch": "branch --track <new> <remote/branch>",
    "clone x": "clone <repo>",
    "pull x refspec": "pull <remote> <refspec>",
    "reset --hard x/branch": "reset --hard <remote>/<branch>",
    "fetch x refspec": "fetch <remote> <refspec>",
    "push": "push",
    "push x branch": "push <remote> <branch>",
    "push x branch:branch": "push <remote> <branch>:<branch>",
    "branch -r": "branch -r",
    "push x :branch": "push <remote> :<branch>",
    "clean": "clean",
    "stash save ": "stash save [<msg>]",
    "stash apply ": "stash apply [<stash>]",
    "stash pop": "stash pop",
    "stash list": "stash list",
    "stash show ": "stash show [<stash>]",
    "stash drop ": "stash drop [<stash>]",
    "stash clear": "stash clear",
    "stash branch x ": "stash branch <branchname> [<stash>]"
  },
  "status": "Displays paths that have differences between the index file and the current HEAD commit, paths that have differences between the workspace and the index file, and paths in the workspace that are not tracked by git.",
  "diff": "Displays the differences not added to the index.",
  "diff <commit or branch>": "View the changes you have in your workspace relative to the named <commit>. You can use HEAD to compare it with the latest commit, or a branch name to compare with the tip of a different branch",
  "add <file... or dir...>": "Adds the current content of new or modified files to the index, thus staging that content for inclusion in the next commit. Use `add --interactive` to add the modified contents in the workspace interactively to the index.",
  "add -u": "Adds the current content of modified (NOT NEW) files to the index.  This is similar to what 'git commit -a' does in preparation for making a commit.",
  "rm <file...>": "Remove a file from the workspace and the index.",
  "mv <file...>": "Move file in the workspace and the index.",
  "commit -a [-m 'msg']": "Commit all files changed since your last commit, except untracked files (ie. all files that are already listed in the index). Remove files in the index that have been removed from the workspace.",
  "checkout <file(s)|dir>": "Updates the file or directory in the workspace, overwriting any local changes. Does NOT switch branches.",
  "reset HEAD <file(s)...>": "Remove the specified files from the next commit. Resets the index but not the working tree (i.e., the changed files are preserved but not marked for commit) and reports what has not been updated.",
  "reset --soft HEAD^": "Undo the last commit, leaving changes in the the index.",
  "reset --hard": "Matches the workspace and index to the local tree. WARNING: Any changes to tracked files in the working tree since commit are lost. Use this if merging has resulted in conflicts and you'd like to start over. Pass ORIG_HEAD to undo the most recent successful merge and any changes after.",
  "checkout <branch>": "Switches branches by updating the index and workspace to reflect the specified branch, <branch>, and updating HEAD to be <branch>.",
  "checkout -b <name of new branch>": "Create a branch and switch to it",
  "merge <commit or branch>": "Merge changes from <branch name> into current branch.\rUse `&#8209;&#8209;no-commit` to leave changes uncommitted.",
  "rebase <upstream>": "Reverts all commits since the current branch diverged from <upstream>, and then re-applies them one-by-one on top of changes from the HEAD of <upstream>.",
  "cherry-pick <commit>": "Integrate changes in the given commit into the current branch.",
  "revert <commit>": "Reverse commit specified by <commit> and commit the result. This requires your working tree to be clean (no modifications from the HEAD commit).",
  "diff --cached [<commit>]": "View the changes you staged vs the latest commit. Can pass a <commit> to see changes relative to it.",
  "commit [-m 'msg']": "Stores the current contents of the index in a new commit along with a log message from the user describing the changes.",
  "commit --amend": "Modify the last commit with the current index changes.",
  "log": "Show recent commits, most recent on top. Options:\r`&#8209;&#8209;decorate` with branch and tag names on appropriate commits\r`&#8209;&#8209;stat` with stats (files changed, insertions, and deletions) \r`&#8209;&#8209;author=<author>`  only by a certain author\r`&#8209;&#8209;after=\"MMM DD YYYY\"` ex. (\"Jun 20 2008\") only commits after a certain date\r`&#8209;&#8209;before=\"MMM DD YYYY\"` only commits that occur before a certain date \r`&#8209;&#8209;merge` only the commits involved in the current merge conflicts",
  "diff <commit> <commit>": "View the changes between two arbitrary commits",
  "branch": "List all existing branches. Option -r causes the remote-tracking branches to be listed, and option -a shows both.",
  "branch -d <branch>": "Delete an specified branch. Use -D to force.",
  "branch --track <new> <remote/branch>": "Create a new local branch that tracks a remote branch.",
  "clone <repo>": "Download the repository specified by <repo> and checkout HEAD of the master branch.",
  "pull <remote> <refspec>": "Incorporates changes from a remote repository into the current branch. In its default mode, `git pull` is shorthand for `git fetch` followed by `git merge FETCH_HEAD`.",
  "reset --hard <remote>/<branch>": "Reset local repo and working tree to match a remote branch. Use `reset &#8209;&#8209;hard origin/master` to throw away all commits to the local master branch. Use this to start over on a failed merge.",
  "fetch <remote> <refspec>": "Download objects and refs from another repository.",
  "push": "update the server with your commits across all branches that are *COMMON* between your local copy and the server.Local branches that were never pushed to the server in the first place are not shared",
  "push <remote> <branch>": "Push new (or existing) branch to remote repository",
  "push <remote> <branch>:<branch>": "Push new branch to remote repository with a different name",
  "branch -r": "List remote branches",
  "push <remote> :<branch>": "Remove a remote branch. Literally &quot;push nothing to this branch&quot; ",
  "clean": "Cleans the working tree by recursively removing files that are not under version control, starting from the current directory.",
  "stash save [<msg>]": "Save your local modifications to a new stash, and run git reset &#8209;&#8209;hard to revert them. The <msg> part is optional and gives the description along with the stashed state. For quickly making a snapshot, you can omit both \"save\" and <msg>.",
  "stash apply [<stash>]": "Move changes from the specified stash into the workspace. The latest stash is the default.",
  "stash pop": "Applies the changes from the last (or specified) stash and then removes the given stash.",
  "stash list": "List the stashes that you currently have.",
  "stash show [<stash>]": "Show the changes recorded in the stash as a diff between the stashed state and its original parent. When no <stash> is given, shows the latest one.",
  "stash drop [<stash>]": "Remove a single stashed state from the stash list. When no <stash> is given, it removes the latest one.",
  "stash clear": "Remove all the stashed states. Note that those states will then be subject to pruning, and may be impossible to recover.",
  "stash branch <branchname> [<stash>]": "Creates and checks out a new branch named <branchname> starting from the commit at which the <stash> was originally created, applies the changes recorded in <stash> to the new working tree and index. \rIf that succeeds, and <stash> is a reference of the form stash@{<revision>}, it then drops the <stash>. When no <stash> is given, applies the latest one. \rThis is useful if the branch on which you ran git stash save has changed enough that git stash apply fails due to conflicts. Since the stash is applied on top of the commit that was HEAD at the time git stash was run, it restores the originally stashed state with no conflicts."
}

for (var i = 0; i < commands.length; i++) {
  commands[i].docs = en[commands[i].cmd]
}
