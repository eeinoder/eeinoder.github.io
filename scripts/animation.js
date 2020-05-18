// Document ready: slide "Einoder" right and fade in AND move down "Welcome" text
// Scroll effects/animations:
// TODO: if much time elapsed without activity, reload page (???)
// TODO: to address skipping issues when scrolling too fast, change scrollPos-to-margin
// scale factor

//const gOffset = window.innerWidth / 500; // 1% of viewport width in pixels
const initialMargins = [6, 15.9, 24, 0, 11.5, 22.5]; // in vw units
const endMargins = [-11.46, -1.56, 6.54, 17.46, 28.96, 39.96];
const autoScrollLimit = 1000;
var backgroundImage = 1;
var isButtonDiscovered = 0; // set to 0 before user hovers into scroll button
//var leftMarginMax = 40.0; // 40vw is max for left-margin of lastname3
//var leftMarginMin = 8.8;  // 8.8vw is max for left-margin of lastname3

$(document).ready(function() {
  setMargins();

  // Scrolling inside 'div' advances scroll animation
  $('div').scroll(function() {
    var scrollPos = $("div").scrollTop();
    console.log(scrollPos)
    scrollbarAnimate(scrollPos); // 0-875, 875-1000, 1000-1250
  });

  // 'Welcome' message fades in
  $('p1').animate({opacity:1},2500);

  // After 3 seconds downarrow is made visible if user has not discovered button
  setTimeout(function() {
    if (isButtonDiscovered === 0) {
      $('p2').animate({opacity:1},400);
    }
  }, 3000);

  // Fade in/out on hover over downarrow
  $('p2').hover(function() {
    isButtonDiscovered = 1;
    $('p2').animate({opacity:1},200);
  }, function() {
    $('p2').animate({opacity:0},200);
  });

  // Click down arrow will smoothly move down scroll bar
  $('p2').click(function() {
    $("div").animate({scrollTop:2000},2000);
  });

  //
  $('#project1').click(function() {
    window.open("https://eeinoder.github.io/Geo-Game/");
  });
});



// SCROLL HANDLER - ATTEMPT 2: motion is binded to 'scroll wheel position inside div'
// Theory: this will make it work in iOS / mobile
// using jquery method, .scrollTop(): testing reveals ~ 1vw = 50 scroll position
// BUT: how does this change with resizing window?
// TODO: replace values '7', '8', '50' with contants initial 'margin-top', 'font-size', and 'conversion', resp.
function scrollbarAnimate(scrollPos) {
  var i;
  var lTarget, fTarget;
  var offset;
  var growthFactor;
  for (i=0; i<3; i++) { // Works because each name is split into 3 units
    lTarget = '#lastname' + (i+1);
    fTarget = '#firstname' + (i+1);
    // Interweave 'Nicolae' and 'Einoder'
    if (scrollPos === 0) {
      // Set default inital left-margins
      $(lTarget).css("margin-left", initialMargins[i+3]+"vw");
      $(fTarget).css("margin-left", initialMargins[i]+"vw");
    }
    else if (scrollPos < 875) {
      // Set 'Nicolae' to initial top-margin
      $(fTarget).css("margin-top", "7vw");
      // Set left margins to match scoll position
      $(lTarget).css("margin-left", getMarginFromScroll(lTarget, scrollPos)+"vw");
      $(fTarget).css("margin-left", getMarginFromScroll(fTarget, scrollPos)+"vw");
    }
    // Move 'Nicolae' down to 'Einoder''s level (7.5vw to 9vw margin-top)
    else if (scrollPos < 1000) {
      // Reset/fade-in project names list
      // TODO:
      // Reset background image
      if (backgroundImage === 2) {
        $('html').css('background-image', 'url(style/imgs/gradient1.png)');
        backgroundImage = 1;
      }
      // Snap names to end left-margin positions:
      $(lTarget).css("margin-left", endMargins[i+3]+"vw");
      $(fTarget).css("margin-left", endMargins[i]+"vw");
      // Reset 'Nicolae' color to black:
      $(fTarget).css("color", "rgb(0,0,0)");

      // Scroll animation for 'Nicolae' objects to move down, meet 'Einoder'
      $(fTarget).css("margin-top", 7+(scrollPos-875)/50+"vw");

      // TODO: think of better solution to get these values.
      // Now, just hard coding end margins to avoid issues transitioning between
      // animations when scrolling too fast.
      /*
      if (endMargins[i] === undefined) {
        endMargins[i] = getMargin(fTarget, 'left');
      }
      if (endMargins[i+3] === undefined) {
        endMargins[i+3] = getMargin(lTarget, 'left');
      }*/
    }
    else {
      // Snap 'Nicolae' to end top-margin position (whatever 'Einoder' top-margin is)
      var endTopMargin = getMargin(lTarget, 'top');
      $(fTarget).css("margin-top", endTopMargin+'vw');

      // Fade out project names
      //TODO:

      if (backgroundImage === 1) {
        $('html').css('background-image', 'url(style/imgs/gradient3.png)');
        backgroundImage = 2;
      }
      if (scrollPos < 1256) {
        // Shift 'Nicolae' color to white:
        var shade = scrollPos-1000;
        $(fTarget).css("color", "rgb("+shade+","+shade+","+shade+")");
      }
      else {
        // Set to "max" color: white
        $(fTarget).css("color", "rgb(255,255,255)");
      }
    }
    // Grow and fade out
    /*
    else {
      offset = (scrollPos-1000)/50;

      $(lTarget).css("font-size", 8+(scrollPos-1000)/50+"vw");
      $(fTarget).css("font-size", 8+(scrollPos-1000)/50+"vw");

      growthFactor = (endMargins[i+3]-endMargins[0])/(endMargins[1]-endMargins[0]);
      $(lTarget).css("margin-left", endMargins[i+3]+growthFactor*(scrollPos-1000)/50+"vw");
      growthFactor = (endMargins[i]-endMargins[0])/(endMargins[1]-endMargins[0]);
      $(fTarget).css("margin-left", endMargins[i]+growthFactor*(scrollPos-1000)/50+"vw");

      $(lTarget).css("opacity", 1-(scrollPos-1000)/400);
      $(fTarget).css("opacity", 1-(scrollPos-1000)/400);
    }*/
  }
}



