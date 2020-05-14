// Document ready: slide "Einoder" right and fade in AND move down "Welcome" text
// Scroll effects/animations:

const gOffset = window.innerWidth / 300; // 1% of viewport width in pixels
const initialMargins = [6, 15.9, 24, 0, 11.5, 22.5]; // in vw units
// above vals in 'scroll pos': 300, 795, 1200, 0, 575, 1125
var leftMarginMax = 40.0; // 40vw is max for left-margin of lastname3
var leftMarginMin = 8.8;  // 8.8vw is max for left-margin of lastname3

$(document).ready(function() {
  setMargins();

  $(window).bind('mousewheel DOMMouseScroll', function(e){
      //mousewheelAnimate(e.originalEvent.wheelDelta);
      //TODO: add feature - if lastname3 gets to point backwards (i.e crosses threshold)
  });

  $('div').scroll(function() {
    var scrollPos = $("div").scrollTop();
    console.log(scrollPos);
    scrollbarAnimate(scrollPos);
  });

  $('p').animate({opacity:1},4000);
});



// SCROLL HANDLER - ATTEMPT 2: motion is binded to 'scroll wheel position inside div'
// Theory: this will make it work in iOS / mobile
// using jquery method, .scrollTop(): testing reveals ~ 1vw = 50 scroll position
// BUT: how does this change with resizing window?
function scrollbarAnimate(scrollPos) {
  var i;
  var lTarget, fTarget;
  for (i=0; i<3; i++) { // Works because each name is split into 3 units
    // Parse string -> to int -> add value -> to string -> append 'px' to end
    lTarget = '#lastname' + (i+1);
    fTarget = '#firstname' + (i+1);
    // Handle last name shift: px -> vw, set new value
    $(lTarget).css("margin-left", getMarginFromScroll(lTarget, scrollPos)+"vw");
    $(fTarget).css("margin-left", getMarginFromScroll(fTarget, scrollPos)+"vw");
  }
}



// SCROLL HANDLER - ATTEMPT 1: motion is binded to 'mouse wheel'
// Note: better execution if offset is not static value. Rather if offset proportional to scroll value.
// Note: we manipulate the 'left-margin' of both name objects
function mousewheelAnimate(scrollDirection) {
  var limitCheck = 100*(getMargin('#lastname3'))/window.innerWidth; // left-margin in vw of lastname3, 'er'
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
    newMarginLastnm = 100*(getMargin(lTarget) + offset)/window.innerWidth + "vw";
    $(lTarget).css("margin-left", newMarginLastnm);
    // Handle first name shift: px -> vw, set new value
    newMarginFirstnm = 100*(getMargin(fTarget) - offset)/window.innerWidth + "vw";
    $(fTarget).css("margin-left", newMarginFirstnm);
  }
}
 /* HELPER: return float value of left-margin in pixels  */
function getMargin(targetName) {
  var margin = $(targetName).css("margin-left");
  return parseFloat(margin.substr(0,margin.length-2));
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

/*
$(document).click(function() {
  console.log(100*(getMargin('#lastname3'))/window.innerWidth + "vw");
});
*/


/* End */
