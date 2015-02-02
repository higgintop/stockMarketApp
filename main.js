(function() {

   'use strict';

    var $symbol;
    var url;

  // initialization function
  $(function init() {

    $('#buy').click(function(){
      var $symbol= $('#symbol').val().toUpperCase();
      var $qty = $("#quantity").val();
      url = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol='+ $symbol + '&callback=?';
      console.log(url);

      $.getJSON(url, function(res){
        var name = res.Name;
        var lastPrice = res.LastPrice;
        var change = res.Change;
        var changePercent = res.ChangePercent;

        console.log(name, lastPrice, change, changePercent);

      });

    });
   
  });


  function grabData() {
  }


})();
