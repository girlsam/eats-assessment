$(document).on('ready', function() {
  $.ajax({
    url: 'https://galvanize-eats-api.herokuapp.com/menu',
    method: 'GET'
  }).done(function(data){
    var menuArray = data.menu;
    var typeArrAll = menuArray.map(function(item) {
      return item.type;
    });
    var menuTypesArr = typeArrAll.filter(function(type, index, inputArray) {
      return inputArray.indexOf(type) === index;
    });
    // console.log(menuTypesArr);
    for (var i = 0; i < menuArray.length; i++) {
      var menuType = menuArray[i].type;
      var menuItem = menuArray[i].name;
      var itemPrice = menuArray[i].price;
      if (menuItem[i].type === menuTypesArr[i]) {
        // console.log(menuTypesArr[i]);
        // console.log(menuItem);
        $('.menu').append('<optgroup label="' + menuType + '"></optgroup>');
        $('.menu').append('<option value="' + itemPrice + '">' + menuItem + ' - $' + itemPrice + '</option');
      }
    }
  });
  $('.quantity-submit').on('click', function(event) {
    event.preventDefault();
    var quant = $('#quantity').val();
    var selectItem = $('.menu option').val();
    var itemCost = $('option:selected').val();
    console.log(itemCost);
    $('.menu option').each(function() {
      var subTotal = 0;
      if (this.selected === true) {
        for (var i = 0; i < quant; i++) {
          $('.checkout-box').append('<p>' + selectItem + '</p>');
        }
        getSubTotal();
      }
    });
  });
});

//submit info and "post"
$('.personal-info-submit').on('click', function(event) {
  event.preventDefault();
  if ($('input').val().length === 0) {
    alert('Please complete the whole form before submitting. K, thanks.');
  } else {
    $.ajax({
      url: 'https://galvanize-eats-api.herokuapp.com/orders',
      method: 'POST'
    }).done(function(data) {
      alert('You have ordered! Now you wait.');
    }).fail(function(data) {
      console.log(data);
    });
  }
});

//functions for checkout
function getSubTotal() {
  var checkoutSubTotal = 0;
  var quant = $('#quantity').val();
  var itemSubTotal = $('option:selected').val();
  for (var i = 0; i < quant; i++) {
    checkoutSubTotal += (quant * itemSubTotal);
    return checkoutSubTotal;
  }
  console.log(checkoutSubTotal);
  $('#subtotal').text(checkoutSubTotal);
}
