BetaCreator
===========

BetaCreator is a free tool for the creation of rock climbing route guides/beta photos.

See a demo at http://nemophrost.github.com/betacreator/


Setting Up A Development Environment
------------------------------------

After checking out the git repo you will need to open a command line terminal 
and go to the directory: `<project_root>/js`

From there you will need to checkout the Google Closure Library (requires 
[Subversion](http://subversion.apache.org/)) with the following command:

`svn checkout http://closure-library.googlecode.com/svn/trunk/ closure`

Afterwards you should have the goog directory at: `<project_root>/js/closure/closure/goog`

Bringing This Project Up to Date (the Year 2020)
---

This section explains the bare minimum steps to have a functioning `demo.html` file again.

Download a release of Google Closure Library and unzip it. Place the `closure-library` directory in the `/js` directory.
```
https://github.com/google/closure-library
https://github.com/google/closure-library/archive/master.zip
```

Copy the directory `BetaCreator` to `/js/closure-library/closure/goog` and rename it as `bc`

From the command line in the `/js/closure-library/closure/bin/build/` directory, execute:
```
python depswriter.py --root_with_prefix="../../../../BetaCreator bc" > ../../../../deps.js
```

Then, include that deps file in the `demo.html` file:
```
<script type="text/javascript" src="js/deps.js"></script>
```

The documentation for DepsWriter is at https://developers.google.com/closure/library/docs/depswriter

`goog.dom.query` has been removed. The recommended replacement is to use [`document.querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) instead. However, the `demo.html` will load fine by simply removing this dependency. Not sure yet where `goog.dom.query` is actually used and would throw an error. So:
Delete `goog.dom.query` from the generated deps.js or, better, remove it from the source code and generate the deps again.
