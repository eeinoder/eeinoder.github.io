// Document ready: slide "Einoder" right and fade in AND move down "Welcome" text
// Scroll effects/animations:
const gOffset = window.innerWidth / 180; // 1% of viewport width
var lastScrollVal = 0; // after some elapsed time, calculate largest scroll value in burst (?)
var maxScrollVal = 0;

$(document).ready(function() {
  $('p').animate({opacity:1},4000);
  //$('h2').animate({opacity:1},{queue:false,duration:600}).animate({right:'15vw'},{duration:1000});
  $(window).bind('mousewheel DOMMouseScroll', function(e){
      if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
          console.log(e.originalEvent.wheelDelta);
      }
      else {
          console.log(e.originalEvent.wheelDelta);
      }
      scrollAnimation(e.originalEvent.wheelDelta);
      //TODO: add feature - if lastname3 gets to point backwards (i.e crosses threshold)
  });
});



// Scroll handler - Attempt 2: motion is binded to 'scroll wheel inside div'



// Scroll handler - Attempt 1: motion is binded to 'mouse wheel'
// If scroll offset is positive (i.e. scroll up), move forward in animation by 1 gOffset.
// If scroll offset is negative (i.e. scroll down),  move backward by 1 gOffset
function scrollAnimation(scrollDirection) {
  var offset = -1 * Math.sign(scrollDirection) * gOffset;
  console.log(offset);
  var i;
  var lTarget, rTarget;
  var oldLeftMrgStr, oldLeftMrgFlt, newLeftMrgStr, newLeftMrgFlt;
  var oldRightMrgStr, oldRightMrgFlt, newRightMrgStr, newRightMrgFlt;
  for (i=0; i<3; i++) { // Works because each name is split into 3 units
    // Parse string -> to int -> add value -> to string -> append 'px' to end
    lTarget = '#lastname' + (i+1);
    rTarget = '#firstname' + (i+1);
    // Handle last name shift
    oldLeftMrgStr = $(lTarget).css("margin-left");
    oldLeftMrgFlt = parseFloat(oldLeftMrgStr.substr(0,oldLeftMrgStr.length-2)); // from '...px'
    newLeftMrgFlt = oldLeftMrgFlt + offset;
    newLeftMrgStr = newLeftMrgFlt + "px";
    $(lTarget).css("margin-left", newLeftMrgStr);
    // Handle first name shift
    oldRightMrgStr = $(rTarget).css("margin-left");
    oldRightMrgFlt = parseFloat(oldRightMrgStr.substr(0,oldRightMrgStr.length-2)); // from '...px'
    newRightMrgFlt = oldRightMrgFlt - offset;
    newRightMrgStr = newRightMrgFlt + "px";
    $(rTarget).css("margin-left", newRightMrgStr);
  }
}

function scrollPhysics() {
  // every 10ms, check last scroll val
}









/* End */
