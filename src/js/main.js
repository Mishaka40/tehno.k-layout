function leftMenu(){
  var active_btn_class = 'menu_active_btn';
  var disp_none_class = 'disp-none';
  var menu_arrow = $('.menu__extend__arrow');
  var ext_menu = $('.left-menu__extend');
  var ext_menu_btn = $('#services_btn');
  var ext_menu_btn_close = $('.extend__close');
  var left_menu = $('.left-menu');
  var left_menu_btn = $('.header__menu-btn');

  function btnExtendMenu(){
    $(this).addClass(active_btn_class);
    close_outside();
    if ($(window).width() <= 768){
      menu_arrow.removeClass(disp_none_class);
    }
  }

  function closeExtendMenu() {
    ext_menu_btn.removeClass(active_btn_class);
    ext_menu.removeClass('extend');
  }

  function headerButton(){
    if(ext_menu.hasClass('extend')){
      ext_menu.removeClass('extend');
      ext_menu_btn.removeClass(active_btn_class);
      menu_arrow.addClass(disp_none_class);
    } else {
      left_menu.toggleClass('menu-active');
      $('.menu_open').toggleClass(disp_none_class);
      $('.menu_close').toggleClass(disp_none_class);
    }
  }

  function close_outside(){
    $(document).click(function(event) { 
      var $target = $(event.target);
      if(!$target.closest('.left-menu__extend').length && ext_menu.hasClass('extend')) {
        ext_menu.removeClass('extend');
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
      ext_menu.addClass('extend');
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
  if ($('.seo_block__desc').length) {
    var about_text = $('.seo_block__desc span').html();
    if (about_text.length >= 400) {
      about_text = about_text.substring(0, 400);
      var lastIndex = about_text.lastIndexOf(" ");
      about_text = about_text.substring(0, lastIndex) + '...';
      $('.seo_block__desc span').html(about_text);
    }
  }
  if ($('.about__text').length) {
    var about_text = $('.about__text span').html();
    if (about_text.length >= 400) {
      about_text = about_text.substring(0, 400);
      var lastIndex = about_text.lastIndexOf(" ");
      about_text = about_text.substring(0, lastIndex) + '...';
      $('.about__text span').html(about_text);
    }
  }
}

function homeSlider(){
  var clicks=0;
  var prev=0;
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
    changeDot(slide+1);
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
  $('.carousel-arrow-right').on('click', rightClick);
  $('.carousel-arrow-left').on('click', leftClick);
  $('.dot_btn_home').on('click', btnClick);
}

$( document ).ready(function() {
  leftMenu();
  getServiceName();
  if ($(window).width() <= 666){
    textShortener();
  }
  $("#phone-form").validate();
});