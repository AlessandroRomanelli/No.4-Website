$(document).ready(() => {
  $(() => {
    $('.weapon-pop').popover({
      container: 'body'
    });


    $('#time').one('click', function() {
      setInterval(() => {
        let now = new Date();
        let curTime = formatAMPM(now);
        $(this).text(curTime);
      }, 1000);
    })
  });

  $('.popover-dismiss').popover({
    trigger: 'focus'
  });


  $('#operations-cards a').blur(function() {
    setTimeout(() => {
      $(this).addClass('collapsed');
      $(this).next().children().last().collapse('hide');
    }, 300);
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
