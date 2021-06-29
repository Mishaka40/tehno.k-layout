function leftMenu(){
  var active_btn_class = 'menu_active_btn';
  var disp_none_class = 'disp-none';
  var menu_arrow = $('.menu__extend__arrow');
  var ext_menu = $('.left-menu__extend');
  var ext_menu_active = 'extend';
  var ext_menu_btn = $('#services_btn');
  var ext_menu_btn_close = $('.extend__close');
  var left_menu = $('.left-menu');
  var left_menu_active = 'menu-active';
  var left_menu_btn = $('.header__menu-btn');
  var open_icon = $('.menu_open');
  var close_icon = $('.menu_close');

  function btnExtendMenu(){
    $(this).addClass(active_btn_class);
    close_outside();
    if ($(window).width() <= 768){
      menu_arrow.removeClass(disp_none_class);
    }
  }

  function closeExtendMenu() {
    ext_menu_btn.removeClass(active_btn_class);
    ext_menu.removeClass(ext_menu_active);
  }

  function headerButton(){
    if(ext_menu.hasClass(ext_menu_active)){
      ext_menu.removeClass(ext_menu_active);
      ext_menu_btn.removeClass(active_btn_class);
      menu_arrow.addClass(disp_none_class);
    } else {
      if(left_menu.hasClass(left_menu_active)) {
        left_menu.removeClass(left_menu_active);
        open_icon.toggleClass(disp_none_class);
        close_icon.toggleClass(disp_none_class);
      } else {
        close_outside_leftMenu();
        open_icon.toggleClass(disp_none_class);
        close_icon.toggleClass(disp_none_class);
      }
    }
  }

  function close_outside(){
    $(document).click(function(event) { 
      var $target = $(event.target);
      if(!$target.closest('.left-menu__extend').length && ext_menu.hasClass(ext_menu_active)) {
        ext_menu.removeClass(ext_menu_active);
        ext_menu_btn.removeClass(active_btn_class);
      }
    });
    ext_menu.on('scroll', function(){
      var last = document.getElementById("last");
      var rect = last.getBoundingClientRect().bottom;
      var client_h=$(window).height();
      if (rect>client_h){
        menu_arrow.removeClass(disp_none_class);
      } else {
        menu_arrow.addClass(disp_none_class);
      }
    });
    setTimeout(function(){
      ext_menu.addClass(ext_menu_active);
    }, 500);
  }

  function close_outside_leftMenu(){
    $(document).click(function(event) {
      var $target = $(event.target);
      if(!$target.closest('.left-menu').length && left_menu.hasClass(left_menu_active) && !ext_menu.hasClass(ext_menu_active)) {
        left_menu.removeClass(left_menu_active);
        open_icon.toggleClass(disp_none_class);
        close_icon.toggleClass(disp_none_class);
      }
    });
    setTimeout(function(){
      left_menu.addClass(left_menu_active);
    }, 500);
  }

  ext_menu_btn.on('click', btnExtendMenu);
  ext_menu_btn_close.on('click', closeExtendMenu);
  left_menu_btn.on('click', headerButton);
}


function getServiceName(){
  if ($(".buy-service")[0]) {
    $('.buy-service').on('click', function () {
      var serv_name = $(this).data('service');
      $('.service-name').val(serv_name);
    });
  }
}

function textShortener (){
  if ($('*').is('.seo_block__desc')) {
    var about_text = $('.seo_block__desc p').html();
    if (about_text.length >= 400) {
      about_text = about_text.substring(0, 400);
      var lastIndex = about_text.lastIndexOf(" ");
      about_text = about_text.substring(0, lastIndex) + '...';
      $('.seo_block__desc p').html(about_text);
    }
  }
 if ($('*').is('.about__text')) {
    var about_text = $('.about__text span').html();
    if (about_text.length >= 400) {
      about_text = about_text.substring(0, 400);
      var lastIndex = about_text.lastIndexOf(" ");
      about_text = about_text.substring(0, lastIndex) + '...';
      $('.about__text span').html(about_text);
    }
  }
  if ($('*').is('.text__inner') && $('*').is('#credits')) {
    var textQuan=$('.text__inner p').length;
    for(var x=0;x<textQuan;x++) {
      var about_text = $('.text__inner p').eq(x).html();
      if (about_text.length >= 200) {
        about_text = about_text.substring(0, 200);
        var lastIndex = about_text.lastIndexOf(" ");
        about_text = about_text.substring(0, lastIndex) + '...';
        $('.text__inner p').eq(x).html(about_text);
      }
    }
  }
}

