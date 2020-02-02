BetaCreator
===========

BetaCreator is a free tool for the creation of rock climbing route guides/beta photos.

See a demo at http://nemophrost.github.com/betacreator/


Setting Up A Development Environment (Outdated)
---

After checking out the git repo you will need to open a command line terminal 
and go to the directory: `<project_root>/js`

From there you will need to checkout the Google Closure Library (requires 
[Subversion](http://subversion.apache.org/)) with the following command:

`svn checkout http://closure-library.googlecode.com/svn/trunk/ closure`

Afterwards you should have the goog directory at: `<project_root>/js/closure/closure/goog`

Bringing This Project Up to Date (the Year 2020)
---

This section explains the steps needed to have a functioning `demo.html` file again.

Download a release of Google Closure Library and unzip it. Create the directory `js/closure/` and place the unzipped contents in it so that you end up with the directory `js/closure/closure/goog/`, among others.
```
https://github.com/google/closure-library
https://github.com/google/closure-library/archive/master.zip
```

From the command line in the `js/closure/closure/bin/build/` directory, execute:
```
python depswriter.py --root_with_prefix="../../../../BetaCreator ../bc" > ../../../../bin/deps.js
```

Create the symbolic link `js/closure/closure/bc` pointing to `js/betacreator/`:
```
cd js
ln -s betacreator closure/closure/bc
```

The documentation for DepsWriter is at https://developers.google.com/closure/library/docs/depswriter

`goog.dom.query()` has been removed. The recommended replacement is to use [`document.querySelector()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) instead. However, `demo.html` will load fine by simply removing this dependency. I've updated ColorPicker.js to remove it. The color picker will not open and instead will throw an error. To be fixed...
