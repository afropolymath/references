# Git Functions :(

## Contents

- [Useful Git commands](#useful-git-commands)

## Useful Git commands

#### Merge topic branch into current branch

```sh
git merge <topic>
```

#### Delete remote branch git

```
git push origin :branchtodelete
```

#### Merge `feature` branch to `master` prefering `feature` branch changes

> In this example, `seotweaks` refers to our feature branch.

```sh
git checkout seotweaks
git merge -s ours master
git checkout master
git merge seotweaks
```

#### Clean out local branches

```
git remote prune origin --dry-run
```

`--dry-run` option is used to preview changes that will be made

#### Rename a branch

- While on any branch

```
git branch -m <oldname> <newname>
```

- Rename the current branch:

```
git branch -m <newname>
```

- Clean current branch of files and directories

```
git clean -f -d
```