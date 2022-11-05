    function onGot(historyItems) {
    for (const item of historyItems) {
      listHistoryItems.url = item.url;
      listHistoryItems.lastVisitTime = item.lastVisitTime;
      listHistoryItems.title = item.title;
      let splitURL= item.url.split("/");
      listHistoryItems.website = splitURL[2];
      console.log(listHistoryItems);
    }
  }
chrome.history.search({text: "",startTime: 0,}).then(onGot);
const listHistoryItems = new Object();
chrome.history.onVisited.addListener(function(item){
  let url = item.url;
  let lastVisit = item.lastVisitTime;
  let title = item.title;
  let splitURL= item.url.split("/");
  let website = splitURL[2];
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onload = function() {
    console.log(this.responseText);
  }
  xmlhttp.open("GET", "http://192.168.1.5:5000/newHistory?website=" +website+ "&url=" +url+"&title=" +title+"&lastVisit=" +lastVisit+"&computerId=1");
  xmlhttp.send();
});