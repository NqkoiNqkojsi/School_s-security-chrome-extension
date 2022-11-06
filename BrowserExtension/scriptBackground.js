chrome.history.onVisited.addListener(function(item){
    let url = item.url;
    let dateNow=new Date();
    let visitedOn = dateNow.toDateString()+" "+dateNow.toTimeString().split(' ')[0];
    let title = item.title;
    let splitURL= item.url.split("/");
    let website = splitURL[2];
    console.log(url);
    /*
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() {
      console.log(this.responseText);
    }
    xmlhttp.open("GET", "http://127.0.0.1:5000/newHistory?website=" +website+ "&url=" +url+"&title=" +title+"&visitedOn=" +visitedOn+"&computerId=1");
    xmlhttp.send();*/
    fetch("http://127.0.0.1:5000/newHistory?website=" +website+ "&url=" +url+"&title=" +title+"&visitedOn=" +visitedOn+"&computerId=1", {
        method: 'GET'
    })
        .then(response => response.text())
        .then(response => console.log(response))
        .catch()
  });
  
  
  //method to remove cookies present
  var removeAllCookies = function () {
    if (!chrome.cookies) {
      chrome.cookies = chrome.experimental.cookies;
    }
    let removeCookie = function (cookie) {
      let url = "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain + cookie.path;
      console.log(cookie.name);
      console.log(cookie.url);
      chrome.cookies.remove({"url": url, "name": cookie.name});
    };
    chrome.cookies.getAll({}, function (all_cookies) {
      let count = all_cookies.length;
      console.log("Cookie Count=");
      console.log(count);
      for (var i = 0; i < count; i++) {
          removeCookie(all_cookies[i]);
      }
    });
  };
  
  //delete all the history, tabs and ect
  function DeleteInfo(){
    chrome.identity.clearAllCachedAuthTokens();
    removeAllCookies();
    chrome.history.deleteAll();
    chrome.tabs.query({},function(allTabs) {
      allTabs.forEach(tab => {
        chrome.tabs.remove(tab.id);
      });
    });
  }
  
  //checks if its time to delete the info
  function CheckForDeletion(){
    /*
    const xmlhttp2 = new XMLHttpRequest();
    xmlhttp2.onload = function() {
      console.log(this.responseText);
      if(this.responseText == "True")
      {
        DeleteInfo();
      }
    }
    xmlhttp2.open("GET", "http://127.0.0.1:5000/tryLogOutDebug/" + (new Date().getDay()+1).toString());
    xmlhttp2.send();*/
    fetch("http://127.0.0.1:5000/tryLogOutDebug/" + (new Date().getDay()+1).toString(), {
        method: 'GET'
    })
        .then(response => response.text())
        .then(response => console.log(response))
        .catch()
  }
  
  
  //alarm is set to check if the info needs to be deleted every 5 mins
  chrome.alarms.create("CheckClass", {delayInMinutes:0, periodInMinutes:5});
  chrome.alarms.onAlarm.addListener(function(alarm){
    if(alarm.name=="CheckClass"){
      CheckForDeletion();
    }
  });
  
  chrome.contentSettings.CookiesContentSetting="session_only" ;
  /*
  chrome.privacy.services.autofillEnabled.set({ value: false });
  chrome.privacy.services.searchSuggestEnabled.set({ value: false });
  chrome.privacy.services.passwordSavingEnabled.set({ value: false });*/
  function onRemoved() {
    console.log("removed");
  }
  
  function onError(error) {
    console.error(error);
  }
  
  chrome.browsingData.removePasswords({}).then(onRemoved, onError);