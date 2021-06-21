var btn_left = $('.services__slider_left');
var btn_right = $('.services__slider_right');
var rows = $('.slider__row');
var left = 0;
var left2 = 0;
var count=0;
var slides = $('.services__slider__slide');
var quan = slides.length;
var dots = $('.slider__nav__dots');
var slide_size = 25;
var dot =0;
var slider = $('.services__slider');
quan-=4;

function windowSize(){
  if ($(window).width() <= 1280){
    quan+=2;
    slide_size = 50;
    create_slider();
  } else {
    dots.empty();
    create_dots();
  }
  set_active();
}
$(window).on('load resize',windowSize);

$('.slide-link').on('click', function () {
  var href = $(this).data('slide-link');
  window.location.href = href;
});

function set_active(){
  if($(window).width() <= 1280){
    $('.services__slider__slide').siblings().addClass('active-slide');
  } else {
    slides.siblings().removeClass('active-slide');
    slides.eq(count + 1).addClass('active-slide');
    slides.eq(count + 2).addClass('active-slide');
  }
}

function create_slider(){
  var new_slider='<div class="slider__row"><div class="services__slider__slide">';
  new_slider+=slides.eq(0).html();
  new_slider+='</div>';
  for(var j=1;j<slides.length;j++){
    if (j % 2 == 0) {
      new_slider += '</div><div class="slider__row">'
    }
    new_slider+='<div class="services__slider__slide">';
    new_slider+=slides.eq(j).html();
    new_slider+='</div>';
  }
  new_slider+='</div>';
  slider.empty();
  slider.append(new_slider);
  rows = $('.slider__row');
  slides = $('.services__slider__slide');
  set_active();
  dots.empty();
  create_dots();
}

function create_dots() {
  if (count < rows.length)
    btn_right.addClass('active_btn');

  for (var x = 0; x <= quan; x++)
    dots.append('<div href="#" class="nav__dots serv_dots" onclick="show_slide(this, ' + x + ')"></div>');

  dot = $('.serv_dots');

  dot.first().addClass('active_dot');
}

btn_right.on('click', function () {
    if (count < quan) {
      dot.eq(count).removeClass('active_dot');
      btn_left.addClass('active_btn');
      left -= slide_size;
      left2 -= slide_size;
      count++;
      dot.eq(count).addClass('active_dot');
      set_active();
      if (count >= quan)
        btn_right.removeClass('active_btn');
      for (var i = 0; i < rows.length; i++)
        rows.css('left', left + '%');
    } else {
      btn_right.removeClass('active_btn');
    }
});

btn_left.on('click', function () {
  if (count > 0) {
    dot.eq(count).removeClass('active_dot');
    btn_right.addClass('active_btn');
    left += slide_size;
    count--;
    dot.eq(count).addClass('active_dot');
    set_active();
    if (count <= 0)
      btn_left.removeClass('active_btn');
    for (var i = 0; i < rows.length; i++)
      rows.css('left', left + '%');
  } else {
    btn_left.removeClass('active_btn');
  }
});

function show_slide(e, num) {
  left = -slide_size * num;
  count = num;
  set_active();
  if (count <= 0) {
    btn_left.removeClass('active_btn');
  } else {
    btn_left.addClass('active_btn');
  }
  if (count < quan) {
    btn_right.addClass('active_btn');
  } else {
    btn_right.removeClass('active_btn');
  }
  for (var x = 0; x < dot.length; x++)
    dot.eq(x).removeClass('active_dot');
  e.classList.add('active_dot');
  for (var i = 0; i < rows.length; i++)
    rows.css('left', left + '%');
}
