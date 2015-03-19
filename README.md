WakeUp
======

Since I know how basic this app is and how much of a necessity power management is for Chromebook users, yup, figured I'd GPL it...

Build prerequisites (7.0+)
--------------------------

The [Chrome Dev Editor](https://chrome.google.com/webstore/detail/chrome-dev-editor-develop/pnoffddplpippgcfjdhbmhkofpnaalpg) is the only build prerequisite.

Build instructions (7.0+)
-------------------------

1. Open the Dev Editor, then "Menu -> Git Clone" and plug in this app's URL to bootstrap the build
2. Right-click "WakeUp [master]" in the resulting left side pane, then click "Bower Install" to install the Bower dependencies
3. Right-click "WakeUp [master]" again, then click "Refactor for CSP" to make sure the dependencies take CSP compliance into account
4. Click the "Run" button (looks sort of like a Play button) to test the app
