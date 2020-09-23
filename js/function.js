WhatAnimation("fadescroll");
WhatAnimation("moveleft");

$(window).scroll(function() {
    WhatAnimation("fadescroll");
    WhatAnimation("moveleft");
});

function WhatAnimation(name) {
    $("." + name).each(function() {
        switch (name) {
            case "fadescroll":
                AddClass(this, "fade");
                break;
            case "moveleft":
                AddClass(this, "left");
                break;
        }
    });
}

function AddClass(object, name) {
    if (IsVisible(object)) {
        $(object).addClass(name);
    } else {
        $(object).removeClass(name);
    }
}

function IsVisible(object) {
    var viewport = $(window).scrollTop() + $(window).height();
    var rand = $(object).offset();
    rand.bottom = rand.top + $(object).outerHeight();
    return !(
        viewport < rand.top + 500|| $(window).scrollTop() > rand.bottom - 250
    );
}

function timerzeigen() {
  var x = document.getElementById('timerbox');
    console.log(x.style.visibility);
  if (x.style.visibility == 'hidden' || x.style.visibility == '') {
    x.style.visibility = 'visible';
  }else{
    x.style.visibility = 'hidden';
  }
  count();
}

  var timeoutHandle;
  function count() {
  var startTime = document.getElementById('hms').innerHTML;
  var pieces = startTime.split(":");
  var time = new Date();    time.setHours(pieces[0]);
  time.setMinutes(pieces[1]);
  time.setSeconds(pieces[2]);
  var timedif = new Date(time.valueOf() - 1000);
  var newtime = timedif.toTimeString().split(" ")[0];
  document.getElementById('hms').innerHTML=newtime;
  timeoutHandle=setTimeout(count, 1000);
}
