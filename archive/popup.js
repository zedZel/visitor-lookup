console.log("in popup.js");
setTimeout(function(){
    // listener for SmarterCheck.js
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            var payload = document.querySelector('#payload');
            console.log("payload: " + payload);
            payload.innerText = request.message;
            console.log("payload: " + payload);
            // Return nothing to let the connection be cleaned up.
            sendResponse({});
    });

    // // inject SmarterCheck.js into all frames in the active tab
    // window.onload = function() {
        
    //     chrome.windows.getCurrent(function(currentWindow) {
            
    //         chrome.tabs.query({active: true, windowId: currentWindow.id},
            
    //             function(activeTabs) {
    //                 chrome.tabs.executeScript(
    //                     activeTabs[0].id, {file:"SmarterCheck.js", allFrames: false});
    //             });
            
    //     });

    // };
}, 2000);