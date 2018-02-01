$(document).ready(function() {

  $('.new-tweet form').on('submit', function(event) {

    // Prevent the default behaviour
    event.preventDefault();

    // Get the data of the form
    const data = $('.new-tweet form').serialize();

    // Test!!
    console.log(data);

    if (data === 'text=') {
      alert(`Sorry! You can't submit a empty tweet!`);
    } else if (data.length > 145) {
      alert(`Sorry! You can't submit a tweet with more the 140 characters!`);
    } else {
      // Submit using AJAX
      $.post('/products', data).done(function () {

        // ???
      });
    }

  });
});