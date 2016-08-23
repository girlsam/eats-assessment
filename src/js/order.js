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
    for (var i = 0; i < menuTypesArr.length; i++) {
      $('.menu').append('<optgroup label="' + menuTypesArr[i] + '"></optgroup>');
    }
    menuArray.forEach(function(items) {
      $('.menu [label =' + items.type + ']').append('<option value="' + items.price + '"' + 'name="' + items.name + '">' + items.name + ' - $' + items.price + '</option');
      });
    });
  });

  //on submit of item quantity
  $('.quantity-submit').on('click', function(event) {
    event.preventDefault();
    var quant = $('#quantity').val();
    var itemCost = $('option:selected').val();
    var selectItem = $('.menu option:selected').text();
    $('.menu option').each(function() {
      var subTotal = 0;
      if (this.selected === true) {
        for (var i = 0; i < quant; i++) {
          $('.checkout-box').append('<p>' + selectItem + '</p>');
            $('#subtotal').text(getSubTotal());
            $('#tax').text(getTaxTotal());
            $('#grandtotal').text(getGrandTotal());
        }
      }
    });
  });
//});

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
}

function getTaxTotal() {
  var TAX_RATE = 0.15;
  var taxTotal = 0;
  taxTotal = parseFloat(parseFloat(getSubTotal() * TAX_RATE).toFixed(2));
  return taxTotal;
}

function getGrandTotal() {
  var total = 0;
  total = getSubTotal() + getTaxTotal();
  return total;
}
