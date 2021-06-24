$( document ).ready(function() {
  $('#services_btn').on('click', function () {
    $(this).addClass('menu_active_btn');
    close_outside();
    if ($(window).width() <= 666){
      $('.menu__extend__arrow').removeClass('disp-none');
    }
  });

  $('.extend__close').on('click', function () {
    $('#services_btn').removeClass('menu_active_btn');
    $('.left-menu__extend').removeClass('extend');
  });

  $('.header__menu-btn').on('click', function () {
    if($('.left-menu__extend').hasClass('extend')){
      $('.left-menu__extend').removeClass('extend');
      $('#services_btn').removeClass('menu_active_btn');
      $('.menu__extend__arrow').addClass('disp-none');
    } else {
      $('.left-menu').toggleClass('menu-active');
      $('.menu_open').toggleClass('disp-none');
      $('.menu_close').toggleClass('disp-none');
    }
  });

  if ($(".buy-service")[0]) {
    $('.buy-service').on('click', function () {
      var serv_name = $(this).data('service');
      $('.service-name').val(serv_name);
    });
  }

  function close_outside(){
    $(document).click(function(event) { 
      var $target = $(event.target);
      if(!$target.closest('.left-menu__extend').length && $('.left-menu__extend').hasClass('extend')) {
        $('.left-menu__extend').removeClass('extend');
        $('#services_btn').removeClass('menu_active_btn');
      }        
    });
    $('.left-menu__extend').on('scroll', function(){
      var last = document.getElementById("last");
      var rect = last.getBoundingClientRect().bottom;
      var client_h=$(window).height();
      if (rect>client_h){
        $('.menu__extend__arrow').removeClass('disp-none');
      } else {
        $('.menu__extend__arrow').addClass('disp-none');
      }
    });
    setTimeout(function(){
      $('.left-menu__extend').addClass('extend');
    }, 500);
  }
});