// Document ready: slide "Einoder" right and fade in AND move down "Welcome" text
// Scroll effects/animations:
const gOffset = window.innerWidth / 400; // 1% of viewport width

$(document).ready(function() {
  $('p').animate({opacity:1},2000);
  //$('h2').animate({opacity:1},{queue:false,duration:600}).animate({right:'15vw'},{duration:1000});
  $(window).bind('mousewheel DOMMouseScroll', function(e){
      if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
          console.log(e.originalEvent.wheelDelta);
      }
      else {
          console.log(e.originalEvent.wheelDelta);
      }
      scrollAnimation(e.originalEvent.wheelDelta);
  });
});
/*
$(window).click(function() {
  console.log("Scrolling.")
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
    newLeftMrgFlt = oldLeftMrgFlt + gOffset;
    newLeftMrgStr = newLeftMrgFlt + "px";
    $(lTarget).css("margin-left", newLeftMrgStr);
    // Handle first name shift
    oldRightMrgStr = $(rTarget).css("margin-left");
    oldRightMrgFlt = parseFloat(oldRightMrgStr.substr(0,oldRightMrgStr.length-2)); // from '...px'
    newRightMrgFlt = oldRightMrgFlt - gOffset;
    newRightMrgStr = newRightMrgFlt + "px";
    $(rTarget).css("margin-left", newRightMrgStr);
  }
});

window.addEventListener("scroll", function() {
  console.log("Scrolling.")
  $('#lastname1').animate({right:'44.5vw'},{duration:200});
  $('#lastname2').animate({right:'33vw'},{duration:200}); // above-11.5
  $('#lastname3').animate({right:'22vw'},{duration:200}); // above-11
});
*/
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









/* End */
