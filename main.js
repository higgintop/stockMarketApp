(function() {

   'use strict';

    var $symbol;
    var url;
    var $qty;

  // initialization function
  $(function init() {

    $('#buy').click(function(){
      var $symbol= $('#symbol').val().toUpperCase();
      $qty = $("#quantity").val();
      url = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol='+ $symbol + '&callback=?';
      console.log(url);

      $.getJSON(url, function(res){

        // call createList with our items
        $('#target').append(createList(res));

      });

    });
   
  }); // init

  function createList(res){
    var name = res.Name;
    var lastPrice = res.LastPrice;
    lastPrice = Math.round(lastPrice * 100)/100;
    var change = res.Change;
    change = Math.round(change * 100)/100;
    var changePercent = res.ChangePercent;
    changePercent = Math.round(changePercent * 100)/100;

    var stocks = [];

    
    var $ul = $('<ul></ul>');

    var $liName = $('<li>' + name + '</li>');
    var $liLastPrice = $('<li>' + lastPrice + '</li>');
    var $liQty = $('<li>' + $qty + '</li>');
    var $liChange = $('<li>' + change + '</li>');
    var $liChangePercent = $('<li>' + changePercent + '</li>');
    var $liRemove = $('<li><button>Remove</button></li>');
    $ul.append($liName);
    $ul.append($liLastPrice);
    $ul.append($liQty);
    $ul.append($liChange);
    $ul.append($liChangePercent);
    $ul.append($liRemove);

      

    stocks.push($ul);
  

    return stocks;


  }//createList

})();
