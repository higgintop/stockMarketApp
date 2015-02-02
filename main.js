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

    var $tr = $('<tr></tr>');

    //making the list items and appending to $ul
    var $tdName = $('<td>' + name + '</td>');
    var $tdLastPrice = $('<td class="price">' + lastPrice + '</td>');
    var $tdQty = $('<td class="qty">' + $qty + '</td>');
    var $tdChange = $('<td>' + change + '</td>');
    var $tdChangePercent = $('<td>' + changePercent + '</td>');
    var $tdRemove = $('<td><button class="remove">Remove</button></td>');
    $tr.append($tdName);
    $tr.append($tdLastPrice);
    $tr.append($tdQty);
    $tr.append($tdChange);
    $tr.append($tdChangePercent);
    $tr.append($tdRemove);

    stocks.push($tr);

    return stocks;

  }//createList

  function createTotal(){
    var h2Total = $('<h2 class="total">Total:' + total + '</h2>');

    return h2Total;
  }




})();
