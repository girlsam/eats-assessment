$(document).on('ready', function() {
  $.ajax({
    url: 'https://galvanize-eats-api.herokuapp.com/menu',
    method: 'GET'
  }).done(function(data){
    let MENUARRAY = data.menu;
    for (var i = 0; i < MENUARRAY.length; i++) {
      var menuType = MENUARRAY[i].type;
      var menuItem = MENUARRAY[i].name;
      console.log(menuItem);
      console.log(menuType);
      $('.menu-list').append('<li>' + menuItem + '</li>');
    }
  });
});
