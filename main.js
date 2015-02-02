(function() {

   'use strict';

    var $symbol;
    var url;
    var $qty;
    var total = 0;

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
      console.log(url);

      $('#symbol').val('');
      $("#quantity").val('');

      $.get(url, function(res){

        // call createList with our items
        $('#target').append(createList(res));
        $('#targetTotal').empty();
        $('#targetTotal').append(createTotal());

      }, 'jsonp'); // buyStock

  }


  function createList(res){
    var name = res.Name;
    var lastPrice = res.LastPrice;
    lastPrice = Math.round(lastPrice * 100)/100;
    var change = res.Change;
    change = Math.round(change * 100)/100;
    var changePercent = res.ChangePercent;
    changePercent = Math.round(changePercent * 100)/100;
    total = total + (lastPrice * $qty);
    total = Math.round(total * 100)/100;

    var stocks = [];

    var $ul = $('<ul></ul>');

    //making the list items and appending to $ul
    var $liName = $('<li>' + name + '</li>');
    var $liLastPrice = $('<li class="price">' + lastPrice + '</li>');
    var $liQty = $('<li class="qty">' + $qty + '</li>');
    var $liChange = $('<li>' + change + '</li>');
    var $liChangePercent = $('<li>' + changePercent + '</li>');
    var $liRemove = $('<li><button class="remove">Remove</button></li>');
    $ul.append($liName);
    $ul.append($liLastPrice);
    $ul.append($liQty);
    $ul.append($liChange);
    $ul.append($liChangePercent);
    $ul.append($liRemove);

    stocks.push($ul);
  
    return stocks;

  }//createList

  function createTotal(){
    var h2Total = $('<h2 class="total">Total:' + total + '</h2>');

    return h2Total;
  }




})();
