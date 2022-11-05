(function() {
    ('.material-form').css({
        'position' : 'absolute',
        'left' : '50%',
        'top' : '50%',
        'margin-left' : -$('.material-form').outerWidth()/2,
        'margin-top' : -$('.material-form').outerHeight()/2
    });
});

function sendInfo(){
    let day= document.getElementById("day").value;
    let startPeriod= document.getElementById("startPeriod").value;
    let endPeriod= document.getElementById("endPeriod").value;
    let grade= document.getElementById("grade").value;
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() {
      console.log(this.responseText);
    }
    xmlhttp.open("GET", "http://192.168.1.5:5000/newPeriod?day=" +day.toString()+ "&startPeriod=" +startPeriod.toString()+"&endPeriod=" +endPeriod.toString()+"&grade=" +grade.toString());
    xmlhttp.send();
}