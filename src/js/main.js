$('#services_btn').on('click', function () {
  $(this).addClass('menu_active_btn');
  $('.left-menu__extend').addClass('extend');
});

$('.extend__close').on('click', function () {
  $('#services_btn').removeClass('menu_active_btn');
  $('.left-menu__extend').removeClass('extend');
});

$('.header__menu-btn').on('click', function () {
  $('.left-menu').toggleClass('menu-active');
  $('#services_btn').removeClass('menu_active_btn');
  $('.left-menu__extend').removeClass('extend');
});

if ($(".buy-service")[0]) {
  $('.buy-service').on('click', function () {
    var serv_name = $(this).data('service');
    $('.service-name').val(serv_name);
  });
}