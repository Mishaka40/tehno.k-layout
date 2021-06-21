var vbtn_left = $('.clients__slider_left');
var vbtn_right = $('.clients__slider_right');
var vrows = $('.vslider__row');
var vleft = 0;
var vcount=0;
var vquan = $('.clients__vslider__slide').length;
var vdots = $('.ver-slider__nav__dots');
var corr=0;

vquan=vquan/3-1;
if (!Number.isInteger(vquan)){
  Math.floor(vquan);
  corr=1;
}

if (vcount<vrows.length)
  vbtn_right.addClass('active_btn');

for(var x = 0;x<=vquan+corr;x++)
  vdots.append('<div href="#" class="nav__dots clients_dots" onclick="show_slides(this, '+x+')"></div>');

var vdot = $('.clients_dots');

vdot.first().addClass('active_dot');

vbtn_right.on('click', function () {
  if (vcount<vquan) {
    vdot.eq(vcount).removeClass('active_dot');
    vbtn_left.addClass('active_btn');
    vleft -= 100;
    vcount++;
    vdot.eq(vcount).addClass('active_dot');
    if (vcount>=vquan)
      vbtn_right.removeClass('active_btn');
    for (var i = 0; i < vrows.length; i++)
      vrows.css('left', vleft + '%');
  } else {
    vbtn_right.removeClass('active_btn');
  }
});

vbtn_left.on('click', function () {
  if (vcount>0) {
    vdot.eq(vcount).removeClass('active_dot');
    vbtn_right.addClass('active_btn');
    vleft += 100;
    vcount--;
    vdot.eq(vcount).addClass('active_dot');
    if (vcount<=0)
      vbtn_left.removeClass('active_btn');
    for (var i = 0; i < vrows.length; i++)
      vrows.css('left', vleft + '%');
  } else {
    vbtn_left.removeClass('active_btn');
  }
});

function show_slides(e, num) {
  vleft = -100*num;
  vcount=num;
  if (vcount<=0){
    vbtn_left.removeClass('active_btn');
  } else {
    vbtn_left.addClass('active_btn');
  }
  if (vcount<vquan){
    vbtn_right.addClass('active_btn');
  } else {
    vbtn_right.removeClass('active_btn');
  }
  for (var x = 0; x < vdot.length; x++)
    vdot.eq(x).removeClass('active_dot');
  e.classList.add('active_dot');
  for (var i = 0; i < vrows.length; i++)
    vrows.css('left', vleft + '%');
}

