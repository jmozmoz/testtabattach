const tabs = require("sdk/tabs");
const tU = require("sdk/tabs/utils");
const wU = require("sdk/window/utils");

tabs.on("activate", preloadTabsActivate);


function debugLog(msg) {
  console.log(msg);
}

function preloadTabsActivate(tab) {
  debugLog("tab activate: " + tab);
  var activeXULWindow = wU.getMostRecentBrowserWindow();
  var currentXULTab = tU.getActiveTab(activeXULWindow);

  // if tab has already been loaded start preloading neighbors immediately
  try {
    tab.attach({
      contentScript: 'self.postMessage(document.readyState);',
      onMessage: function (readyState) {
        if (readyState == "complete") {
          debugLog("preload after complete");
          preloadTabs(activeXULWindow, currentXULTab);
        }
      }
    });
  }
  catch (err) {
    debugLog("err: " + err);
  }
}

function preloadTabs(activeXULWindow, currentXULTab) {
  debugLog("preloadTabs");
}
