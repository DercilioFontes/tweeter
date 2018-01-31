$(document).ready(function() {
  let totalLength = 140;

  // Gets the input in the textarea and counts the characters.
  $('.new-tweet').children('form').children('textarea').on('keyup', function() {
    var text  = $(this).val();

    // Sets counter of remaining characters and red if negative (and returns black if come back to be positive)
    var remainingCharacters = totalLength - text.length;
    if (remainingCharacters < 0) {
      $(this).parent().children('span').text(remainingCharacters).css("color", "red");
    } else {
      $(this).parent().children('span').text(remainingCharacters).css("color", "black");
    }
  });

});
