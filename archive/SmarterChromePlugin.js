console.log("in smarterchromeplugin.js");
insertMessage = function(message) {
	// Replace the placeholder text with the message.
    var dommessage = document.querySelector('#putmessageshere');
    dommessage.innerText = message;
}

displayMessage = function() {
	var message = "";

	var wobj = {}; 
	for (var i in window) { 
		if (window.hasOwnProperty(i)) { 
			if (typeof(window[i]) === "number" || typeof(window[i]) === "string" || typeof(window[i]) === "object") { 
				wobj[i] = window[i]; 
			}
		}
	}
	if(typeof (wobj._smtr) !== "undefined") {
		insertMessage(wobj._smtr.baseVer);
	}
	else {
		insertMessage("_smtr not found")
	}
}

document.addEventListener('DOMContentLoaded', function () {
    displayMessage();
});

// chrome.browserAction.onClicked.addListener(function(tab) {
// 	chrome.tabs.executeScript(null, { file: "SmarterChromePlugin_contentscript.js"});
// });
