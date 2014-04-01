window.onload = function() {
  
  window.ua = navigator.userAgent;
  
  document.getElementById('windowbar').style.width = window.innerWidth - 204 + 'px';
  
  document.getElementById('appcontent').style.width = window.innerWidth + 'px';
  document.getElementById('appcontent').style.height = (window.innerHeight - 50) + 'px';
  
  var appContentTopInt = parseInt(document.getElementById('appcontent').style.top, 10);
  var appContentHeightInt = parseInt(document.getElementById('appcontent').style.height, 10);
  var titlebarWidthInt = parseInt(document.getElementById('windowbar').style.width, 10);
  
  document.getElementById('titleStatement').style.width = document.getElementById('windowbar').style.width;
  
  document.getElementById('power1').style.width = document.getElementById('appcontent').style.width;
  document.getElementById('power1').style.left = document.getElementById('appcontent').style.left;
  
  document.getElementById('power2').style.width = document.getElementById('appcontent').style.width;
  document.getElementById('power2').style.left = document.getElementById('appcontent').style.left;
  
  document.getElementById('powerEnd').style.width = document.getElementById('appcontent').style.width;
  document.getElementById('powerEnd').style.left = document.getElementById('appcontent').style.left;
  document.getElementById('powerEnd').style.top = Math.floor(appContentHeightInt - 50) + 'px';
  
  document.getElementById('bugreport').style.left = window.innerWidth - 50 + 'px';
  
  document.getElementById('bugreport').onclick = function() { window.open().location = "https://chrome.google.com/webstore/support/" + chrome.runtime.id; }
  
  document.getElementById('power1').onclick = function() { 
    
    chrome.runtime.getPlatformInfo(function(info) {
      
      if (info.arch == 'arm' && window.ua.match(/.*arm|armv7l.*Chrome\/32\.0\..*/)) {
        
        var opt = {
          type: "basic",
          title: "Please update to the beta channel for this app to work",
          message: "Several ARM users on Chrome OS 32.x have complained that the API seems to not work. Sinced this is only a 32.x-specific problem that has been fixed in 33, I, the sole developer, ask that you please switch channels to avoid this problem.",
          iconUrl: "icon_128.png"
        }
        
        chrome.notifications.create('bugworkaround', opt, function(id) {
          console.log(id + 'message sent.');
        });
        
      } else {
        
        chrome.power.requestKeepAwake('system');
        
      }
      
    });
    
  }
  
  document.getElementById('power1').addEventListener("click", function(opt) {
    
    opt = {
      type: "basic",
      title: "System kept awake",
      message: "To revert the system back to normal behavior, click the Cancel button",
      iconUrl: "icon_128.png"
    }
    
    chrome.notifications.create("systemPowKeptAwake", opt, function(id) {
      id = "systemPowKeptAwake";
      console.log(id + " event fired.");
    });
    
  });
  
  document.getElementById('power2').onclick = function() { 
    
    chrome.runtime.getPlatformInfo(function(info) {
      
      if (info.arch == 'arm' && window.ua.match(/.*arm|armv7l.*Chrome\/32\.0\..*/)) {
        
        var opt = {
          type: "basic",
          title: "Please update to the beta channel for this app to work",
          message: "Several ARM users on Chrome OS 32.x have complained that the API seems to not work. Sinced this is only a 32.x-specific problem that has been fixed in 33, I, the sole developer, ask that you please switch channels to avoid this problem.",
          iconUrl: "icon_128.png"
        }
        
        chrome.notifications.create('bugworkaround', opt, function(id) {
          console.log(id + 'message sent.');
        });
        
      } else {
        
        chrome.power.requestKeepAwake('display');
        
      }
      
    });
    
  }
  
  document.getElementById('power2').addEventListener("click", function(opt) {
    
    opt = {
      type: "basic",
      title: "Display kept awake",
      message: "To revert the display and system back to normal behavior, click the Cancel button",
      iconUrl: "icon_128.png"
    }
    
    chrome.notifications.create("displayPowKeptAwake", opt, function (id) {
      id = "displayPowKeptAwake";
      console.log(id + " event fired.");
    });
    
  });
  
  document.getElementById('powerEnd').onclick = function() { chrome.power.releaseKeepAwake(); }
  
  document.getElementById('powerEnd').addEventListener("click", function(opt) {
    
    opt = {
      type: "basic",
      title: "Back to normal",
      message: "System has been reverted back to normal behavior",
      iconUrl: "icon_128.png"
    }
    
    chrome.notifications.create("backToNormal", opt, function(id) {
      id = "backToNormal";
      console.log(id + " event fired.");
    });
    
  });
  
  document.getElementById('windowbar').style.width = window.innerWidth + 'px';
  
  document.getElementById('minimize').onclick = function() { chrome.app.window.current().minimize(); }
  
  document.getElementById('maximize').onclick = function() {
    
    var b = chrome.app.window.current().getBounds();
    
    if (b.width != screen.availWidth && b.height != screen.availHeight) {
      
      chrome.app.window.current().setBounds({left: 0, top: 0, width: screen.availWidth, height: screen.availHeight});
      document.getElementById('windowbar').style.webkitAppRegion = "no-drag";
      
    } else {
      
      var screenWidth = screen.availWidth;
      var screenHeight = screen.availHeight;
      
      var width = Math.floor(screenWidth/4);
      var height = Math.floor(screenHeight*(4/5));
      
      var left = Math.floor((screenWidth-width)/2);
      var top = Math.floor((screenHeight-height)/2);
      
      chrome.app.window.current().setBounds({left: left, top: top, width: width, height: height});
      document.getElementById('windowbar').style.webkitAppRegion = "drag";
      
    }
    
  }
  
  document.getElementById('close').onclick = function() { chrome.app.window.current().close(); }
  
  chrome.app.window.current().onBoundsChanged.addListener(function() {
    
    //Re-draw inner elements when the window size changes
    
    var cb = chrome.app.window.current().getBounds();
    
    var appcontwidth = parseInt(document.getElementById('appcontent').style.width, 10);
    var appcontheight = parseInt(document.getElementById('appcontent').style.height, 10);
    
    document.getElementById('windowbar').style.width = cb.width - 204 + 'px';
    
    document.getElementById('bugreport').style.left = cb.width - 50 + 'px';
    
    document.getElementById('appcontent').style.left = Math.floor((cb.width - appcontwidth)/2) + 'px';
    document.getElementById('appcontent').style.top = Math.floor((cb.height - appcontheight + 50)/2) + 'px';
      
  });
  
  //move the window by one pixel in two directions to force the onBoundsChanged event to fire on startup
  chrome.app.window.current().setBounds({
    
    'width': chrome.app.window.current().getBounds().width,
    'height': chrome.app.window.current().getBounds().height,
    'left': chrome.app.window.current().getBounds().left - 1,
    'top': chrome.app.window.current().getBounds().top - 1
    
  });
  
  chrome.app.window.current().setBounds({
    
    'width': chrome.app.window.current().getBounds().width,
    'height': chrome.app.window.current().getBounds().height,
    'left': chrome.app.window.current().getBounds().left + 1,
    'top': chrome.app.window.current().getBounds().top + 1
    
  });
  
}
