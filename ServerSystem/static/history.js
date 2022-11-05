function createTable(tableData) {
  let table = document.getElementById('table1');
  let tableBody = document.getElementById('tbody1');
  console.log(tableData)
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.lastChild);
  }
  tableData.forEach(function(rowData) {
    let row = document.createElement('tr');
    let cell1 = document.createElement('td');
    cell1.className ="text-left_small";
    cell1.appendChild(document.createTextNode(rowData["website"]));
    row.appendChild(cell1);
    let cell3 = document.createElement('td');
    cell3.className ="text-left_small";
    cell3.appendChild(document.createTextNode(rowData["title"]));
    row.appendChild(cell3);
    let cell4 = document.createElement('td');
    cell4.className ="text-left_large";
    cell4.appendChild(document.createTextNode(rowData["visitedOn"]));
    row.appendChild(cell4);
    let cell5 = document.createElement('td');
    cell5.className ="text-left_large";
    cell5.appendChild(document.createTextNode(rowData["computerId"]));
    row.appendChild(cell5);
    tableBody.appendChild(row);
  });
}

function PageTransition(){
  let page=document.getElementById("page").innerHTML;
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onload = function() {
    let historyItems=JSON.parse(this.responseText);
    createTable(historyItems);
  }
  xmlhttp.open("GET", "http://192.168.1.5:5000/history/" +page);
  xmlhttp.send();
}

function changePage(isUp){
  let numbField=document.getElementById("page");
  let numb=parseInt(numbField.innerHTML);
  if(isUp){
    numbField.innerHTML=(numb+1).toString();
  }else{
    if(numb!=1){
      numbField.innerHTML=(numb-1).toString();
    }
  }
  PageTransition();
}
