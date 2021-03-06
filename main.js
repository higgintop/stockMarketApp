(function() {

   'use strict';

    var $symbol;
    var url;
    var $qty;
    var total = 0;
    var urlFB = 'https://stockMarketApp.firebaseio.com/holdings.json';

  $(function init() {
    $('#buy').on('click', buyStock);

    $('#target').on('click', '.remove', removeStock);

    loadPage();
  }); // init

  function loadPage(){
    $.get('https://stockMarketApp.firebaseio.com/holdings.json', function(resFB){
      Object.keys(resFB).forEach(function(uuid){
        loadStock(uuid, resFB[uuid]);
        createTotal(resFB[uuid]);
      })

    });
  }

  function removeStock(evt) {
    var $divToRemove = $(evt.target).parent().parent();//this is a jquery or html element
    var uuid = $divToRemove.data('uuid');

    var urlItem = 'https://stockMarketApp.firebaseio.com/holdings/' + uuid + '.json';
    $.ajax(urlItem, {type: 'DELETE'});
    $('#target').empty();
    loadPage();

    // // get the price here
    // var price = $divToRemove.children(".price").text();
    // var qty = $divToRemove.children(".qty").text();
    //
    // total = total - (price * qty);
    // total = Math.round(total * 100)/100;
    //
    // $('.total').text("Total: $" + total);
    //
    // $divToRemove.remove();
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

        var stock = { name: name, lastPrice: lastPrice, qty: $qty, change: change, changePercent: changePercent};
        var data = JSON.stringify(stock);
        $.post(urlFB, data, function(res){
          total = 0;
          $('#target').empty();
          loadPage();
        });

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
    $div.append($divName);
    $div.append($divLastPrice);
    $div.append($divQty);
    $div.append($divChange);
    $div.append($divChangePercent);
    $div.append($divRemove);
    $div.attr('data-uuid', uuid);

    stocks.push($div);

    // return stocks;
    $('#target').append(stocks);

  }//loadStock

  function createTotal(data){
    var stockTotal = data.qty * data.lastPrice;
    stockTotal = Math.round(stockTotal * 100)/100;
    total += stockTotal;
    total = Math.round(total * 100)/100;
    $('.total').text("Total: $" + total);
    return total;
  }


})();
