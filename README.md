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

The test image is not available anymore. Use something else, such as:
https://cdn-files.apstatic.com/climb/106759952_large_1494138444.jpg

Download a release of Google Closure Library and unzip it. Place the closure-library directory in the /js directory.
    https://github.com/google/closure-library
    https://github.com/google/closure-library/archive/master.zip

Copy BetaCreator to /js/closure-library/closure/goog and rename it as 'bc'

From the command line in the /js/closure-library/closure/bin/build/ directory:
    python depswriter.py --root_with_prefix="../../../../BetaCreator bc" > ../../../../deps.js

    Documentation for DepsWriter: https://developers.google.com/closure/library/docs/depswriter

    Then, include that deps file in the demo.html file:
        <script type="text/javascript" src="js/deps.js"></script>

goog.dom.query was deprecated (removed now). Use document.querySelector instead:
https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
Remove it from the generated deps.js, or better, remove it from the source code and write the deps again.

goog.isNumber and goog.isString were deprecated (removed now). Add this to the javascript, for example before `goog.require("bc.Client")`:
    goog.isString = function(val) {
      return typeof val == 'string';
    };
    goog.isNumber = function(val) {
      return typeof val == 'number';
    };
