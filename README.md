BetaCreator
===========

BetaCreator is a free tool for the creation of rock climbing route guides/beta photos.

See the original demo at http://nemophrost.github.io/betacreator/


Setting Up A Development Environment
---

This section explains the steps needed to have a functioning `demo.html` file.

[Download a release](https://github.com/google/closure-library/releases) of Google Closure Library and unzip it. For example, [the master branch](https://github.com/google/closure-library/archive/master.zip) or [the version from 2020-02-04](https://github.com/google/closure-library/archive/v20200204.zip) (when this was written). Create the directory `js/closure/` and place the unzipped contents in it so that you end up with the directory `js/closure/closure/goog/`, among others.

Use DepsWriter to gather all the dependencies into one file. From the command line in the `js/closure/closure/bin/build/` directory, execute:
```
python depswriter.py --root_with_prefix="../../../../betacreator ../bc" > ../../../../bin/deps.js
```

The documentation for DepsWriter is at https://developers.google.com/closure/library/docs/depswriter

The dependencies file tells Google Closure Library to expect the BetaCreator files at `js/closure/closure/bc`. To satisfy this, create the symbolic link `js/closure/closure/bc` pointing to `js/betacreator/`:
```
cd js/closure/closure/
ln -s ../../betacreator bc
```
