(function(){ 
  page=window.location.search.split('=')[1];
  xmlhttp.onload = function() {
    let historyItems=JSON.parse(this.responseText);
    let 
  }
  xmlhttp.open("GET", "http://192.168.1.5:5000/history?page=" +page.toString());
  xmlhttp.send();
})();

function PageTransition(){
  document.location.href = "http://192.168.1.5:5000/history?page=";
}

(function() {
 
    window.inputNumber = function(el) {
  
      var min = el.attr('min') || false;
      var max = el.attr('max') || false;
  
      var els = {};
  
      els.dec = el.prev();
      els.inc = el.next();
  
      el.each(function() {
        init($(this));
      });
  
      function init(el) {
  
        els.dec.on('click', decrement);
        els.inc.on('click', increment);
  
        function decrement() {
          var value = el[0].value;
          value--;
          if(!min || value >= min) {
            el[0].value = value;
          }
        }
  
        function increment() {
          var value = el[0].value;
          value++;
          if(!max || value <= max) {
            el[0].value = value++;
          }
        }
      }
    }
  })();
  
  inputNumber($('.input-number'));