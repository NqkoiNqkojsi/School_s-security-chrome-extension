chrome.history.onVisited.addListener(function(item){
  let url = item.url;
  let dateNow=new Date();
  let visitedOn = dateNow.toDateString()+" "+dateNow.toTimeString().split(' ')[0];
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
const xmlhttp2 = new XMLHttpRequest();
xmlhttp2.onload = function() {
  if(this.responseText == "True")
  {
    chrome.cookies.remove();
    chrome.history.deleteAll()
    chrome.tabs.getCurrent(function(tab) {
      chrome.tabs.remove(tab.id, function(){});
    });
  }
}
xmlhttp2.open("GET", "http://192.168.1.5:5000/newPeriod?day=" + day);
xmlhttp2.send();
