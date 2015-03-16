var addContent = function(id, content) {
    return document.getElementById(id).textContent = content;
}

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
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "http://" + trackingServer + ":9098/api/account/" + accountNumber + "/visitor/" + loiid, true);
            xhr.onreadystatechange = function() {
              if (xhr.readyState == 4) {
                var response = xhr.responseText;
                var parsed = JSON.parse(response);
                console.log(parsed);
                var userLoiid = parsed.LOIId;
                var sessions = parsed.Sessions;
                var create_timestamp = sessions[0].DateCreated;
                create_timestamp = create_timestamp.split("T");
                var session_create_date = create_timestamp[0];
                var session_create_time = create_timestamp[1];

                var hasEmail = parsed.HasEmail !== false ? parsed.Emails : "there is no email loaded for this loiid";
                for(var i = 0; i < sessions.length; i++) {
                    var responseObj = {
                        "session": {
                            "ID": sessions[i].SessionId,
                            "create": {
                                "date": session_create_date,
                                "time": session_create_time
                            },
                            "onsite": {
                                "click_through": sessions[i].OnSiteClickThroughs,
                                "impression": sessions[i].OnSiteContentImpressions
                            },
                            "products": {
                                "viewed": sessions[i].ProductsViewed,
                                "carted": sessions[i].ProductsCarted,
                                "purchased": sessions[i].ProductsPurchased,
                                "reviews": sessions[i].ProductReviews
                            },
                            "purchases": sessions[i].Purchases,
                            "categoriesViewed": sessions[i].CategoriesViewed
                        },
                        "loiid": userLoiid,
                        "hasEmail": hasEmail
                    };
                    console.log(responseObj);
                }
                addContent("session_email", responseObj.hasEmail);
                addContent("session_loiid", responseObj.loiid);
                addContent("session_id", responseObj.session.ID);
                addContent("session_create_date", responseObj.session.create.date);
                addContent("session_create_time", responseObj.session.create.time);
                // addContent("", responseObj.);
                // var uniqueDiv = document.createElement("div");
                // uniqueDiv.id = "uniqueDiv";
                // uniqueDiv.createElement()
                // document.body.appendChild(uniqueDiv);
                // uniqueDiv.innerHTML = responseObj;
              }
            }
            xhr.send();
        });
    });
};

window.onload = sendToApi("s871trkd02vw", "231");

// This actually works!
//document.getElementById("dashboard").textContent = "stuff goes here";