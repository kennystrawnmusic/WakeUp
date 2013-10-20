chrome.app.runtime.onLaunched.addListener(function(){
  var screenWidth = screen.availWidth;
  var screenHeight = screen.availHeight;
  var width = Math.floor(screenWidth/4);
  var height = Math.floor(screenHeight*(4/5));
  
  chrome.app.window.create('index.html', {
    frame: 'none',
    minWidth: width,
    minHeight: height,
    bounds: {
      width: width,
      height: height,
      left: Math.floor((screenWidth-width)/2),
      top: Math.floor((screenHeight-height)/2)
    }
  });
});

function notify() {
  
  var manifest = chrome.runtime.getManifest();
  this.version = parseFloat(manifest.version);
  
  chrome.runtime.onInstalled.addListener(function(details) {
    
    var opt = {
    
      type: "basic",
      title: "Please update your review",
      message: "\"Wake Up!\" has been updated. If you have a negative review in the Chrome Web Store and it's of the previous version, we ask that you please update it to reflect the changes in the latest version. Thanks.",
      iconUrl: "icon_128.png"
    
    }
    
    if (details.reason == "update") {
      
      chrome.notifications.create('wakeupdate', opt, function(id) {
        
        id = "wakeupdate";
        console.log('Notification to update review sent to user');
        
      });
      
    } else {
      
      //do nothing
      
    }
    
  });

  chrome.notifications.onClicked.addListener(function(id) {
    
    if (id == "wakeupdate") {
      
      var w = window.open();
      w.location = "https://chrome.google.com/webstore/detail/" + chrome.runtime.id + "/details";
      
    } else if (id == "systemPowKeptAwake") {
      
      var screenWidth = screen.availWidth;
      var screenHeight = screen.availHeight;
      var width = Math.floor(screenWidth/4);
      var height = Math.floor(screenHeight*(4/5));
  
      chrome.app.window.create('index.html', {
        frame: 'none',
        minWidth: width,
        minHeight: height,
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
        bounds: {
          width: width,
          height: height,
          left: Math.floor((screenWidth-width)/2),
          top: Math.floor((screenHeight-height)/2)
        }
      });
      
    } else {
      
      //do nothing
    }
    
  });
  
  chrome.notifications.onClosed.addListener(function(id, always) {
    
    always = true||false;
    
    if (id == "wakeupdate") {
      
      var w = window.open();
      w.location = "https://chrome.google.com/webstore/detail/" + chrome.runtime.id + "/details";
      
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

setInterval(function() { listen(); }, 5000);

notify();