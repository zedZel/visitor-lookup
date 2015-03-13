// function cookieInfo(){
//      chrome.tabs.query({"status":"complete","windowId":chrome.windows.WINDOW_ID_CURRENT,"active":true}, function(tab){
//         chrome.cookies.getAll({"url":tab[0].url},function (cookie){
//             var ckVal;
//             for(i=0;i<cookie.length;i++){
//                 if(cookie[i].name === "smtrrmkr") {
//                     ckVal = cookie[i].value;
//                     ckVal = decodeURIComponent(ckVal);
//                     ckVal = ckVal.split("^");
//                     loiid = ckVal[1];
//                 }
//             }
//         });
//     });
// }

// window.onload=cookieInfo;

// console.log(loiid);

var sendToApi = function(trackingServer, accountNumber) {
    chrome.tabs.query({"status":"complete","windowId":chrome.windows.WINDOW_ID_CURRENT,"active":true}, function(tab){
        chrome.cookies.getAll({"url":tab[0].url},function (cookie){
            var ckVal;
            for(i=0;i<cookie.length;i++){
                if(cookie[i].name === "smtrrmkr") {
                    ckVal = cookie[i].value;
                }
            }
            ckVal = decodeURIComponent(ckVal);
            ckVal = ckVal.split("^");
            loiid = ckVal[1];
            console.log(loiid);
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "http://" + trackingServer + ":9098/api/account/" + accountNumber + "/visitor/" + loiid, true); // + getLoiid()
            xhr.onreadystatechange = function() {
              if (xhr.readyState == 4) {
                // console.log("inside xhr response");
                var response = xhr.responseText;
                console.log(response);
                var uniqueDiv = document.createElement("div");
                uniqueDiv.id = "uniqueDiv";
                document.body.appendChild(uniqueDiv);
                uniqueDiv.innerHTML = response;
              }
            }
            xhr.send();
        });
    });
};

sendToApi("s871trkd02vw", "9");