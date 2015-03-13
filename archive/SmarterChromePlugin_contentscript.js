
// var smarterFunctions = {
// 	displayMessage : function() {
// 		var resultsDiv = document.createElement('div');
// 		resultsDiv.innerHTML = "Hi!";
// 		document.body.appendChild(resultsDiv);
// 	},
// 	getSrObjList : function() {
// 		var _smtr = _smtr || window._smtr || [];
// 		var srResults = _smtr.push(["getSrObjList"]);

// 		console.log(srResults);

// 		// var resultsDiv = document.createElement('div');
// 		// resultsDiv.innerText = srResults[0].passed.pageType;
// 		// document.body.appendChild(resultsDiv);
// 	},
// 	getBaseVer : function() {
// 		var wobj = {}; 
// 		for (var i in window) { 
// 			if (window.hasOwnProperty(i)) { 
// 				if (typeof(window[i]) === "number" || typeof(window[i]) === "string" || typeof(window[i]) === "object") { 
// 					wobj[i] = window[i];
// 				}
// 			}
// 		};

// 		if(typeof (wobj._smtr) !== "undefined") {
// 			return wobj._smtr.baseVer;

// 		}

// 		return ""; // not found
// 	}
// }

// document.addEventListener('DOMContentLoaded', function () {
// 	smarterFunctions.getBaseVer();
// });

// var payload = {
// 	message: "Hi!"
// };
// chrome.extension.sendRequest(payload, function(response) {});