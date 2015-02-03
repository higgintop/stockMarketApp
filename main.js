(function() {

   'use strict';

    var $symbol;
    var url;
    var $qty;
    var total = 0;

  $.get('https://stockMarketApp.firebaseio.com/holdings.json', function(resFB){
    Object.keys(resFB).forEach(function(uuid){
      loadStock(uuid, resFB[uuid]);
    })

  });

  $(function init() {
    $('#buy').on('click', buyStock);

    $('#target').on('click', '.remove', removeStock);
  }); // init

  function removeStock() {
    var $listToRemove = $(this).parent().parent();

    // get the price here
    var price = $listToRemove.children(".price").text();
    var qty = $listToRemove.children(".qty").text();

    total = total - (price * qty);
    total = Math.round(total * 100)/100;

    $('.total').text("Total: " + total);

    $listToRemove.remove();
  }

  function buyStock () {
      var $symbol= $('#symbol').val().toUpperCase();
      $qty = $("#quantity").val();
      url = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol='+ $symbol;

      $('#symbol').val('');
      $("#quantity").val('');

      $.get(url, function(res){
        var name = res.Name;
        var lastPrice = res.LastPrice;
        lastPrice = Math.round(lastPrice * 100)/100;
        var change = res.Change;
        change = Math.round(change * 100)/100;
        var changePercent = res.ChangePercent;
        changePercent = Math.round(changePercent * 100)/100;

        total = total + (lastPrice * $qty);
        total = Math.round(total * 100)/100;

        var stock = { name: name, lastPrice: lastPrice, qty: $qty, change: change, changePercent: changePercent};
        //POST name lastPrice change changePercent to the .json
        var urlFB = 'https://stockMarketApp.firebaseio.com/holdings.json';
        var data = JSON.stringify(stock);
        $.post(urlFB, data, function(res){
          console.log("post response: ", res);
          var uuid = res.name;
          loadStock(uuid, stock);
          //set an attr on the tr ('data-uuid', res.name)
          //append tr to the tbody
        });

        // make the tr and append

      }, 'jsonp'); // end of get

  } // buy stock

  function loadStock(uuid, data){
    var stocks = [];

    var $div = $('<div class="row"></div>');

    //making the list items and appending to $ul
    var $divName = $('<div class="small-2 columns center">' + data.name + '</div>');
    var $divLastPrice = $('<div class="small-2 columns price center">' + data.lastPrice + '</div>');
    var $divQty = $('<div class="small-2 columns qty center">' + data.qty + '</div>');
    var $divChange = $('<div class="small-2 columns center">' + data.change + '</div>');
    var $divChangePercent = $('<div class="small-2 columns center">' + data.changePercent + '</div>');
    var $divRemove = $('<div class="small-2 columns center"><button class="alert remove">Remove</button></div>');
    console.log(data.name);
    $div.append($divName);
    $div.append($divLastPrice);
    $div.append($divQty);
    $div.append($divChange);
    $div.append($divChangePercent);
    $div.append($divRemove);

    stocks.push($div);

    // return stocks;

    $('#target').append(stocks);
    // $('#targetTotal').empty();
    // $('#targetTotal').append(createTotal());

  }//loadStock

  function createTotal(){
    var h2Total = $('<h2 class="total">Total: $' + total + '</h2>');

    return h2Total;
  }


})();
