$(document).ready(function() {
  $('textarea').keyup(function() {
    let $this = $(this);
    let value = $this.val().length;
    let maxValue = 140;
    var remainingLength = (maxValue - value);

    let $counter = $this.siblings('.counter');
    $counter.text(remainingLength).css('color', remainingLength < 0 ? 'red' : 'black');

    // if(remainingLength < 0) {
    //   $('.counter').css('color', 'red');
    // } else {
    //   $('.counter').css('color', 'black');
    // }
  });
});
