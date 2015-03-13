var domain = document.location.hostname;
var smtrCookie = chrome.cookies.get({"url": domain,"name": "smtrrmkr"});
console.log(smtrCookie);
alert(smtrCookie);