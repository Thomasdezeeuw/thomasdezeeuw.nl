+++
type = "page"
title = "Git Notes"
linktitle = "Git"
+++

Collection of commands that are useful when using [git], but I always seem to
forget.

[git]: https://git-scm.com


# Update Branch

Update your branch appending your (not yet merged) commits on top of the
changes.

```bash
git fetch
git rebase <remote>/<branch>
```


# Remove Remote Branch

First remove the branch locally, then remotely.

```bash
git branch -d <branch> # -D to force remove.
git push <remote> --delete <branch>
```


# List commits added in different branch

List all commits in `other_branch` not in the master branch.

```bash
git log HEAD..other_branch
```

Also show the actual changes.

```bash
git log --patch HEAD..other_branch
```


# Last Commit

Last commit.

```bash
git log -1 HEAD
git log -1 HEAD --patch # With changes.
```

Only the commit hash.

```bash
git rev-parse HEAD
```


# Cleaup

Reduce disk space by packing objects.

```bash
git gc --aggressive
```
