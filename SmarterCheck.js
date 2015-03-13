function cookieinfo(){

     chrome.tabs.query({"status":"complete","windowId":chrome.windows.WINDOW_ID_CURRENT,"active":true}, function(tab){
            //console.log(JSON.stringify(tab));
            chrome.cookies.getAll({"url":tab[0].url},function (cookie){
                //console.log(cookie.length);
                allCookieInfo = "";
                for(i=0;i<cookie.length;i++){
                    //console.log(JSON.stringify(cookie[i]));
                    if(cookie[i].name === "smtrrmkr") {
                        //console.log(cookie[i].value);
                        var ckVal = cookie[i].value;
                        ckVal = decodeURIComponent(ckVal);
                        ckVal = ckVal.split("^");
                        console.log(ckVal[1]);
                        return ckVal[1];
                    }

                    allCookieInfo = allCookieInfo + JSON.stringify(cookie[i]);
                }
                localStorage.currentCookieInfo = allCookieInfo;
            });
    });

}
window.onload=cookieinfo;

console.log(cookieinfo());

// var getAllCookies = function () {
//     var cookies = { };
//     if (document.cookie && document.cookie != '') {
//         var split = document.cookie.split(';');
//         for (var i = 0; i < split.length; i++) {
//             var name_value = split[i].split("=");
//             name_value[0] = name_value[0].replace(/^ /, '');
//             cookies[decodeURIComponent(name_value[0])] = decodeURIComponent(name_value[1]);
//         }
//     }
//     return cookies;
// };

// var checkForSmarter = function() {
//     var cks = getAllCookies();
//     var loiid = cks.smtrrmkr.split('^')[1];
//     var session = cks.smtrrmkr.split('^')[2];

//     results = "loiId: " + loiid + "\n" + "session: " + session;

//     return results;
// };

// var getLoiid = function() {
//     var cks = getAllCookies();
//     console.log(cks);
//     var loiid = cks.smtrrmkr.split('^')[1];
//     return loiid;
// };

console.log(cookieinfo());
console.log(JSON.stringify(cookieinfo()));


var sendToApi = function(trackingServer, accountNumber) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://" + trackingServer + ":9098/api/account/" + accountNumber + "/visitor/" + JSON.stringify(cookieinfo()), true); // + getLoiid()
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
};

sendToApi("s871trkd02vw", "9");