// SCROLL HANDLER - ATTEMPT 1: motion is binded to 'mouse wheel'
// Note: better execution if offset is not static value. Rather if offset proportional to scroll value.
// Note: we manipulate the 'left-margin' of both name objects
/*
function mousewheelAnimate(scrollDirection) {
  var limitCheck = 100*(getMargin('#lastname3', 'left'))/window.innerWidth; // left-margin in vw of lastname3, 'er'
  var offset = -1 * (scrollDirection/100) * gOffset;
  //console.log(offset);
  if (offset > 0 && limitCheck >= leftMarginMax) {
    //console.log(limitCheck);
    return;
  }
  if (offset < 0 && limitCheck <= leftMarginMin) {
    //console.log(limitCheck);
    return;
  }

  var i;
  var lTarget, fTarget;
  var newMarginLastnm, newMarginFirstnm;
  for (i=0; i<3; i++) { // Works because each name is split into 3 units
    // Parse string -> to int -> add value -> to string -> append 'px' to end
    lTarget = '#lastname' + (i+1);
    fTarget = '#firstname' + (i+1);
    // Handle last name shift: px -> vw, set new value
    newMarginLastnm = 100*(getMargin(lTarget, 'left') + offset)/window.innerWidth + "vw";
    $(lTarget).css("margin-left", newMarginLastnm);
    // Handle first name shift: px -> vw, set new value
    newMarginFirstnm = 100*(getMargin(fTarget, 'left') - offset)/window.innerWidth + "vw";
    $(fTarget).css("margin-left", newMarginFirstnm);
  }
} */

 /* HELPER: return float value of left-margin in vw  */
function getMargin(targetName, marginType) {
  var margin = $(targetName).css("margin-"+marginType);
  return 100 * parseFloat(margin.substr(0,margin.length-2)) / window.innerWidth;
}

/* HELPER: set values for left-margin. If no margin array given, use global initialMargins, */
function setMargins(newMargins) {
  var i;
  var lTarget, fTarget;
  var margins = initialMargins;
  //console.log(newMargins)
  if (newMargins !== undefined && newMargins !== null) {
    margins = newMargins; // assume newMargins is array with 6 floats, in vw units
  }
  for (i=0; i<3; i++) {
    lTarget = '#lastname' + (i+1);
    fTarget = '#firstname' + (i+1);
    $(fTarget).css("margin-left", margins[i]+"vw");
    $(lTarget).css("margin-left", margins[i+3]+"vw");
  }
}

/* HELPER: Return new margin floats (vw units) from scroll position */
function getMarginFromScroll(targetName, scrollPos) {
  var initialOffset, newOffset; //
  var targetIndex = parseInt(targetName.substr(targetName.length-1))-1;
  if (targetName.includes("lastname")) {
    initialOffset = 50*initialMargins[targetIndex+3];
    newOffset = (initialOffset + scrollPos)/50;
  }
  else if (targetName.includes("firstname")) {
    initialOffset = 50*initialMargins[targetIndex];
    newOffset = (initialOffset - scrollPos)/50;
  }
  else {
    alert("Invalid target name.");
    return;
  }
  return newOffset;
}


/* DISABLE HORIZONTAL SCROLL */
$(function() {
    var $body = $(document);
    $body.bind('scroll', function() {
        // "Disable" the horizontal scroll.
        if ($body.scrollLeft() !== 0) {
            $body.scrollLeft(0);
        }
    });
});

/* TESTING */
$(window).click(function() {
  //console.log(100*(getMargin('#lastname3', 'left'))/window.innerWidth + "vw");
  //window.open("https://eeinoder.github.io/Geo-Game/");
});



/* End */
