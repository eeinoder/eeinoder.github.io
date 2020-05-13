// Document ready: slide "Einoder" right and fade in AND move down "Welcome" text
// Scroll effects/animations:
const gOffset = window.innerWidth / 300; // 1% of viewport width
var lastScrollVal = 0; // after some elapsed time, calculate largest scroll value in burst (?)
var maxScrollVal = 0;

$(document).ready(function() {
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



// Scroll handler - Attempt 2: motion is binded to 'scroll wheel inside div'



// Scroll handler - Attempt 1: motion is binded to 'mouse wheel'
// If scroll offset is positive (i.e. scroll up), move forward in animation by 1 gOffset.
// If scroll offset is negative (i.e. scroll down),  move backward by 1 gOffset
// Note: better execution if offset is not static value. Rather if offset proportional to scroll value.
// Note: we manipulate the 'left-meargin' of both
function scrollAnimation(scrollDirection) {
  var fixedOffset = -1 * Math.sign(scrollDirection) * gOffset;
  var propOffSet = -1 * (scrollDirection/100) * gOffset;
  var offset = propOffSet;
  //console.log(offset);
  var i;
  var lTarget, rTarget;
  var oldLastnmMrgStr, oldLastnmMrgFlt, newLastnmMrgStr, newLastnmMrgFlt;
  var oldFirstnmMrgStr, oldFirstnmMrgFlt, newFirstnmMrgStr, newFirstnmMrgFlt;
  for (i=0; i<3; i++) { // Works because each name is split into 3 units
    // Parse string -> to int -> add value -> to string -> append 'px' to end
    lTarget = '#lastname' + (i+1);
    rTarget = '#firstname' + (i+1);
    // Handle last name shift
    oldLastnmMrgStr = $(lTarget).css("margin-left");
    oldLastnmMrgFlt = parseFloat(oldLastnmMrgStr.substr(0,oldLastnmMrgStr.length-2)); // from '...px'
    newLastnmMrgFlt = oldLastnmMrgFlt + offset;
    newLastnmMrgStr = newLastnmMrgFlt + "px";
    $(lTarget).css("margin-left", newLastnmMrgStr);
    if (i==2) {console.log("Last: " + newLastnmMrgStr);}
    // Handle first name shift
    oldFirstnmMrgStr = $(rTarget).css("margin-left");
    oldFirstnmMrgFlt = parseFloat(oldFirstnmMrgStr.substr(0,oldFirstnmMrgStr.length-2)); // from '...px'
    newFirstnmMrgFlt = oldFirstnmMrgFlt - offset;
    newFirstnmMrgStr = newFirstnmMrgFlt + "px";
    $(rTarget).css("margin-left", newFirstnmMrgStr);
    if (i==0) {console.log("First: " + newFirstnmMrgStr);}
  }
  console.log('\n');
}








/* End */
