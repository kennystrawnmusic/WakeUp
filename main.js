function WakeWindow(){
  this.screenWidth = screen.availWidth;
  this.screenHeight = screen.availHeight;
  this.width = Math.floor(this.screenWidth/4);
  this.height = Math.floor(this.screenHeight*(4/5));

  this.winOpts = {

    frame: 'none',
    minWidth: this.width,
    minHeight: this.height,
    maxWidth: this.screenWidth,
    maxHeight: this.screenHeight,

    bounds: {

      width: this.width,
      height: this.height,
      left: Math.floor((this.screenWidth - this.width)/2),
      top: Math.floor((this.screenHeight - this.height)/2)

    }

  }

  this.win = chrome.app.window.create('index.html', this.winOpts);

  return {
    "opts": this.winOpts,
    "win": this.win
  };

}


function isCrOS() {

  chrome.runtime.getPlatformInfo(function(info) {

    if (info.os != 'cros') {

      var opt = {

        type: "basic",
        title: "Not a Chromebook!",
        message: "You are using a computing device that isn't a Chromebook. Therefore, you have two reasons not to install: A, only devices running Chrome OS support the chrome.power API, rendering this app useless on your computer, and B, your system's internal, native power management settings already accomplish what this app tries to do, making use of this app completely unnecessary.",
        iconUrl: "icon_128.png"

      }

      chrome.notifications.create('notcros', opt, function(id) {

        id = "notcros";
        console.log('Unsupported OS warning sent to user');

      });

    //bug fix: apparently Logical OR doesn't work in this case, so using this as an exception to the above
    } else if (info.os == 'android') {

      //do nothing

    } else {

      //do nothing

    }

  });

}


function notify() {

  var manifest = chrome.runtime.getManifest();
  this.version = parseFloat(manifest.version);

  chrome.runtime.onInstalled.addListener(function(details) {

    isCrOS();

  });

  chrome.notifications.onClicked.addListener(function(id) {

    if (id == "systemPowKeptAwake") {

      var screenWidth = screen.availWidth;
      var screenHeight = screen.availHeight;
      var width = Math.floor(screenWidth/4);
      var height = Math.floor(screenHeight*(4/5));

      chrome.app.window.create('index.html', {
        frame: 'none',
        minWidth: width,
        minHeight: height,
        transparentBackground: true,
        bounds: {
          width: width,
          height: height,
          left: Math.floor((screenWidth-width)/2),
          top: Math.floor((screenHeight-height)/2)
        }
      });

    } else if (id == "displayPowKeptAwake") {

      var screenWidth = screen.availWidth;
      var screenHeight = screen.availHeight;
      var width = Math.floor(screenWidth/4);
      var height = Math.floor(screenHeight*(4/5));

      chrome.app.window.create('index.html', {
        frame: 'none',
        minWidth: width,
        minHeight: height,
        transparentBackground: true,
        bounds: {
          width: width,
          height: height,
          left: Math.floor((screenWidth-width)/2),
          top: Math.floor((screenHeight-height)/2)
        }
      });

    } else if (id == 'notcros') {

      window.open().location = "http://www.google.com/intl/en/chrome/devices";

    } else if (id == 'extapis') {

      window.open().location = 'chrome://flags/#extension_apis';

    } else if (id == 'bugworkaround') {

      var w = window.open();
      w.location = 'chrome://chrome';

    } else {
      //do nothing
    }

  });

  chrome.notifications.onClosed.addListener(function(id, always) {

    always = true||false;

    if (id == "wakeupdate") {

      var w = window.open();
      w.location = "https://chrome.google.com/webstore/support/" + chrome.runtime.id;

    } else if (id == 'notcros') {

      window.open().location = "http://www.google.com/intl/en/chrome/devices";

    } else if (id == 'extapis') {

      window.open().location = 'chrome://flags/#extension-apis';

    } else {

      //do nothing
    }

  });

}

function listen() {

  chrome.runtime.requestUpdateCheck(function(uaStatus, details) {

    if (uaStatus == 'update_available') {

      chrome.runtime.reload();

    } else {

      //do nothing

    }

  });

}

setInterval(function() { listen(); }, 1000);

notify();