function homeSlider(){
  var clicks=0;
  var dots_holder = $('.slider-nav');
  var bg_imgs = [
      '/img/image_8.png',
      '/img/about/image.jpg',
      '/img/contacts/image.png',
      '/img/credits/4.jpg'
    ];
    $('.home-main').css('background-image','url('+bg_imgs[0]+')');
  var dots = '<ul class="slick-dots"><li role="presentation" class="home-slick-active"><button type="button" role="tab" class="dot_btn_home" data-slide="0">0</button></li>';
  for(var t=1;t<bg_imgs.length;t++)
    dots+='<li role="presentation"><button type="button" role="tab" class="dot_btn_home" data-slide="'+t+'">'+t+'</button></li>';
  dots+='</ul>';
  dots_holder.append(dots);
  
  function btnClick(){
    var slide = $(this).data('slide');
    if (slide!=-1){
      $('.home-main').css('background-image','url('+bg_imgs[slide]+')');
    } else {
      $('.home-main').removeAttr('style');
    }
    clicks=slide;
    changeDot(slide);
  }

  function changeDot(dot){
    for(var t=0;t<=bg_imgs.length;t++)
      $('.slick-dots li').removeClass();
    $('.slick-dots li').eq(dot).addClass('home-slick-active');
  }

  function rightClick(){
    if(clicks<bg_imgs.length-1){
      clicks++;
      $('.home-main').css('background-image','url('+bg_imgs[clicks]+')');
      changeDot(clicks);
    } else {
      $('.home-main').css('background-image','url('+bg_imgs[0]+')');
      clicks=0;
      changeDot(0);
    }
  }
  function leftClick(){
    if(clicks>0){
      clicks--;
      $('.home-main').css('background-image','url('+bg_imgs[clicks]+')');
      changeDot(clicks);
    } else {
      clicks=bg_imgs.length-1;
      $('.home-main').css('background-image','url('+bg_imgs[clicks]+')');
      changeDot(clicks);
    }
    console.log(clicks);
  }

  if ($(window).width() <= 1028 && $(window).width() >666){
    $('.slider-nav').detach().prependTo($('.sec-nav'));
  }

  $('.carousel-arrow-right').on('click', rightClick);
  $('.sec-arrow-right').on('click', rightClick);
  $('.carousel-arrow-left').on('click', leftClick);
  $('.sec-arrow-left').on('click', leftClick);
  $('.dot_btn_home').on('click', btnClick);
}

function servicesSlider(){
  if ($(window).width() <= 1028 && $(window).width() >666){
    $(".services__slider__row").slick({
      dots: true,
      arrows: true,
      appendArrows: $('.slider__nav__arrows'),
      appendDots: $('.slider__nav__dots'),
      prevArrow: '<div class="btn_arr_left services__slider_left"><svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M-3.49691e-07 7L8.25 0.0717961L8.25 13.9282L-3.49691e-07 7Z" fill="#ffffff"/></svg></div>',
      nextArrow: '<div class="btn_arr_right services__slider_right"><svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 7L0.75 13.9282L0.750001 0.0717965L9 7Z" fill="#ffffff"/></svg></div>',
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 1
    });
  } else if($(window).width() >= 1028){
    $(".services__slider__row").slick({
      dots: true,
      arrows: true,
      appendArrows: $('.slider__nav__arrows'),
      appendDots: $('.slider__nav__dots'),
      prevArrow: '<div class="btn_arr_left services__slider_left"><svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M-3.49691e-07 7L8.25 0.0717961L8.25 13.9282L-3.49691e-07 7Z" fill="#ffffff"/></svg></div>',
      nextArrow: '<div class="btn_arr_right services__slider_right"><svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 7L0.75 13.9282L0.750001 0.0717965L9 7Z" fill="#ffffff"/></svg></div>',
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1
    });
  }
}

function clientsSlider(){
  if ($(window).width() <= 666){
    $('.clients__vslider').slick({
      arrows: false,
      dots: true,
      appendDots: $('.clients__sec-nav'),
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: true,
      infinite: true,
    });
  } else {
    $(".clients__vslider").slick({
      dots: true,
      arrows: true,
      appendArrows: $('.ver-slider__nav__arrows'),
      appendDots: $('.ver-slider__nav__dots'),
      prevArrow: '<div class="btn_arr_left clients__slider_left"><svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M-3.49691e-07 7L8.25 0.0717961L8.25 13.9282L-3.49691e-07 7Z" fill="#ffffff"/></svg></div>',
      nextArrow: '<div class="btn_arr_right clients__slider_right"><svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 7L0.75 13.9282L0.750001 0.0717965L9 7Z" fill="#ffffff"/></svg></div>',
      vertical: true,
      slidesToShow: 3,
      slidesToScroll: 2,
      draggable: true,
      infinite: false,
      verticalSwiping: true,
    });
  }
}

function altrowsSlider(){
  if ($(window).width() <= 666) {
    setTimeout(function () {
      $('.alternating-rows').slick({
        arrows: false,
        dots: true
      });
    }, 700);
  }
}

$( document ).ready(function() {
  leftMenu();
  getServiceName();
  if ($(window).width() <= 666){
    textShortener();
  }
  $("#phone-form").validate();
});