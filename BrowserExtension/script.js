chrome.history.onVisited.addListener(function(item){
  let url = item.url;
  let dateNow=new Date();
  let visitedOn = dateNow.toDateString()+" "+dateNow.toTimeString().split(' ')[0];
  let title = item.title;
  let splitURL= item.url.split("/");
  let website = splitURL[2];

  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onload = function() {
  if(this.responseText == "True")
    {
        console.log(this.responseText);
    }
  }
  xmlhttp.open("GET", "http://127.0.0.1:5000/newHistory?website=" +website+ "&url=" +url+"&title=" +title+"&visitedOn=" +visitedOn+"&computerId=1");
  xmlhttp.send();
});