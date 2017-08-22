function pauseSong() {
  var myAudio = document.getElementById("player");
  $("div.pause").removeClass("pause").addClass("play");
  myAudio.pause();
}

function playSong() {
  var myAudio = document.getElementById("player");
  $("div.play").removeClass("play").addClass("pause");
  myAudio.play();
}

function togglePlayback() {
  var myAudio = document.getElementById("player");
  if (myAudio.paused) {
    playSong();
  } else {
    pauseSong();
  }
}

function toggleButton(element) {
  $(element).children().first().toggleClass('arrowUp arrowDown');
}

function updateSlider(value, slider) {
  let totalVol = parseInt(document.getElementById('bgVol').value) + parseInt(document.getElementById('musVol').value);
  console.log(totalVol, document.getElementById('bgVol').value, document.getElementById('musVol').value);
  switch (true) {
    case totalVol == 90:
      $('#volumeControl').attr('src', 'img/vol3.svg');
      break;
    case totalVol < 90 && totalVol >= 40:
      $('#volumeControl').attr('src', 'img/vol2.svg');
      break;
    case totalVol < 40 && totalVol > 0:
      $('#volumeControl').attr('src', 'img/vol1.svg');
      break;
    case totalVol == 0:
      $('#volumeControl').attr('src', 'img/vol0.svg');
      break;
  };
  if (document.getElementById('bgVol').value + document.getElementById('musVol').value == 90) {
    $('#volumeControl').attr('src', 'img/vol3.svg');
  };
  if ($(slider).attr('id') === 'bgVol') {
    let myVideo = document.getElementById("bgVideo");
    myVideo.firstChild.firstChild.volume = value/100;
  } else {
    let myAudio = document.getElementById("player");
    myAudio.volume = value/100;
  };
};

$(document).ready(() => {
  $(".animsition").animsition({
    inClass: 'fade-in-down-lg',
    outClass: 'fade-out-down-lg',
    inDuration: 1500,
    outDuration: 800,
    linkElement: '.animsition-link',
    // e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
    loading: true,
    loadingParentElement: 'body', //animsition wrapper element
    loadingClass: 'animsition-loading',
    loadingInner: '', // e.g '<img src="loading.svg" />'
    timeout: true,
    timeoutCountdown: 3500,
    onLoadEvent: true,
    browser: [ 'animation-duration', '-webkit-animation-duration'],
    // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
    // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
    overlay : false,
    overlayClass : 'animsition-overlay-slide',
    overlayParentElement : 'body',
    transition: function(url){ window.location.href = url; }
  });

  $('#bgVideo').vide('video/bg',
    {
    volume: 0.4,
    playbackRate: 1,
    muted: false,
    loop: true,
    autoplay: true,
    position: '0% 0%', // Similar to the CSS `background-position` property.
    posterType: 'none', // Poster image type. "detect" — auto-detection; "none" — no poster; "jpg", "png", "gif",... - extensions.
    resizing: true, // Auto-resizing, read: https://github.com/VodkaBears/Vide#resizing
    bgColor: 'transparent', // Allow custom background-color for Vide div,
    className: '' // Add custom CSS class to Vide div
  });

  $(() => {
    if (!sessionStorage.hasVisited) {
      sessionStorage.hasVisited = true;
    } else {
      document.getElementById('musVol').value = 0;
      $('#musVol').parent().removeClass('d-flex');
      $('#musVol').parent().addClass('d-none');
      pauseSong();
    };

    $('nav .dropdown').hover(function() {
      $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(250);
      }, function() {
      $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(250);
    });

    $('.weapon-pop').popover({
      container: 'body'
    });

    $('#weekdays > div > button').popover({
      trigger: "hover"
    })

    $('.popover-dismiss').popover({
      trigger: 'focus'
    });

    $('body').scrollspy({ target: '#navbarNav' });

    $('#time').one('click', function() {
      setInterval(() => {
        let now = new Date();
        let curTime = formatAMPM(now);
        $(this).text(curTime);
      }, 1000);
    })
  });

  $('#operations-cards a').blur(function() {
    setTimeout(() => {
      $(this).addClass('collapsed');
      $(this).next().children().last().collapse('hide');
    }, 300);
  });

  $('#navbarNav ul li a[href="#"]').click(function(event) {
    event.preventDefault();
  });

  // Select all links with hashes
  $('#navbarNav ul li a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
        &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000, function() {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) { // Checking if the target was focused
              return false;
            } else {
              $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            };
          });
        }
      }
    });
});

function formatAMPM(date) {
  var hours = date.getUTCHours()+1;
  var minutes = date.getUTCMinutes();
  var seconds = date.getUTCSeconds()
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  seconds = seconds < 10 ? '0'+seconds : seconds;
  var strTime = `${hours}:${minutes}:${seconds} ${ampm}`;
  return strTime;
}
