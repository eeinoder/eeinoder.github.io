// Document ready: slide "Einoder" right and fade in AND move down "Welcome" text
// Scroll effects/animations:

const gOffset = window.innerWidth / 300; // 1% of viewport width in pixels
const initialMargins = ["6vw", "15.9vw", "24vw", "0vw", "11.5vw", "22.5vw"];
var leftMarginMax = 40.0; // 40vw is limit
var leftMarginMin = 8.8;

$(document).ready(function() {
  setMargins();

  $('p').animate({opacity:1},4000);
  //$('h2').animate({opacity:1},{queue:false,duration:600}).animate({right:'15vw'},{duration:1000});
  $(window).bind('mousewheel DOMMouseScroll', function(e){
      if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
          //console.log(e.originalEvent.wheelDelta);
      }
      else {
          //console.log(e.originalEvent.wheelDelta);
      }
      scrollAnimation(e.originalEvent.wheelDelta);
      //TODO: add feature - if lastname3 gets to point backwards (i.e crosses threshold)
      //TODO: add boundaries to how far text can drift: have it stop or fade/slide out of view
  });
});



// Scroll handler - Attempt 2: motion is binded to 'scroll wheel position inside div'
// Theory: this will make it work in iOS / mobile



// Scroll handler - Attempt 1: motion is binded to 'mouse wheel'
// Note: better execution if offset is not static value. Rather if offset proportional to scroll value.
// Note: we manipulate the 'left-margin' of both name objects
function scrollAnimation(scrollDirection) {
  var limitCheck = 100*(getMargin('#lastname3'))/window.innerWidth; // left-margin in vw of lastname3, 'er'
  var offset = -1 * (scrollDirection/100) * gOffset;
  //console.log(offset);
  if (offset > 0 && limitCheck >= leftMarginMax) {
    console.log(limitCheck);
    return;
  }
  if (offset < 0 && limitCheck <= leftMarginMin) {
    console.log(limitCheck);
    return;
  }

  var i;
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
 /* Helper: return float value of left-margin in pixels  */
function getMargin(targetName) {
  var margin = $(targetName).css("margin-left");
  return parseFloat(margin.substr(0,margin.length-2));
}

/* Helper: set values for left-margin. If no margin array given, use global initialMargins, */
function setMargins(newMargins) {
  var i;
  var lTarget, fTarget;
  var margins = initialMargins;
  //console.log(newMargins)
  if (newMargins !== undefined && newMargins !== null) {
    margins = newMargins; // assume newMargins is array with 6 strings, 'Xvw'
  }
  for (i=0; i<3; i++) {
    lTarget = '#lastname' + (i+1);
    fTarget = '#firstname' + (i+1);
    $(fTarget).css("margin-left", margins[i]);
    $(lTarget).css("margin-left", margins[i+3]);
  }
}

$(document).click(function() {
  console.log(100*(getMargin('#lastname3'))/window.innerWidth + "vw");
});


/* End */
